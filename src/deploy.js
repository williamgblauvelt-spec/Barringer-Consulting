const fs = require('fs')
const path = require('path')

const PROXY_URL = 'https://claude-proxy-gray.vercel.app/api/github'
const FILE_PATH = path.join(__dirname, 'App.js')

async function deploy() {
  console.log('Reading App.js...')
  const content = fs.readFileSync(FILE_PATH, 'utf8')

  console.log('Pushing to GitHub...')
  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content,
      message: 'Website agent: update hero tagline'
    })
  })

  const data = await res.json()

  if (data.success) {
    console.log('Done! Commit:', data.commit)
    console.log('Vercel is deploying now. Check https://barringer-consulting.vercel.app in ~60 seconds.')
  } else {
    console.log('Something went wrong:', JSON.stringify(data))
  }
}

deploy().catch(console.error)