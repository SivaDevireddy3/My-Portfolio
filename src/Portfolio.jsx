import { useState, useEffect, useRef } from "react";

const NAV = ["Home", "About", "Experience", "Skills", "Contact"];

const titles = ["Full Stack Developer", "Backend Engineer", "Problem Solver", "LeetCode Knight"];

const SKILLS = [
  { name: "Java", pct: 90, color: "#f97316" },
  { name: "Spring Boot", pct: 88, color: "#22d3ee" },
  { name: "React.js", pct: 82, color: "#60a5fa" },
  { name: "PostgreSQL", pct: 80, color: "#a78bfa" },
  { name: "REST APIs", pct: 88, color: "#34d399" },
  { name: "JavaScript", pct: 80, color: "#facc15" },
  { name: "HTML5/CSS3", pct: 85, color: "#fb7185" },
  { name: "System Design", pct: 72, color: "#c084fc" },
];

const STATS = [
  { val: "1000+", label: "Problems Solved", icon: "⚡", color: "#facc15" },
  { val: "Knight", label: "LeetCode Rank", icon: "♟", color: "#60a5fa" },
  { val: "4 ★", label: "GFG Rating", icon: "🌿", color: "#34d399" },
  { val: "3×", label: "Cricket Champ", icon: "🏏", color: "#f97316" },
];

const EXP = [
  {
    role: "Software Engineer",
    company: "APCFSS",
    full: "Andhra Pradesh Centre for Financial Systems & Services",
    period: "Nov 2025 – Present",
    tags: ["Java", "Spring Boot", "React.js", "PostgreSQL"],
    desc: "Building scalable web apps for AP government services. Designing REST APIs, business logic, and database integrations while crafting responsive React.js frontends.",
    color: "#60a5fa",
  },
  {
    role: "Software Engineer Intern",
    company: "APCFSS",
    full: "Andhra Pradesh Centre for Financial Systems & Services",
    period: "May 2025 – Dec 2025",
    tags: ["Spring Framework", "HTML5", "JavaScript", "PostgreSQL"],
    desc: "Contributed to full-stack government service platforms. Gained hands-on experience in API design, database integration, and frontend development — converting to a full-time role.",
    color: "#a78bfa",
  },
  {
    role: "B.Tech – Computer Science",
    company: "RGUKT Ongole",
    full: "Rajiv Gandhi University of Knowledge Technologies",
    period: "Aug 2021 – Apr 2025",
    tags: ["DSA", "OOP", "OS", "DBMS"],
    desc: "Built strong foundations in algorithms, data structures, and software engineering. Won 3 collegiate cricket championships with team Catch Droppers.",
    color: "#34d399",
  },
];

const CERTS = [
  { name: "Master Java Programming", icon: "☕" },
  { name: "Problem Solving (Intermediate)", icon: "🧩" },
  { name: "Spring Boot", icon: "🌱" },
  { name: "JavaScript (Intermediate)", icon: "✦" },
];

