import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";
import "swiper/css/navigation";
import lottie from "lottie-web";

const CDN = "https://cdn.prod.website-files.com/690b5a39d269efd72421ec15";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it Works?", href: "#how-it-works" },
  { label: "About", href: "#about" },
];

const MAIN_FEATURES = [
  {
    title: "Task Assignment",
    desc: "Assign tasks to the right team members with clear responsibilities and deadlines.",
    lottie: "https://lottie.host/c6b4acd4-991f-46a0-afc4-c02f3cc5d641/hcGjDAyig6.json",
  },
  {
    title: "Real-Time Updates",
    desc: "Keep track of task progress instantly and stay updated without constant follow-ups.",
    lottie: "https://lottie.host/1b75c8f9-4128-4555-abec-348d2a977634/D19qscM3FK.json",
  },
  {
    title: "Scalable Workflow",
    desc: "Organize your work whether you're a small team or growing organization.",
    lottie: "https://lottie.host/8c709282-004b-41f9-a7f6-3d8cceb3a9a0/EvAKdCIDRR.json",
  },
  {
    title: "Team Collaboration",
    desc: "Work together efficiently with shared task visibility and updates.",
    lottie: "https://lottie.host/41e71b18-b244-46ab-8026-e2e29504c618/yTRLP2CFcf.json",
  },
  {
    title: "Progress Tracking",
    desc: "Monitor completed and pending tasks to ensure everything stays on track.",
    lottie: "https://lottie.host/df6606ab-1ddb-4ad4-9fc4-02f94775d61f/6xsIp9Wd32.json",
  },
  {
    title: "Role-Based Access",
    desc: "Manage permissions with admin and user roles to keep your workflow structured.",
    lottie: "https://lottie.host/01b95ef3-68f9-413c-9082-071d0c88454a/8EYRipU5Mw.json",
  },
];

const HOW_STEPS = [
  { n: "01", title: "Add Your Team", desc: "Invite team members and assign roles based on responsibilities." },
  { n: "02", title: "Create Tasks", desc: "Break work into tasks and assign them with deadlines." },
  { n: "03", title: "Collaborate", desc: "Share updates and keep everyone aligned on progress." },
  { n: "04", title: "Track Progress", desc: "Monitor task completion and ensure deadlines are met." },
  { n: "05", title: "Improve Workflow", desc: "Identify delays and optimize how your team works." },
];


const FAQS = [
  { q: "What is MiniTeam?", a: "MiniTeam is a team management platform that helps you organize tasks and track progress efficiently." },
  { q: "Can I manage roles?", a: "Yes, you can assign roles like admin and user to control access and responsibilities." },
  { q: "Is it suitable for small teams?", a: "Yes, MiniTeam works well for both small teams and growing organizations." },
  { q: "Does it support real-time updates?", a: "Yes, task updates are reflected instantly so everyone stays informed." },
  
];

// --- Lottie Loader ---
function LottiePlayer({ src, className }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const anim = lottie.loadAnimation({
      container: ref.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: src,
    });

    return () => anim.destroy();
  }, [src]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

// --- Scroll Reveal Hook ---
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// --- FAQ Item ---
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        padding: "20px 0",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <h3 style={{ margin: 0, fontSize: "clamp(15px,1.5vw,18px)", fontWeight: 500, color: "#0b040d", lineHeight: 1.4 }}>{q}</h3>
        <span style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "rgba(0,0,0,0.05)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          fontSize: 20, fontWeight: 300, color: "#0b040d",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease",
        }}>+</span>
      </div>
      <div style={{
        overflow: "hidden",
        maxHeight: open ? "400px" : "0px",
        transition: "max-height 0.4s ease",
      }}>
        <p style={{ margin: "14px 0 0", fontSize: 15, lineHeight: 1.7, color: "rgba(11,4,13,0.7)" }}>{a}</p>
      </div>
    </div>
  );
}

