const fs = require('fs')
const path = require('path')

const PROXY_URL = 'https://claude-proxy-gray.vercel.app/api/claude'
const GITHUB_URL = 'https://claude-proxy-gray.vercel.app/api/github'
const APP_PATH = path.join(__dirname, 'App.js')

const instruction = process.argv[2]

if (!instruction) {
  console.log('Usage: node change.js "describe the change you want"')
  console.log('Example: node change.js "change the hero tagline to Sales Performance Consulting"')
  process.exit(1)
}

async function run() {
  console.log('Reading current site code...')
  const currentCode = fs.readFileSync(APP_PATH, 'utf8')

  console.log('Asking Claude what to change...')
  const claudeRes = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `You are the website agent for Barringer Consulting. You will be given the current React App.js code and a change instruction.\n\nReturn ONLY a valid JSON object with this exact structure — no explanation, no markdown, no code fences, just raw JSON:\n{\n  "replacements": [\n    { "find": "exact text to find", "replace": "exact text to replace it with" }\n  ],\n  "summary": "one sentence describing what changed"\n}\n\nEach "find" value must be an exact string that appears in the code. Keep each replacement as small and targeted as possible.\n\nChange instruction: ${instruction}\n\nCurrent App.js code:\n${currentCode}`
      }]
    })
  })

  const claudeData = await claudeRes.json()
  let responseText = claudeData.content[0].text.trim()

  responseText = responseText.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim()
  responseText = responseText.replace(/^```\n?/, '').replace(/\n?```$/, '').trim()

  let parsed
  try {
    parsed = JSON.parse(responseText)
  } catch (e) {
    console.log('Claude returned invalid JSON. Raw response:')
    console.log(responseText.slice(0, 300))
    process.exit(1)
  }

  if (!parsed.replacements || parsed.replacements.length === 0) {
    console.log('No replacements found.')
    process.exit(1)
  }

  let newCode = currentCode
  let appliedCount = 0
  for (const { find, replace } of parsed.replacements) {
    if (newCode.includes(find)) {
      newCode = newCode.split(find).join(replace)
      appliedCount++
      console.log(`Applied: "${find.slice(0, 60)}" -> "${replace.slice(0, 60)}"`)
    } else {
      console.log(`Warning: Could not find "${find.slice(0, 60)}" - skipping`)
    }
  }

  if (appliedCount === 0) {
    console.log('No changes could be applied.')
    process.exit(1)
  }

  console.log('')
  console.log('Summary:', parsed.summary)
  console.log('Saving updated code locally...')
  fs.writeFileSync(APP_PATH, newCode, 'utf8')

  console.log('Deploying to GitHub...')
  const githubRes = await fetch(GITHUB_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: newCode,
      message: `Website agent: ${instruction}`
    })
  })

  const githubData = await githubRes.json()

  if (githubData.success) {
    console.log('')
    console.log('Done! Change deployed successfully.')
    console.log('Commit:', githubData.commit)
    console.log('Live at https://barringer-consulting.vercel.app in ~60 seconds.')
  } else {
    console.log('GitHub push failed:', JSON.stringify(githubData))
  }
}

run().catch(err => console.log('Error:', err.message))