function useInView() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    const cols = ["#60a5fa", "#a78bfa", "#34d399", "#facc15", "#f97316", "#fb7185"];
    const pts = Array.from({ length: 90 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.4,
      color: cols[Math.floor(Math.random() * cols.length)]
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "bb";
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(148,163,255,${0.1 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.55 }} />;
}

function SkillBar({ skill, visible, i }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 600 }}>{skill.name}</span>
        <span style={{ fontSize: 12, color: skill.color, fontWeight: 700 }}>{skill.pct}%</span>
      </div>
      <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: visible ? `${skill.pct}%` : "0%",
          background: `linear-gradient(90deg, ${skill.color}66, ${skill.color})`,
          borderRadius: 99,
          transition: `width 1.4s cubic-bezier(.4,0,.2,1) ${i * 0.08}s`,
          boxShadow: `0 0 12px ${skill.color}55`,
        }} />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [ready, setReady] = useState(false);
  const [typed, setTyped] = useState("");
  const [cursorOn, setCursorOn] = useState(true);
  const [aboutRef, aboutV] = useInView();
  const [expRef, expV] = useInView();
  const [skillRef, skillV] = useInView();
  const [statsRef, statsV] = useInView();
  const [certRef, certV] = useInView();
  const [contactRef, contactV] = useInView();

  const tIdx = useRef(0), charIdx = useRef(0), deleting = useRef(false);

  useEffect(() => { setTimeout(() => setReady(true), 150); }, []);
  useEffect(() => {
    const iv = setInterval(() => setCursorOn(c => !c), 530);
    return () => clearInterval(iv);
  }, []);
  useEffect(() => {
    const iv = setInterval(() => {
      const t = titles[tIdx.current];
      if (!deleting.current) {
        if (charIdx.current < t.length) { charIdx.current++; setTyped(t.slice(0, charIdx.current)); }
        else setTimeout(() => { deleting.current = true; }, 2000);
      } else {
        if (charIdx.current > 0) { charIdx.current--; setTyped(t.slice(0, charIdx.current)); }
        else { deleting.current = false; tIdx.current = (tIdx.current + 1) % titles.length; }
      }
    }, 68);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const fn = () => {
      NAV.forEach(n => {
        const el = document.getElementById(n);
        if (el && el.getBoundingClientRect().top <= 90) setActive(n);
      });
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#020817", color: "#e2e8f0", minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes aur1{0%,100%{transform:translate(-20%,-20%) rotate(0deg) scale(1)}40%{transform:translate(5%,-5%) rotate(140deg) scale(1.12)}70%{transform:translate(-8%,12%) rotate(240deg) scale(.92)}}
        @keyframes aur2{0%,100%{transform:translate(15%,20%) rotate(0deg)}40%{transform:translate(-10%,5%) rotate(-130deg) scale(1.1)}70%{transform:translate(10%,-12%) rotate(-250deg) scale(.95)}}
        @keyframes aur3{0%,100%{transform:translate(-5%,-25%) scale(1)}50%{transform:translate(5%,5%) scale(1.18)}}
        @keyframes fdslide{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulseRing{0%{transform:scale(.8);opacity:.9}100%{transform:scale(1.6);opacity:0}}
        @keyframes scrollDot{0%,100%{transform:translateY(0)}50%{transform:translateY(7px)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .exp-card:hover{border-color:rgba(255,255,255,0.14)!important;transform:translateX(6px)!important}
        .contact-item:hover{border-color:rgba(255,255,255,0.14)!important;transform:translateY(-3px)!important}
        .nav-btn:hover{background:rgba(255,255,255,0.06)!important;color:#e2e8f0!important}
      `}</style>

      {/* Aurora background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        {[
          { w: "75vw", bg: "rgba(59,130,246,0.15)", t: "8%", l: "15%", anim: "aur1 20s ease-in-out infinite" },
          { w: "60vw", bg: "rgba(139,92,246,0.14)", t: "35%", r: "8%", anim: "aur2 24s ease-in-out infinite" },
          { w: "55vw", bg: "rgba(52,211,153,0.10)", b: "8%", l: "25%", anim: "aur3 17s ease-in-out infinite" },
        ].map((a, i) => (
          <div key={i} style={{
            position: "absolute",
            width: a.w, height: a.w,
            background: `radial-gradient(ellipse, ${a.bg} 0%, transparent 68%)`,
            top: a.t, left: a.l, right: a.r, bottom: a.b,
            borderRadius: "50%",
            animation: a.anim,
          }} />
        ))}
        {/* subtle grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }} />
      </div>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 18, left: "50%", transform: "translateX(-50%)",
        zIndex: 200, display: "flex", gap: 4, alignItems: "center",
        background: "rgba(2,8,23,0.65)", backdropFilter: "blur(22px)",
        border: "1px solid rgba(255,255,255,0.09)", borderRadius: 999,
        padding: "9px 24px",
        boxShadow: "0 0 40px rgba(0,0,0,0.4)",
      }}>
        {NAV.map(n => (
          <button key={n} className="nav-btn" onClick={() => go(n)} style={{
            background: active === n ? "rgba(96,165,250,0.14)" : "transparent",
            color: active === n ? "#60a5fa" : "#64748b",
            border: active === n ? "1px solid rgba(96,165,250,0.28)" : "1px solid transparent",
            borderRadius: 999, padding: "7px 18px",
            fontSize: 13, fontWeight: active === n ? 600 : 400,
            cursor: "pointer", fontFamily: "inherit",
            transition: "all .2s",
          }}>{n}</button>
        ))}
      </nav>

      {/* HERO */}
      <section id="Home" style={{
        position: "relative", zIndex: 1,
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "0 6%", overflow: "hidden",
      }}>
        <Particles />
        <div style={{
          position: "relative", zIndex: 2,
          opacity: ready ? 1 : 0,
          animation: ready ? "fdslide 1s ease forwards" : "none",
        }}>
          {/* availability badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.22)",
            borderRadius: 999, padding: "6px 18px", fontSize: 12, letterSpacing: 1.5,
            color: "#34d399", textTransform: "uppercase", marginBottom: 30,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#34d399",
              display: "inline-block", position: "relative",
            }}>
              <span style={{
                position: "absolute", inset: -2, borderRadius: "50%",
                background: "rgba(52,211,153,0.5)",
                animation: "pulseRing 1.8s ease-out infinite",
              }} />
            </span>
            Open to opportunities
          </div>

          {/* name */}
          <h1 style={{
            fontSize: "clamp(48px,9vw,96px)", fontWeight: 800,
            lineHeight: 1.01, margin: "0 0 14px", letterSpacing: -2.5,
          }}>
            <span style={{ background: "linear-gradient(135deg,#fff 0%,#94a3b8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Siva{" "}
            </span>
            <span style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa,#34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Devireddy
            </span>
          </h1>

          {/* typewriter */}
          <div style={{ fontSize: "clamp(15px,2.5vw,22px)", color: "#64748b", marginBottom: 44, minHeight: 36, display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>
            <span style={{ background: "linear-gradient(90deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700 }}>{typed}</span>
            <span style={{ opacity: cursorOn ? 1 : 0, color: "#a78bfa", fontWeight: 200, fontSize: "1.1em" }}>|</span>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => go("Experience")} style={{
              background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
              color: "#fff", border: "none", padding: "14px 32px",
              borderRadius: 999, fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3,
              boxShadow: "0 0 35px rgba(99,102,241,0.45), 0 0 60px rgba(99,102,241,0.15)",
              transition: "transform .15s, box-shadow .15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(99,102,241,0.6), 0 0 80px rgba(99,102,241,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 35px rgba(99,102,241,0.45), 0 0 60px rgba(99,102,241,0.15)"; }}
            >View My Work</button>
            <button onClick={() => go("Contact")} style={{
              background: "rgba(255,255,255,0.04)", color: "#e2e8f0",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "14px 32px", borderRadius: 999,
              fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
              backdropFilter: "blur(10px)", transition: "all .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
            >Contact Me</button>
          </div>
        </div>

        {/* scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "#334155", fontSize: 9, letterSpacing: 3 }}>
          <span>SCROLL</span>
          <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom, #3b82f6, transparent)", animation: "scrollDot 1.6s ease infinite" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="About" style={{ position: "relative", zIndex: 1, padding: "100px 7% 80px" }}>
        <div ref={aboutRef} style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "center",
          opacity: aboutV ? 1 : 0, transform: aboutV ? "none" : "translateY(36px)",
          transition: "all .9s cubic-bezier(.4,0,.2,1)",
        }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", background: "linear-gradient(90deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700, marginBottom: 10 }}>About Me</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, letterSpacing: -0.5, marginBottom: 20, color: "#f1f5f9" }}>Crafting digital<br />experiences</h2>
            {[
              <>I'm Siva — a Full Stack Developer at <strong style={{ color: "#60a5fa" }}>APCFSS</strong>, building scalable web applications for Andhra Pradesh government services using <strong style={{ color: "#60a5fa" }}>Java, Spring Boot</strong> and <strong style={{ color: "#a78bfa" }}>React.js</strong>.</>,
              <>I lean toward backend — system design, performance, and clean architecture. With <strong style={{ color: "#34d399" }}>1000+ problems</strong> solved on LeetCode and GFG, algorithmic thinking shapes everything I build.</>,
              <>Off-screen, I'm a <strong style={{ color: "#facc15" }}>3-time cricket champion</strong> 🏏 with my college team, Catch Droppers.</>,
            ].map((p, i) => (
              <p key={i} style={{ color: "#94a3b8", lineHeight: 1.9, fontSize: 14, marginBottom: 14 }}>{p}</p>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { l: "Location", v: "Kanigiri, AP", icon: "📍", c: "#fb7185" },
              { l: "Current Role", v: "Software Engineer", icon: "💼", c: "#60a5fa" },
              { l: "Education", v: "B.Tech CS, RGUKT", icon: "🎓", c: "#a78bfa" },
              { l: "Focus", v: "Backend & DSA", icon: "⚙️", c: "#34d399" },
            ].map(x => (
              <div key={x.l} style={{
                background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)",
                border: `1px solid ${x.c}28`, borderTop: `2px solid ${x.c}66`,
                borderRadius: 16, padding: "22px 20px",
                animation: "floatY 4s ease-in-out infinite",
                animationDelay: `${Math.random() * 2}s`,
              }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{x.icon}</div>
                <div style={{ fontSize: 10, color: "#475569", letterSpacing: 1.5, marginBottom: 5, textTransform: "uppercase" }}>{x.l}</div>
                <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 600 }}>{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 7% 80px" }}>
        <div ref={statsRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px,1fr))", gap: 16 }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              background: "rgba(255,255,255,0.025)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20, padding: "28px 20px", textAlign: "center",
              position: "relative", overflow: "hidden",
              opacity: statsV ? 1 : 0, transform: statsV ? "translateY(0) scale(1)" : "translateY(28px) scale(.95)",
              transition: `all .65s cubic-bezier(.4,0,.2,1) ${i * .1}s`,
            }}>
              <div style={{ position: "absolute", top: -24, right: -24, width: 80, height: 80, borderRadius: "50%", background: s.color + "14" }} />
              <div style={{ fontSize: 30, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: s.color, letterSpacing: -1, marginBottom: 4 }}>{s.val}</div>
              <div style={{ fontSize: 10, color: "#475569", letterSpacing: 1.5, textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EXPERIENCE */}
      <section id="Experience" style={{ position: "relative", zIndex: 1, padding: "80px 7%" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", background: "linear-gradient(90deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700, marginBottom: 10 }}>Journey</div>
        <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, letterSpacing: -0.5, marginBottom: 52, color: "#f1f5f9" }}>Experience</h2>
        <div ref={expRef}>
          {EXP.map((e, i) => (
            <div key={e.role} className="exp-card" style={{
              background: "rgba(255,255,255,0.025)", backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20,
              padding: "30px 32px", marginBottom: 20,
              position: "relative", overflow: "hidden",
              transition: "border-color .2s, transform .25s",
              opacity: expV ? 1 : 0, transform: expV ? "translateX(0)" : "translateX(-44px)",
              transitionDelay: `${i * .15}s`,
              transitionProperty: "opacity, transform, border-color",
            }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(to bottom, ${e.color}, transparent)`, borderRadius: "20px 0 0 20px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: e.color, boxShadow: `0 0 12px ${e.color}`, flexShrink: 0, marginTop: 7 }} />
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9" }}>{e.role}</div>
                    <div style={{ fontSize: 13, color: e.color, marginTop: 2, fontWeight: 600 }}>{e.company}</div>
                    <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{e.full}</div>
                  </div>
                </div>
                <span style={{ background: e.color + "14", border: `1px solid ${e.color}30`, color: e.color, borderRadius: 999, padding: "4px 14px", fontSize: 12, fontWeight: 600 }}>{e.period}</span>
              </div>
              <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.8, marginBottom: 14, marginLeft: 24 }}>{e.desc}</p>
              <div style={{ marginLeft: 24 }}>
                {e.tags.map(t => (
                  <span key={t} style={{ display: "inline-block", background: e.color + "14", border: `1px solid ${e.color}30`, color: e.color, fontSize: 11, padding: "3px 11px", borderRadius: 999, marginRight: 6, marginBottom: 6 }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="Skills" style={{ position: "relative", zIndex: 1, padding: "80px 7%" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", background: "linear-gradient(90deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700, marginBottom: 10 }}>Technical</div>
        <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, letterSpacing: -0.5, marginBottom: 52, color: "#f1f5f9" }}>Skills</h2>
        <div ref={skillRef} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 52px" }}>
          {SKILLS.slice(0, 4).map((s, i) => <SkillBar key={s.name} skill={s} visible={skillV} i={i} />)}
          {SKILLS.slice(4).map((s, i) => <SkillBar key={s.name} skill={s} visible={skillV} i={i + 4} />)}
        </div>

        {/* certs */}
        <div ref={certRef} style={{ marginTop: 64 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", background: "linear-gradient(90deg,#34d399,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700, marginBottom: 20 }}>Certifications</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 14 }}>
            {CERTS.map((c, i) => (
              <div key={c.name} style={{
                background: "rgba(255,255,255,0.025)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14,
                padding: "18px 22px", display: "flex", alignItems: "center", gap: 14,
                opacity: certV ? 1 : 0, transform: certV ? "translateY(0)" : "translateY(22px)",
                transition: `all .5s ease ${i * .1}s`,
              }}>
                <span style={{ fontSize: 22 }}>{c.icon}</span>
                <div style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 500, flex: 1 }}>{c.name}</div>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#34d399", flexShrink: 0 }}>✓</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="Contact" style={{ position: "relative", zIndex: 1, padding: "80px 7% 100px" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", background: "linear-gradient(90deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700, marginBottom: 10 }}>Let's Connect</div>
        <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, letterSpacing: -0.5, marginBottom: 52, color: "#f1f5f9" }}>Get In Touch</h2>
        <div ref={contactRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))", gap: 16, maxWidth: 720 }}>
          {[
            { icon: "📧", label: "Email", val: "sivadevireddy03@gmail.com", href: "mailto:sivadevireddy03@gmail.com", color: "#f97316" },
            { icon: "📱", label: "Phone", val: "+91 6301374803", href: "tel:+916301374803", color: "#60a5fa" },
            { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/sivadevireddy", href: "https://www.linkedin.com/in/sivadevireddy", color: "#a78bfa" },
            { icon: "📍", label: "Location", val: "Kanigiri, Andhra Pradesh", href: null, color: "#34d399" },
          ].map((c, i) => (
            <div key={c.label} className="contact-item" onClick={() => c.href && window.open(c.href, "_blank")} style={{
              display: "flex", alignItems: "center", gap: 16,
              background: "rgba(255,255,255,0.025)", backdropFilter: "blur(12px)",
              border: `1px solid rgba(255,255,255,0.06)`, borderTop: `2px solid ${c.color}44`,
              borderRadius: 16, padding: "20px 24px", cursor: c.href ? "pointer" : "default",
              transition: "border-color .2s, transform .2s",
              opacity: contactV ? 1 : 0, transform: contactV ? "none" : "translateY(22px)",
              transitionProperty: "opacity, transform, border-color",
              transitionDuration: ".5s", transitionDelay: `${i * .1}s`,
            }}>
              <div style={{ fontSize: 26 }}>{c.icon}</div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: 1.5, color: "#475569", textTransform: "uppercase", marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 500 }}>{c.val}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "32px 5%", borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: 13, color: "#334155" }}>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, background: "linear-gradient(135deg,#60a5fa,#a78bfa,#34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Siva Devireddy</div>
        <div>© 2026 · Built with React.js · Always open to new opportunities</div>
      </footer>
    </div>
  );
}