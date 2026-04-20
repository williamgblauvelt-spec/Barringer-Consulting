import { useState } from "react"

const G = {
    green900: "#0D2B1A",
    green800: "#1B4332",
    green700: "#2D6A4F",
    green600: "#40916C",
    green100: "#D8F3DC",
    green50: "#F0FBF2",
    navy900: "#0F172A",
    navy800: "#1E3A8A",
    navy700: "#1D4ED8",
    navy100: "#DBEAFE",
    navy50: "#EFF6FF",
    gold: "#C9A84C",
    white: "#FFFFFF",
    gray50: "#F9FAFB",
    gray100: "#F3F4F6",
    gray200: "#E5E7EB",
    gray500: "#6B7280",
    gray700: "#374151",
    gray900: "#111827",
}

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'DM Sans', sans-serif; }
`

function LeadForm({ bg = G.white, textColor = G.gray900 }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    })
    const [status, setStatus] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()
        setStatus("sending")
        try {
            const res = await fetch("https://formspree.io/f/mojynvlp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })
            if (res.ok) {
                setStatus("success")
                setForm({ name: "", email: "", phone: "", message: "" })
            } else {
                setStatus("error")
            }
        } catch {
            setStatus("error")
        }
    }

    const inputStyle = {
        width: "100%",
        padding: "14px 16px",
        border: `1px solid ${G.gray200}`,
        borderRadius: 4,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 15,
        color: G.gray900,
        background: G.white,
        outline: "none",
        transition: "border-color 0.2s",
    }

    const labelStyle = {
        display: "block",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: G.gray500,
        marginBottom: 6,
    }

    return (
        <div
            style={{
                background: bg,
                borderRadius: 8,
                padding: "40px 36px",
                border: `1px solid ${G.gray200}`,
                maxWidth: 520,
                width: "100%",
            }}
        >
            <p
                style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 26,
                    fontWeight: 600,
                    color: G.green800,
                    marginBottom: 6,
                }}
            >
                Start the Conversation
            </p>
            <p
                style={{
                    fontSize: 14,
                    color: G.gray500,
                    marginBottom: 28,
                    lineHeight: 1.6,
                }}
            >
                Tell us where you are. We'll tell you where you could be.
            </p>

            {status === "success" ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            background: G.green100,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 16px",
                        }}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M5 13l4 4L19 7"
                                stroke={G.green700}
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <p
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 22,
                            fontWeight: 600,
                            color: G.green800,
                            marginBottom: 8,
                        }}
                    >
                        We'll be in touch.
                    </p>
                    <p style={{ fontSize: 14, color: G.gray500 }}>
                        Expect a response within one business day.
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 16,
                            marginBottom: 16,
                        }}
                    >
                        <div>
                            <label style={labelStyle}>Full Name</label>
                            <input
                                style={inputStyle}
                                type="text"
                                placeholder="John Smith"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Phone</label>
                            <input
                                style={inputStyle}
                                type="tel"
                                placeholder="(555) 000-0000"
                                value={form.phone}
                                onChange={(e) =>
                                    setForm({ ...form, phone: e.target.value })
                                }
                            />
                        </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Email</label>
                        <input
                            style={inputStyle}
                            type="email"
                            placeholder="john@company.com"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div style={{ marginBottom: 24 }}>
                        <label style={labelStyle}>
                            What are you working on?
                        </label>
                        <textarea
                            style={{
                                ...inputStyle,
                                height: 100,
                                resize: "vertical",
                            }}
                            placeholder="Tell us about your current sales situation and what you're hoping to improve..."
                            value={form.message}
                            onChange={(e) =>
                                setForm({ ...form, message: e.target.value })
                            }
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={status === "sending"}
                        style={{
                            width: "100%",
                            padding: "15px 24px",
                            background: G.green800,
                            color: G.white,
                            border: "none",
                            borderRadius: 4,
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 14,
                            fontWeight: 500,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            cursor: status === "sending" ? "wait" : "pointer",
                            transition: "background 0.2s",
                        }}
                    >
                        {status === "sending"
                            ? "Sending..."
                            : "Request a Consultation"}
                    </button>
                    {status === "error" && (
                        <p
                            style={{
                                color: "#DC2626",
                                fontSize: 13,
                                marginTop: 12,
                                textAlign: "center",
                            }}
                        >
                            Something went wrong. Please email us directly at
                            williamgblauvelt@gmail.com
                        </p>
                    )}
                </form>
            )}
        </div>
    )
}

function Nav({ page, setPage }) {

    return (
        <nav
            style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                background: G.green900,
                borderBottom: `1px solid rgba(255,255,255,0.08)`,
                padding: "0 48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: 72,
            }}
        >
            <button
                onClick={() => setPage("home")}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <div
                    style={{
                        width: 32,
                        height: 32,
                        background: G.green700,
                        borderRadius: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span
                        style={{
                            color: G.white,
                            fontFamily: "'Cormorant Garamond', serif",
                            fontWeight: 700,
                            fontSize: 16,
                        }}
                    >
                        B
                    </span>
                </div>
                <span
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 20,
                        fontWeight: 600,
                        color: G.white,
                        letterSpacing: "0.02em",
                    }}
                >
                    Barringer Consulting
                </span>
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
                {[
                    ["home", "Home"],
                    ["services", "Services"],
                ].map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setPage(key)}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 14,
                            fontWeight: 400,
                            letterSpacing: "0.04em",
                            color:
                                page === key
                                    ? G.white
                                    : "rgba(255,255,255,0.6)",
                            borderBottom:
                                page === key
                                    ? `2px solid ${G.gold}`
                                    : "2px solid transparent",
                            paddingBottom: 2,
                            transition: "all 0.2s",
                        }}
                    >
                        {label}
                    </button>
                ))}
                <button
                    onClick={() => setPage("contact")}
                    style={{
                        background: "none",
                        border: `1px solid ${G.gold}`,
                        borderRadius: 3,
                        padding: "8px 20px",
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: G.gold,
                        transition: "all 0.2s",
                    }}
                >
                    Work With Us
                </button>
            </div>
        </nav>
    )
}

function HomePage({ setPage }) {
    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {/* Hero */}
            <section
                style={{
                    background: G.green900,
                    minHeight: "88vh",
                    display: "flex",
                    alignItems: "center",
                    padding: "80px 48px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "45%",
                        height: "100%",
                        background: `linear-gradient(135deg, ${G.green800} 0%, ${G.navy900} 100%)`,
                        clipPath:
                            "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        opacity: 0.6,
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 60,
                        right: "8%",
                        width: 1,
                        height: "70%",
                        background: `linear-gradient(to bottom, transparent, ${G.gold}, transparent)`,
                        opacity: 0.4,
                    }}
                />

                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        width: "100%",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <div style={{ maxWidth: 680 }}>
                        <p
                            style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 12,
                                fontWeight: 500,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: G.gold,
                                marginBottom: 24,
                            }}
                        >
                            Sales Performance Consulting
                        </p>
                        <h1
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "clamp(42px, 6vw, 72px)",
                                fontWeight: 600,
                                lineHeight: 1.1,
                                color: G.white,
                                marginBottom: 28,
                            }}
                        >
                            Your pipeline is telling you something.{" "}
                            <em
                                style={{
                                    color: G.green600,
                                    fontStyle: "italic",
                                }}
                            >
                                Are you listening?
                            </em>
                        </h1>
                        <p
                            style={{
                                fontSize: 18,
                                lineHeight: 1.7,
                                color: "rgba(255,255,255,0.7)",
                                marginBottom: 48,
                                maxWidth: 520,
                            }}
                        >
                            Barringer Consulting works with sales professionals
                            to increase revenue per deal, sharpen positioning,
                            and build the habits that compound over time. Our
                            clients see an average 79% increase in average order
                            size.
                        </p>
                        <div
                            style={{
                                display: "flex",
                                gap: 16,
                                flexWrap: "wrap",
                            }}
                        >
                            <button
                                onClick={() => setPage("contact")}
                                style={{
                                    padding: "16px 36px",
                                    background: G.green700,
                                    color: G.white,
                                    border: "none",
                                    borderRadius: 4,
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: 14,
                                    fontWeight: 500,
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                    cursor: "pointer",
                                }}
                            >
                                Request a Consultation
                            </button>
                            <button
                                onClick={() => setPage("services")}
                                style={{
                                    padding: "16px 36px",
                                    background: "transparent",
                                    color: "rgba(255,255,255,0.8)",
                                    border: "1px solid rgba(255,255,255,0.25)",
                                    borderRadius: 4,
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: 14,
                                    fontWeight: 400,
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                    cursor: "pointer",
                                }}
                            >
                                View Services
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stat Bar */}
            <section
                style={{
                    background: G.green800,
                    padding: "0 48px",
                    borderBottom: `1px solid ${G.green700}`,
                }}
            >
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "space-around",
                        flexWrap: "wrap",
                    }}
                >
                    {[
                        ["79%", "Average increase in order size"],
                        ["90 days", "Typical time to measurable results"],
                        ["1:1", "Dedicated consulting, not group coaching"],
                    ].map(([stat, label]) => (
                        <div
                            key={stat}
                            style={{
                                padding: "32px 24px",
                                textAlign: "center",
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontSize: 42,
                                    fontWeight: 700,
                                    color: G.white,
                                    lineHeight: 1,
                                }}
                            >
                                {stat}
                            </p>
                            <p
                                style={{
                                    fontSize: 13,
                                    color: "rgba(255,255,255,0.55)",
                                    marginTop: 8,
                                    letterSpacing: "0.04em",
                                }}
                            >
                                {label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* What We Do */}
            <section style={{ background: G.white, padding: "100px 48px" }}>
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 80,
                        alignItems: "center",
                    }}
                >
                    <div>
                        <p
                            style={{
                                fontSize: 12,
                                fontWeight: 500,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: G.green700,
                                marginBottom: 16,
                            }}
                        >
                            Our Approach
                        </p>
                        <h2
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 42,
                                fontWeight: 600,
                                color: G.gray900,
                                lineHeight: 1.15,
                                marginBottom: 24,
                            }}
                        >
                            Performance isn't about working harder. It's about
                            selling smarter.
                        </h2>
                        <p
                            style={{
                                fontSize: 16,
                                lineHeight: 1.8,
                                color: G.gray500,
                                marginBottom: 20,
                            }}
                        >
                            Most sales training focuses on scripts and tactics.
                            We focus on the underlying mechanics — why buyers
                            say yes, how to position value, and how to close
                            without leaving revenue on the table.
                        </p>
                        <p
                            style={{
                                fontSize: 16,
                                lineHeight: 1.8,
                                color: G.gray500,
                                marginBottom: 36,
                            }}
                        >
                            We work with you directly. No cohorts, no generic
                            frameworks, no one-size-fits-all programs. Every
                            engagement is built around your specific deals, your
                            specific pipeline, and what's actually holding you
                            back.
                        </p>
                        <button
                            onClick={() => setPage("services")}
                            style={{
                                padding: "13px 28px",
                                background: "transparent",
                                color: G.green800,
                                border: `1px solid ${G.green800}`,
                                borderRadius: 4,
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 13,
                                fontWeight: 500,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                cursor: "pointer",
                            }}
                        >
                            See How We Work
                        </button>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 20,
                        }}
                    >
                        {[
                            [
                                "Diagnose",
                                "We audit your current approach — pricing conversations, objection handling, and deal structure — to find the gaps.",
                            ],
                            [
                                "Rebuild",
                                "We rebuild your positioning, your value narrative, and your close strategy around what buyers actually respond to.",
                            ],
                            [
                                "Execute",
                                "We work alongside you on real deals in real time, so the improvements stick.",
                            ],
                        ].map(([title, desc], i) => (
                            <div
                                key={title}
                                style={{
                                    display: "flex",
                                    gap: 20,
                                    alignItems: "flex-start",
                                }}
                            >
                                <div
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: "50%",
                                        background: G.green100,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontFamily:
                                                "'Cormorant Garamond', serif",
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: G.green800,
                                        }}
                                    >
                                        {i + 1}
                                    </span>
                                </div>
                                <div>
                                    <p
                                        style={{
                                            fontWeight: 500,
                                            color: G.gray900,
                                            marginBottom: 6,
                                        }}
                                    >
                                        {title}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 14,
                                            lineHeight: 1.7,
                                            color: G.gray500,
                                        }}
                                    >
                                        {desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Preview */}
            <section
                style={{
                    background: G.gray50,
                    padding: "100px 48px",
                    borderTop: `1px solid ${G.gray200}`,
                }}
            >
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 64 }}>
                        <p
                            style={{
                                fontSize: 12,
                                fontWeight: 500,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: G.green700,
                                marginBottom: 12,
                            }}
                        >
                            Services
                        </p>
                        <h2
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 42,
                                fontWeight: 600,
                                color: G.gray900,
                            }}
                        >
                            Built for sales professionals who are serious about
                            growth
                        </h2>
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 24,
                        }}
                    >
                        {[
                            {
                                title: "Sales Consulting",
                                tag: "1:1 Engagement",
                                desc: "A dedicated engagement focused on diagnosing and fixing the specific mechanics holding back your revenue. We go deep on your deals, your pipeline, and your positioning.",
                                items: [
                                    "Pipeline audit",
                                    "Deal strategy sessions",
                                    "Close rate improvement",
                                    "Revenue per deal optimization",
                                ],
                            },
                            {
                                title: "Sales Training",
                                tag: "For Individuals",
                                desc: "A structured program for sales professionals who want to sharpen foundational skills — value framing, objection handling, and negotiation — and see immediate results in the field.",
                                items: [
                                    "Value-based selling",
                                    "Objection handling",
                                    "Price & negotiation",
                                    "Buyer psychology",
                                ],
                            },
                        ].map((svc) => (
                            <div
                                key={svc.title}
                                style={{
                                    background: G.white,
                                    border: `1px solid ${G.gray200}`,
                                    borderRadius: 8,
                                    padding: "40px 36px",
                                    borderTop: `3px solid ${G.green700}`,
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 500,
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        color: G.green700,
                                        background: G.green50,
                                        padding: "4px 10px",
                                        borderRadius: 20,
                                    }}
                                >
                                    {svc.tag}
                                </span>
                                <h3
                                    style={{
                                        fontFamily:
                                            "'Cormorant Garamond', serif",
                                        fontSize: 28,
                                        fontWeight: 600,
                                        color: G.gray900,
                                        margin: "16px 0 12px",
                                    }}
                                >
                                    {svc.title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: 15,
                                        lineHeight: 1.7,
                                        color: G.gray500,
                                        marginBottom: 24,
                                    }}
                                >
                                    {svc.desc}
                                </p>
                                <ul
                                    style={{
                                        listStyle: "none",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 10,
                                    }}
                                >
                                    {svc.items.map((item) => (
                                        <li
                                            key={item}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 10,
                                                fontSize: 14,
                                                color: G.gray700,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 6,
                                                    height: 6,
                                                    borderRadius: "50%",
                                                    background: G.green600,
                                                    flexShrink: 0,
                                                }}
                                            />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: "center", marginTop: 40 }}>
                        <button
                            onClick={() => setPage("services")}
                            style={{
                                padding: "14px 32px",
                                background: G.green800,
                                color: G.white,
                                border: "none",
                                borderRadius: 4,
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 13,
                                fontWeight: 500,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                cursor: "pointer",
                            }}
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Lead Capture */}
            <section style={{ background: G.green900, padding: "100px 48px" }}>
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 80,
                        alignItems: "center",
                    }}
                >
                    <div>
                        <p
                            style={{
                                fontSize: 12,
                                fontWeight: 500,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: G.gold,
                                marginBottom: 16,
                            }}
                        >
                            Get Started
                        </p>
                        <h2
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 42,
                                fontWeight: 600,
                                color: G.white,
                                lineHeight: 1.15,
                                marginBottom: 20,
                            }}
                        >
                            Ready to increase what your deals are worth?
                        </h2>
                        <p
                            style={{
                                fontSize: 16,
                                lineHeight: 1.8,
                                color: "rgba(255,255,255,0.6)",
                            }}
                        >
                            The first conversation is free. Tell us where you
                            are, and we'll tell you what's possible.
                        </p>
                    </div>
                    <LeadForm bg={G.white} />
                </div>
            </section>

            {/* Footer */}
            <footer
                style={{
                    background: G.green900,
                    borderTop: `1px solid rgba(255,255,255,0.08)`,
                    padding: "32px 48px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <p
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 18,
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.5)",
                    }}
                >
                    Barringer Consulting
                </p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
                    © {new Date().getFullYear()} Barringer Consulting. All
                    rights reserved.
                </p>
            </footer>
        </div>
    )
}

function ServicesPage({ setPage }) {
    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {/* Hero */}
            <section
                style={{ background: G.green900, padding: "100px 48px 80px" }}
            >
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <p
                        style={{
                            fontSize: 12,
                            fontWeight: 500,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: G.gold,
                            marginBottom: 16,
                        }}
                    >
                        Services
                    </p>
                    <h1
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(36px, 5vw, 60px)",
                            fontWeight: 600,
                            color: G.white,
                            maxWidth: 640,
                            lineHeight: 1.15,
                            marginBottom: 24,
                        }}
                    >
                        Serious about sales. Serious about results.
                    </h1>
                    <p
                        style={{
                            fontSize: 18,
                            lineHeight: 1.7,
                            color: "rgba(255,255,255,0.6)",
                            maxWidth: 520,
                        }}
                    >
                        Every engagement is built around your deals and your
                        goals. We don't do generic programs. We do work that
                        moves numbers.
                    </p>
                </div>
            </section>

            {/* Sales Consulting */}
            <section style={{ background: G.white, padding: "100px 48px" }}>
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 80,
                        alignItems: "start",
                    }}
                >
                    <div>
                        <span
                            style={{
                                fontSize: 11,
                                fontWeight: 500,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: G.green700,
                                background: G.green50,
                                padding: "4px 12px",
                                borderRadius: 20,
                            }}
                        >
                            1:1 Engagement
                        </span>
                        <h2
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 42,
                                fontWeight: 600,
                                color: G.gray900,
                                margin: "20px 0 16px",
                                lineHeight: 1.15,
                            }}
                        >
                            Sales Consulting
                        </h2>
                        <p
                            style={{
                                fontSize: 16,
                                lineHeight: 1.8,
                                color: G.gray500,
                                marginBottom: 20,
                            }}
                        >
                            A focused, high-touch engagement for sales
                            professionals who know something isn't working and
                            want to fix it precisely. Not a course. Not a
                            workshop. A working relationship built around your
                            actual pipeline.
                        </p>
                        <p
                            style={{
                                fontSize: 16,
                                lineHeight: 1.8,
                                color: G.gray500,
                                marginBottom: 36,
                            }}
                        >
                            We'll audit how you're running deals today, identify
                            where value is being left on the table, and rebuild
                            your approach from the inside out — positioning,
                            pricing conversations, close structure, and
                            follow-through.
                        </p>
                        <button
                            onClick={() => setPage("contact")}
                            style={{
                                padding: "14px 32px",
                                background: G.green800,
                                color: G.white,
                                border: "none",
                                borderRadius: 4,
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 13,
                                fontWeight: 500,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                cursor: "pointer",
                            }}
                        >
                            Apply for Consulting
                        </button>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0,
                            border: `1px solid ${G.gray200}`,
                            borderRadius: 8,
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                background: G.green800,
                                padding: "20px 28px",
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontSize: 20,
                                    fontWeight: 600,
                                    color: G.white,
                                }}
                            >
                                What's included
                            </p>
                        </div>
                        {[
                            [
                                "Pipeline Audit",
                                "A full review of your current deals, pricing approach, and close methodology",
                            ],
                            [
                                "Deal Strategy Sessions",
                                "Live working sessions on your real opportunities in real time",
                            ],
                            [
                                "Positioning Overhaul",
                                "Rebuild how you communicate value so buyers understand why you're worth more",
                            ],
                            [
                                "Objection Frameworks",
                                "Custom responses built around the objections you actually face",
                            ],
                            [
                                "Close Rate Analysis",
                                "Understand where deals die and how to stop it from happening",
                            ],
                            [
                                "Revenue Per Deal Focus",
                                "Systematic approach to increasing average order size",
                            ],
                        ].map(([title, desc], i) => (
                            <div
                                key={title}
                                style={{
                                    padding: "20px 28px",
                                    background:
                                        i % 2 === 0 ? G.white : G.gray50,
                                    borderBottom: `1px solid ${G.gray200}`,
                                }}
                            >
                                <p
                                    style={{
                                        fontWeight: 500,
                                        color: G.gray900,
                                        marginBottom: 4,
                                    }}
                                >
                                    {title}
                                </p>
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: G.gray500,
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sales Training */}
            <section
                style={{
                    background: G.gray50,
                    padding: "100px 48px",
                    borderTop: `1px solid ${G.gray200}`,
                }}
            >
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 80,
                        alignItems: "start",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0,
                            border: `1px solid ${G.gray200}`,
                            borderRadius: 8,
                            overflow: "hidden",
                            order: 2,
                        }}
                    >
                        <div
                            style={{
                                background: G.navy800,
                                padding: "20px 28px",
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontSize: 20,
                                    fontWeight: 600,
                                    color: G.white,
                                }}
                            >
                                Core curriculum
                            </p>
                        </div>
                        {[
                            [
                                "Value-Based Selling",
                                "Frame your offer around outcomes buyers care about, not features",
                            ],
                            [
                                "Buyer Psychology",
                                "Understand how decisions are made and how to align with that process",
                            ],
                            [
                                "Price & Negotiation",
                                "Hold your price, justify your value, and close without discounting",
                            ],
                            [
                                "Objection Handling",
                                "Turn resistance into momentum with structured, confident responses",
                            ],
                            [
                                "Discovery Mastery",
                                "Ask better questions. Understand more. Win more.",
                            ],
                            [
                                "Momentum & Follow-Through",
                                "Build habits that keep deals moving instead of dying in follow-up",
                            ],
                        ].map(([title, desc], i) => (
                            <div
                                key={title}
                                style={{
                                    padding: "20px 28px",
                                    background:
                                        i % 2 === 0 ? G.white : G.gray50,
                                    borderBottom: `1px solid ${G.gray200}`,
                                }}
                            >
                                <p
                                    style={{
                                        fontWeight: 500,
                                        color: G.gray900,
                                        marginBottom: 4,
                                    }}
                                >
                                    {title}
                                </p>
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: G.gray500,
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {desc}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div style={{ order: 1 }}>
                        <span
                            style={{
                                fontSize: 11,
                                fontWeight: 500,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: G.navy700,
                                background: G.navy50,
                                padding: "4px 12px",
                                borderRadius: 20,
                            }}
                        >
                            For Individuals
                        </span>
                        <h2
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 42,
                                fontWeight: 600,
                                color: G.gray900,
                                margin: "20px 0 16px",
                                lineHeight: 1.15,
                            }}
                        >
                            Sales Training
                        </h2>
                        <p
                            style={{
                                fontSize: 16,
                                lineHeight: 1.8,
                                color: G.gray500,
                                marginBottom: 20,
                            }}
                        >
                            A structured program for individual sales
                            professionals who want to sharpen the fundamentals
                            and see measurable improvement in the field — not in
                            a classroom six months from now, but in their next
                            deal.
                        </p>
                        <p
                            style={{
                                fontSize: 16,
                                lineHeight: 1.8,
                                color: G.gray500,
                                marginBottom: 36,
                            }}
                        >
                            We cover the skills that move revenue: value
                            framing, discovery, objection handling, pricing
                            conversations, and close. Delivered with direct
                            feedback, real-world application, and accountability
                            built in.
                        </p>
                        <button
                            onClick={() => setPage("contact")}
                            style={{
                                padding: "14px 32px",
                                background: G.navy800,
                                color: G.white,
                                border: "none",
                                borderRadius: 4,
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 13,
                                fontWeight: 500,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                cursor: "pointer",
                            }}
                        >
                            Enroll in Training
                        </button>
                    </div>
                </div>
            </section>

            {/* Lead Capture */}
            <section style={{ background: G.green900, padding: "100px 48px" }}>
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 80,
                        alignItems: "center",
                    }}
                >
                    <div>
                        <p
                            style={{
                                fontSize: 12,
                                fontWeight: 500,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: G.gold,
                                marginBottom: 16,
                            }}
                        >
                            Not sure which is right for you?
                        </p>
                        <h2
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 42,
                                fontWeight: 600,
                                color: G.white,
                                lineHeight: 1.15,
                                marginBottom: 20,
                            }}
                        >
                            Let's figure it out together.
                        </h2>
                        <p
                            style={{
                                fontSize: 16,
                                lineHeight: 1.8,
                                color: "rgba(255,255,255,0.6)",
                            }}
                        >
                            Tell us where you are and what you're working
                            toward. The first conversation costs you nothing.
                        </p>
                    </div>
                    <LeadForm bg={G.white} />
                </div>
            </section>

            {/* Footer */}
            <footer
                style={{
                    background: G.green900,
                    borderTop: `1px solid rgba(255,255,255,0.08)`,
                    padding: "32px 48px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <p
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 18,
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.5)",
                    }}
                >
                    Barringer Consulting
                </p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
                    © {new Date().getFullYear()} Barringer Consulting. All
                    rights reserved.
                </p>
            </footer>
        </div>
    )
}

function ContactPage() {
    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <section
                style={{ background: G.green900, padding: "100px 48px 80px" }}
            >
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <p
                        style={{
                            fontSize: 12,
                            fontWeight: 500,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: G.gold,
                            marginBottom: 16,
                        }}
                    >
                        Contact
                    </p>
                    <h1
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(36px, 5vw, 60px)",
                            fontWeight: 600,
                            color: G.white,
                            maxWidth: 560,
                            lineHeight: 1.15,
                            marginBottom: 20,
                        }}
                    >
                        Let's talk about what's possible.
                    </h1>
                    <p
                        style={{
                            fontSize: 18,
                            lineHeight: 1.7,
                            color: "rgba(255,255,255,0.6)",
                            maxWidth: 480,
                        }}
                    >
                        The first conversation is free. Fill out the form and
                        we'll be in touch within one business day.
                    </p>
                </div>
            </section>
            <section style={{ background: G.gray50, padding: "80px 48px" }}>
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr",
                        gap: 80,
                    }}
                >
                    <div>
                        <h3
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 26,
                                fontWeight: 600,
                                color: G.gray900,
                                marginBottom: 16,
                            }}
                        >
                            Barringer Consulting
                        </h3>
                        <p
                            style={{
                                fontSize: 14,
                                lineHeight: 1.8,
                                color: G.gray500,
                                marginBottom: 28,
                            }}
                        >
                            Sales performance consulting for professionals who
                            are serious about growing their revenue and their
                            career.
                        </p>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 12,
                            }}
                        >
                            <a
                                href="mailto:williamgblauvelt@gmail.com"
                                style={{
                                    fontSize: 14,
                                    color: G.green700,
                                    textDecoration: "none",
                                }}
                            >
                                williamgblauvelt@gmail.com
                            </a>
                        </div>
                    </div>
                    <LeadForm />
                </div>
            </section>
            <footer
                style={{
                    background: G.green900,
                    borderTop: `1px solid rgba(255,255,255,0.08)`,
                    padding: "32px 48px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <p
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 18,
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.5)",
                    }}
                >
                    Barringer Consulting
                </p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
                    © {new Date().getFullYear()} Barringer Consulting. All
                    rights reserved.
                </p>
            </footer>
        </div>
    )
}

export default function BarringerConsulting() {
    const [page, setPage] = useState("home")

    return (
        <div style={{ minHeight: "100vh", background: G.white }}>
            <style>{fonts}</style>
            <Nav page={page} setPage={setPage} />
            {page === "home" && <HomePage setPage={setPage} />}
            {page === "services" && <ServicesPage setPage={setPage} />}
            {page === "contact" && <ContactPage />}
        </div>
    )
}