// ===================== MAIN COMPONENT =====================
export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
 

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lottie web import for feature cards
  const [heroRef, heroVisible] = useReveal(0.1);
  const [statsRef, statsVisible] = useReveal(0.15);
  const [howRef, howVisible] = useReveal(0.1);
  const [faqRef, faqVisible] = useReveal(0.1);



  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0b040d", color: "#fff", overflowX: "hidden" }}>

      {/* ===== GOOGLE FONT ===== */}
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* ===== HEADER ===== */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 clamp(20px,5vw,80px)",
        height: 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "linear-gradient(135deg, #5a2d86, #883992)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "none",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}>
        <a href="/" style={{ textDecoration: "none" }}>
    <img 
      src="/logo.png"   
      alt="MiniTeam"
      style={{
        height:45,
        objectFit: "contain",
      
      }}
    />
  </a>

        <nav style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} style={{
              textDecoration: "none", fontSize: 15, fontWeight: 500,
              color:  "rgba(255,255,255,255)",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = scrolled ? "#0b040d" : "#fff"}
              onMouseLeave={e => e.target.style.color = scrolled ? "rgba(11,4,13,0.7)" : "rgba(255,255,255,0.75)"}
            >{label}</a>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
  <Link
    to="/Register"
    style={{
      textDecoration: "none",
      padding: "0.5px",
      borderRadius: 999,
      background: "#ffffff",
      backdropFilter: "blur(8px)",
      boxShadow: "0 0 15px rgba(171,0,255,0.25)",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 20px",
        borderRadius: 999,
        background: "linear-gradient(135deg, #020202, #383538)",
        color: "#dfd3e2",
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      Register
      <span
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#7f00ff",
          fontSize: 12,
        }}
      >
         → 
            </span>
    </div>
  </Link>
  <Link
    to="/login"
    style={{
      textDecoration: "none",
      padding: "0.5px",
      borderRadius: 999,
      background: "rgba(10, 0, 0, 0.08)",
      backdropFilter: "blur(8px)",
      boxShadow: "0 0 25px rgba(171,0,255,0.25)",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 20px",
        borderRadius: 999,
        background: "#fff",
        color: "#0b040d",
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      Login
      <span
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#7f00ff,#e100ff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 12,
        }}
      >
        →       
      </span>
    </div>
  </Link>

</div>
      </header>

      {/* ===== HERO ===== */}
      <section style={{ position: "relative", minHeight: "100vh", minWidth: "100%", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* Video Background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <video
  autoPlay
  loop
  muted
  playsInline
  style={{
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 1, // FULL visibility
    filter: "brightness(0.9) contrast(1.1)"
  }}
>
            <source src="https://u1core-dev.com/hero_section_4K_full.mp4" type="video/mp4" />
          </video>
          <div
  style={{
    position: "absolute",
    inset: 0,
    background: `
      linear-gradient(
        to right,
        rgba(5, 1, 10, 0.85) 0%,
        rgba(5, 1, 10, 0.4) 40%,
        rgba(5, 1, 10, 0.1) 70%,
        transparent 100%
      )
    `,
  }}
/>
{/* Labels */}
          <section
  style={{
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  }}
>
  <div
    style={{
      position: "absolute",
      inset: 0,
      zIndex: 0,
    }}
  />

  {/* LEFT CONTENT */}
  <div
    style={{
      position: "relative",
      zIndex: 1,
      padding: "140px clamp(20px, 8vw, 120px) 80px",
      maxWidth: "640px",
    }}
  >
    <h1
      style={{
        fontSize: "clamp(36px, 5.5vw, 58px)",
        fontWeight: 700,
        lineHeight: 1.1,
        margin: "0 0 24px",
        color: "#fff",
      }}
    >
      Stop Managing Chaos. <span style={{ color: "#ab00ff" }}>Start Managing Teams.</span>
    </h1>

    <p
      style={{
        fontSize: "clamp(15px, 1.5vw, 18px)",
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.75)",
        marginBottom: 40,
        maxWidth: 520,
      }}
    >
      A simple and powerful platform to manage tasks, assign work, and track your team's progress in real-time — all in one place.
    </p>

    <button
      style={{
        padding: "14px 26px",
        borderRadius: 30,
        border: "none",
        background: "linear-gradient(135deg, #ab00ff, #7b2cff)",
        color: "#fff",
        fontSize: 15,
        cursor: "pointer",
      }}
    >
      Try it now →
    </button>
  </div>

  {/* RIGHT MIDDLE BADGES */}
  <div
    style={{
      position: "absolute",
      top: "60%",              // ✅ CHANGED (was bottom)
      right: "40px",
      transform: "translateY(-50%)", // ✅ NEW (perfect vertical centering)
      display: "flex",
      flexWrap: "wrap",
      gap: 14,                // ✅ INCREASED spacing
      maxWidth: "360px",      // ✅ slightly bigger container
      justifyContent: "flex-end",
      zIndex: 2,
    }}
  >
    {[
      "Smart task assignment",
      "Role-based access control ",
      "Improves team productivity",
    ].map((t) => (
      <span
        key={t}
        style={{
          padding: "12px 18px",     // ✅ BIGGER
          background: "rgba(171,0,255,0.12)",
          border: "1px solid rgba(171,0,255,0.3)",
          borderRadius: 24,         // ✅ slightly rounder
          fontSize: 15,             // ✅ BIGGER text
          color: "#ddbbf1",
          display: "flex",
          alignItems: "center",
          gap: 8,                   // ✅ more spacing inside
          backdropFilter: "blur(10px)", // ✅ stronger glass effect
        }}
      >
        <span style={{ color: "#ab00ff", fontSize: 18 }}>✦</span> {/* ✅ BIGGER ICON */}
        {t}
      </span>
    ))}
  </div>
</section>
        </div>

        <div ref={heroRef} style={{
          position: "relative", zIndex: 1,
          padding: "140px clamp(20px,8vw,120px) 80px",
          maxWidth: 640,
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateX(0)" : "translateX(-40px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>
          

          <h1 style={{
            fontSize: "clamp(36px,5.5vw,58px)",
            fontWeight: 700, lineHeight: 1.1, margin: "0 0 24px",
            color: "#fff",
          }}>
            Stop Managing Chaos.{" "} <span style={{
              background: "linear-gradient(90deg, #7f00ff, #e100ff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Start Managing Teams.</span>
          </h1>

          <p style={{ fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", margin: "0 0 40px", maxWidth: 520 }}>
            A simple and powerful platform to manage tasks, assign work, and track your team's progress in real-time — all in one place.
          </p>

          <a href="/login" target="_blank" rel="noopener" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "14px 28px",
            background: "#fff", color: "#0b040d",
            fontSize: 15, fontWeight: 600, borderRadius: 10,
            textDecoration: "none",
            border: "1px solid rgba(233,197,255,0.4)",
            transition: "transform 0.2s",
          }}>
            Try it now
            <span style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "#ab00ff", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
            }}>→</span>
          </a>
        </div>
      </section>

      {/* ===== MAIN FEATURES ===== */}
<section
  id="features"
  style={{
    padding: "100px clamp(20px,6vw,80px)",
    background: `
      radial-gradient(circle at 20% 20%, rgba(171,0,255,0.08), transparent 40%),
      radial-gradient(circle at 80% 30%, rgba(171,0,255,0.06), transparent 45%),
      #f5f0f7
    `,
  }}
>
  <div style={{ maxWidth: 1280, margin: "0 auto" }}>
    
    {/* Heading */}
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "#7f34a4",
          letterSpacing: 0.5,
          display: "block",
          marginBottom: 12,
        }}
      >
        Main features
      </span>

      <h2
        style={{
          fontSize: "clamp(30px,4vw,52px)",
          fontWeight: 700,
          color: "#0b040d",
          margin: "0 0 16px",
        }}
      >
        Power Up Your <span style={{ color: "#7f34a4" }}>Team Workflow</span>
      </h2>

      <p
        style={{
          fontSize: 16,
          color: "rgba(11,4,13,0.65)",
          maxWidth: 420,
          margin: "0 auto",
        }}
      >
        Everything you need to manage tasks, collaborate with your team, and stay organized — without the complexity.
      </p>
    </div>

    {/* Grid */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 24,
      }}
    >
      {MAIN_FEATURES.map((f, i) => (
        <FeatureCard key={i} feature={f} />
      ))}
    </div>
  </div>
</section>


      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" style={{ background: "#0b040d", padding: "100px clamp(20px,6vw,80px)", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "8px 16px", borderRadius: 20,
              background: "rgba(171,0,255,0.1)", border: "1px solid rgba(171,0,255,0.25)",
              fontSize: 13, color: "#ddbbf1", marginBottom: 20,
            }}>How it Works</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#fff", maxWidth: 520, margin: "0 0 16px" }}>
              Your Path from Tasks  <span style={{ background: "linear-gradient(90deg,#7f00ff,#e100ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>to Team Success</span>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", maxWidth: 540, margin: 0 }}>
              Organize tasks, assign work, and track your team's progress - all in one place.
            </p>
          </div>

          {/* Horizontal scroll steps */}
          <div style={{ display: "flex", overflowX: "auto", gap: 20, paddingBottom: 24, scrollSnapType: "x mandatory" }}>
            {HOW_STEPS.map((s, i) => (
              <div key={i} ref={i === 0 ? howRef : null} style={{
                minWidth: 280, flex: "0 0 280px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16, padding: "28px 24px",
                scrollSnapAlign: "start",
                opacity: howVisible ? 1 : 0,
                transform: howVisible ? "translateX(0)" : "translateX(40px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "rgba(171,0,255,0.15)",
                  border: "1px solid rgba(171,0,255,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 600, color: "#ab00ff",
                  marginBottom: 18,
                }}>{s.n}</div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: "#fff", margin: "0 0 10px" }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.6)", margin: 0 }}>{s.desc}</p>
              </div>
            ))}

            {/* Final CTA card */}
            <div style={{
              minWidth: 320, flex: "0 0 320px",
              background: "linear-gradient(135deg, rgba(127,0,255,0.25), rgba(225,0,255,0.15))",
              border: "1px solid rgba(171,0,255,0.3)",
              borderRadius: 16, padding: "28px 24px",
              scrollSnapAlign: "start",
              display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start",
            }}>
              <h2 style={{ fontSize: "clamp(18px,2.5vw,18px)", fontWeight: 700, color: "#fff", margin: "0 0 24px" }}>
                Ready to Organize Your Team Better? <span style={{ background: "linear-gradient(90deg,#7f00ff,#e100ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Start managing tasks and improving productivity with MiniTeam.</span>
              </h2>
              <a href="/login" target="_blank" rel="noopener" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "13px 24px", background: "#fff", color: "#0b040d",
                fontSize: 14, fontWeight: 600, borderRadius: 8,
                textDecoration: "none",
              }}>
                Try it now <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#ab00ff", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>



      {/* ===== HOME CTA ===== */}
      <section style={{ background: "#0b040d", padding: "80px clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(127,0,255,0.12), rgba(225,0,255,0.06))",
            border: "1px solid rgba(171,0,255,0.2)",
            borderRadius: 24, overflow: "hidden",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            minHeight: 340,
          }}>
            <div style={{ padding: "60px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h2 style={{ fontSize: "clamp(24px,3.5vw,44px)", fontWeight: 700, color: "#fff", margin: "0 0 28px", lineHeight: 1.2 }}>
                Stop Losing Time on Disorganized Work. <span style={{ background: "linear-gradient(90deg,#7f00ff,#e100ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}> Start Managing Your Team the Right Way.</span>
              </h2>
              <a href="/login" target="_blank" rel="noopener" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "13px 24px", background: "#fff", color: "#0b040d",
                fontSize: 14, fontWeight: 600, borderRadius: 8,
                textDecoration: "none", width: "fit-content",
              }}>
                Try it now <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#ab00ff", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>→</span>
              </a>
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img
                src="/image.png"
                alt="Dashboard"
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={{ background: "#fff", padding: "100px clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#7f34a4", display: "block", marginBottom: 12 }}>FAQ</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#0b040d", margin: 0 }}>
              Check Out the Answers to <span style={{ color: "#7f34a4" }}>Common Questions</span>
            </h2>
          </div>
          <div ref={faqRef} style={{
            opacity: faqVisible ? 1 : 0,
            transform: faqVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}>
            {FAQS.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section id="about" style={{ background: "#0b040d", padding: "120px clamp(20px,6vw,80px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(171,0,255,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <span style={{ display: "inline-flex", padding: "8px 16px", borderRadius: 20, background: "rgba(171,0,255,0.1)", border: "1px solid rgba(171,0,255,0.25)", fontSize: 13, color: "#ddbbf1", marginBottom: 24 }}>Get Started</span>
          <h2 style={{ fontSize: "clamp(28px,4.5vw,60px)", fontWeight: 700, color: "#fff", maxWidth: 700, margin: "0 auto 20px", lineHeight: 1.15 }}>
            Ready to Organize <span style={{ background: "linear-gradient(90deg,#7f00ff,#e100ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Your Team Better? </span>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", margin: "0 auto 40px", maxWidth: 380 }}>
            Start managing tasks, assigning work, and tracking progress — all in one place.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/login" target="_blank" rel="noopener" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 28px", background: "#fff", color: "#0b040d",
              fontSize: 15, fontWeight: 600, borderRadius: 10,
              textDecoration: "none",
            }}>
              Start Now <span style={{ width: 26, height: 26, borderRadius: "50%", background: "#ab00ff", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>→</span>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=manishka110518@gmail.com"
  target="_blank" rel="noopener" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 28px",
              background: "transparent", color: "#fff",
              fontSize: 15, fontWeight: 600, borderRadius: 10,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.2)",
            }}>
              Contact us <span style={{ width: 26, height: 26, borderRadius: "50%", background: "#ab00ff", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: "#0b040d", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "48px clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr", gap: 600, marginBottom: 40 }}>
            <div>
              <a href="/" style={{ textDecoration: "none" }}>
    <img 
      src="/logo.png"   
      alt="MiniTeam"
      style={{
        height:45,
        objectFit: "contain",
      
      }}
    />
  </a>        
            </div>
            <div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "0 0 14px", fontWeight: 600 }}>Contact</p>
                Agra, <br />India <br/>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=manishka110518@gmail.com"
  target="_blank" style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>manishka110518@gmail.com</a>        </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

// ===== FEATURE CARD SUBCOMPONENT =====
function FeatureCard({ feature }) {
  const [ref, visible] = useReveal(0.1);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(171,0,255,0.15)",
        boxShadow: "0 10px 30px rgba(171,0,255,0.08)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.4s ease",
        cursor: "pointer",
      }}

      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
        e.currentTarget.style.boxShadow = "0 20px 60px rgba(171,0,255,0.25)";
        const glow = e.currentTarget.querySelector(".glow");
        if (glow) glow.style.opacity = "1";
      }}

      onMouseLeave={(e) => {
        e.currentTarget.style.transform = visible ? "translateY(0)" : "translateY(30px)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(171,0,255,0.08)";
        const glow = e.currentTarget.querySelector(".glow");
        if (glow) glow.style.opacity = "0";
      }}
    >
      <div
        className="glow"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at top, rgba(171,0,255,0.2), transparent 60%)",
          opacity: 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "2px",
          background: "linear-gradient(90deg, transparent, #ab00ff, transparent)",
          opacity: 0.6,
        }}
      />

      <div
        style={{
          height: 160,
          overflow: "hidden",
          background: "#f8f4fb",
        }}
      >
        <LottiePlayer src={feature.lottie} />
      </div>

      <div style={{ padding: "24px 24px 28px" }}>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "#0b040d",
            margin: "0 0 10px",
          }}
        >
          {feature.title}
        </h3>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.65,
            color: "rgba(11,4,13,0.65)",
            margin: 0,
          }}
        >
          {feature.desc}
        </p>
      </div>
    </div>
  );
}
