// import React from 'react'
// import { Link } from 'react-router-dom'
// import Lottie from 'lottie-react';
// import { Header } from '../components/Header';
// import { MdTableView } from "react-icons/md";

// export const Home = () => {
//   return (
//     <div className='overflow-x-hidden w-full'>
//       <Header className='' />

//       {/* Hero Section */}
//       <div className='w-full min-h-screen flex items-center justify-center px-4 mt-4'>
//         <div className='max-w-4xl text-center space-y-4'>
//           <h1 className='text-2xl sm:text-5xl text-white gradient-text mb-4'>
//             Revolutionize Attendance Tracking
//           </h1>
//           <p className='text-md sm:text-xl'>"Effortless Attendance Tracking"</p>
//           <div className='flex justify-center'>
//             <Link to="/login">
//               <button className='bg-yellow-400 px-6 py-3 text-black rounded-md'>
//                 Get started
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <section id='features' className="px-4 py-10 border border-gray-300 shadow bg-white">
//         <h1 className='text-center text-4xl font-mullish'>Key Features</h1>
//         <div className='flex flex-col sm:flex-row flex-wrap justify-center items-center gap-10 mt-10'>

//           {/* Card Template */}
//           {["Excel Integration", "TimeTable Management", "Interactive Attendance"].map((title, i) => (
//             <div key={i} className="relative w-full sm:w-[365px] h-[300px] bg-yellow-400 flex items-center justify-center">
//               <div className="relative w-[90%] sm:w-[350px] h-[280px] bg-white border border-gray-300 hover:rotate-6 hover:scale-105 transition-all duration-300 shadow-lg p-4">
//                 <div className="flex space-x-5 items-center">
//                   {i === 1 && <MdTableView className='w-[60px] h-[80px] text-blue-500' />}
//                   <Lottie style={{ width: "80px", height: "100px" }} />
//                   <p className="text-2xl font-mullish text-black">{title}</p>
//                 </div>
//                 <p className="mt-4 text-[#6E727F] font-mullish text-sm">
//                   {i === 0 && "Automatically update and access a single, comprehensive Excel sheet."}
//                   {i === 1 && "Seamlessly integrate with existing timetables or create new ones. Effortlessly manage schedules."}
//                   {i === 2 && "Mark attendance with just a click, using our intuitive interface."}
//                 </p>
//               </div>
//             </div>
//           ))}

//         </div>
//       </section>

//       {/* About Section */}
//       <section id='about' className='w-full px-4 py-10'>
//         <div className='flex flex-col lg:flex-row gap-6 items-center'>
//           <div className='w-full lg:w-1/2 h-[300px] border shadow-2xl border-gray-300 flex items-center justify-center'>
//             <p className='hidden sm:inline'>3D Model placeholder</p>
//           </div>
//           <div className='w-full lg:w-1/2 h-auto border shadow-2xl border-gray-300 p-6'>
//             <h2 className='text-xl sm:text-3xl font-mullish'>About AttendMaster</h2>
//             <p className='text-[#6E727F] mt-4 font-mullish'>
//               AttendMaster is designed to revolutionize attendance management in educational institutions. Our digital solution replaces traditional paper-based methods, offering a seamless, efficient and accurate way to track student attendance.
//             </p>
//             <p className='text-[#6E727F] mt-4 font-mullish'>
//               With features like interactive marking, automated Excel updates, and timetable integration, AttendMaster simplifies the entire attendance process for teachers and administrators alike.
//             </p>
//           </div>
//         </div>
//       </section> 
      
            

//       {/* Contact Section */}
//       <section id='contact' className='w-full px-4 py-10 border border-gray-300 flex flex-col items-center'>
//         <h1 className='text-center text-4xl font-bold font-mullish'>Get in Touch</h1>
//         <p className='mt-4 text-center'>Ready to transform your attendance management? Contact us today!</p>
//         <div className='mt-6'>
//           <button className='bg-yellow-400 px-6 py-3 text-black rounded-md'>
//             Contact us
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className='w-full h-[50px] border border-gray-300 flex items-center justify-center'>
//         <p className='font-mullish text-center'>&copy; 2025 AttendMaster</p>
//       </footer>
//     </div>
//   )
// } 


import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header';
/* ─────────────────────────────────────────────
   PARTICLE CANVAS BACKGROUND
───────────────────────────────────────────── */
const ParticleCanvas = () => {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    const particles = Array.from({ length: 110 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.6 + 0.1,
    }))
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139,92,246,${p.opacity})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > w) p.dx *= -1
        if (p.y < 0 || p.y > h) p.dy *= -1
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-0" />
}

/* ─────────────────────────────────────────────
   MAGNETIC BUTTON
───────────────────────────────────────────── */
const MagButton = ({ children, className = '', primary = false, ...props }) => {
  const ref = useRef(null)
  const handleMove = e => {
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px) scale(1.06)`
  }
  const reset = () => { ref.current.style.transform = 'translate(0,0) scale(1)' }
  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`relative overflow-hidden transition-all duration-300 font-semibold tracking-wide ${
        primary
          ? 'px-9 py-4 bg-violet-600 text-white rounded-2xl shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:shadow-[0_0_70px_rgba(139,92,246,0.8)]'
          : 'px-9 py-4 border border-white/20 text-white rounded-2xl backdrop-blur-md bg-white/5 hover:bg-white/10'
      } ${className}`}
      style={{ transition: 'transform 0.18s ease, box-shadow 0.3s ease, background 0.3s ease' }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {primary && (
        <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      )}
    </button>
  )
}

/* ─────────────────────────────────────────────
   COUNTER ANIMATION
───────────────────────────────────────────── */
const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0
        const end = parseInt(target)
        const step = Math.ceil(end / 60)
        const timer = setInterval(() => {
          start += step
          if (start >= end) { setCount(end); clearInterval(timer) }
          else setCount(start)
        }, 24)
      }
    }, { threshold: 0.5 })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

/* ─────────────────────────────────────────────
   FEATURE CARD
───────────────────────────────────────────── */
const FeatureCard = ({ icon, title, desc, items, color, delay }) => (
  <div
    className="group relative p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl overflow-hidden"
    style={{ animation: `fadeUp 0.7s ease both`, animationDelay: delay }}
  >
    {/* Hover glow */}
    <div className={`absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl ${color}`} />
    <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-white/20 transition-all duration-500" />

    {/* Top gradient line */}
    <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${color} opacity-60`} />

    <div className="relative z-10">
      <div className={`text-5xl mb-6 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110 inline-block`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 tracking-tight">{title}</h3>
      <p className="text-gray-400 text-sm mb-6 leading-relaxed">{desc}</p>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${color} flex-shrink-0`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
)

/* ─────────────────────────────────────────────
   HEADER
───────────────────────────────────────────── */
// const Header = () => {
//   const [scrolled, setScrolled] = useState(false)
//   useEffect(() => {
//     const h = () => setScrolled(window.scrollY > 30)
//     window.addEventListener('scroll', h)
//     return () => window.removeEventListener('scroll', h)
//   }, [])
//   return (
//     <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#070b14]/80 backdrop-blur-xl border-b border-white/10 py-3' : 'py-5'}`}>
//       <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
//         <div className="flex items-center gap-2.5">
//           <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-sm font-black shadow-[0_0_20px_rgba(139,92,246,0.6)]">A</div>
//           <span className="font-bold text-lg tracking-tight">Attend<span className="text-violet-400">Master</span></span>
//         </div>
//         <nav className="hidden md:flex gap-8 text-sm text-gray-400">
//           {['Features', 'Why Us', 'Stats', 'Testimonials'].map(n => (
//             <a key={n} href={`#${n.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors duration-200 hover:underline underline-offset-4 decoration-violet-500">{n}</a>
//           ))}
//         </nav>
//         <Link to="/login">
//           <MagButton primary className="text-sm px-6 py-3">Get Started →</MagButton>
//         </Link>
//       </div>
//     </header>
//   )
// }

/* ─────────────────────────────────────────────
   MAIN HOME
───────────────────────────────────────────── */
export const Home = () => {
  return (
    <div className="relative bg-[#070b14] text-white overflow-x-hidden font-['DM_Sans',sans-serif]">

      {/* Google Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Syne:wght@700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-28px) scale(1.06); }
        }
        @keyframes spinSlow {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          from { background-position: -200% center; }
          to   { background-position:  200% center; }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
        }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, #a78bfa 40%, #e879f9 60%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .gradient-border {
          background: linear-gradient(#070b14, #070b14) padding-box,
                      linear-gradient(135deg, #7c3aed, #a855f7, #ec4899) border-box;
          border: 1px solid transparent;
        }
        .orb { animation: floatOrb 7s ease-in-out infinite; }
        .orb-2 { animation: floatOrb 9s ease-in-out infinite reverse; }
        .spin-slow { animation: spinSlow 20s linear infinite; }
        .ticker-wrap { overflow: hidden; white-space: nowrap; }
        .ticker { display: inline-flex; animation: ticker 22s linear infinite; }
      `}</style>

      <ParticleCanvas />
      <Header />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24">

        {/* Background orbs */}
        <div className="orb absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-600/20 blur-[120px] pointer-events-none" />
        <div className="orb-2 absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-fuchsia-600/15 blur-[100px] pointer-events-none" />

        {/* Badge */}
        <div className="gradient-border rounded-full px-5 py-2 text-xs font-semibold text-violet-300 tracking-widest uppercase mb-8" style={{ animation: 'fadeUp 0.6s ease both' }}>
          ✦ &nbsp; Next-Gen Attendance Platform &nbsp; ✦
        </div>

        {/* Headline */}
        <h1 className="hero-title text-5xl sm:text-7xl lg:text-8xl leading-[1.05] max-w-5xl" style={{ animation: 'fadeUp 0.7s ease 0.1s both' }}>
          Attendance
          <br />
          <span className="shimmer-text">Reimagined.</span>
        </h1>

        <p className="mt-8 text-gray-400 text-lg sm:text-xl max-w-2xl leading-relaxed" style={{ animation: 'fadeUp 0.7s ease 0.2s both' }}>
          The most powerful attendance management system ever built for modern educational institutions.
          Automate workflows, surface insights, and reclaim hours every single week.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center" style={{ animation: 'fadeUp 0.7s ease 0.3s both' }}>
          <Link to="/login">
            <MagButton primary>Start for Free →</MagButton>
          </Link>
          <MagButton>Watch Demo ▶</MagButton>
        </div>

        {/* Trust bar */}
        <p className="mt-12 text-gray-600 text-xs tracking-widest uppercase" style={{ animation: 'fadeUp 0.7s ease 0.4s both' }}>
          Trusted by 500+ educators across 50+ institutions
        </p>
        <div className="mt-4 flex gap-6 items-center opacity-30" style={{ animation: 'fadeUp 0.7s ease 0.45s both' }}>
          {['IIT', 'DPS', 'MIT', 'CBSE', 'IGNOU'].map(l => (
            <span key={l} className="text-sm font-bold tracking-widest text-white">{l}</span>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40" style={{ animation: 'fadeUp 0.8s ease 0.6s both' }}>
          <span className="text-xs tracking-widest text-gray-500 uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-violet-500 to-transparent" />
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="py-5 border-y border-white/10 bg-white/[0.02] ticker-wrap">
        <div className="ticker">
          {[...Array(2)].map((_, j) => (
            <span key={j} className="inline-flex gap-12 mx-6 text-xs tracking-[0.3em] text-gray-600 uppercase font-semibold">
              {['One-Click Attendance', 'Real-Time Analytics', 'Smart Timetables', 'Export Reports', 'Multi-Device Support', 'Instant Notifications', 'Role-Based Access', 'Zero Errors'].map(t => (
                <span key={t}>✦ &nbsp; {t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" className="relative px-6 py-28 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-violet-400 text-xs tracking-[0.3em] uppercase font-semibold mb-4" style={{ animation: 'fadeUp 0.6s ease both' }}>What We Offer</p>
          <h2 className="hero-title text-5xl sm:text-6xl" style={{ animation: 'fadeUp 0.6s ease 0.1s both' }}>
            Built for Scale.<br /><span className="shimmer-text">Designed for Humans.</span>
          </h2>
          <p className="text-gray-500 mt-6 max-w-xl mx-auto" style={{ animation: 'fadeUp 0.6s ease 0.2s both' }}>
            Every feature has been meticulously engineered to eliminate friction and maximize clarity for educators and administrators alike.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon="✅"
            title="One-Click Attendance"
            desc="Mark entire class attendance in seconds. No more paper registers or manual errors slowing down your day."
            items={['Mark attendance instantly for full classes', 'Bulk select with smart filters', 'Real-time sync across all devices', 'Automated absent notifications via email/SMS', 'Daily, weekly, monthly rollups']}
            color="from-violet-600 to-purple-600"
            delay="0.1s"
          />
          <FeatureCard
            icon="🗓️"
            title="Timetable Management"
            desc="Build conflict-free timetables in minutes. Drag, drop, and publish — your schedule runs itself."
            items={['Drag-and-drop schedule builder', 'Auto conflict detection & resolution', 'Supports multiple batches & classrooms', 'Teacher substitution management', 'Exportable as PDF or spreadsheet']}
            color="from-cyan-500 to-blue-600"
            delay="0.2s"
          />
          <FeatureCard
            icon="📊"
            title="Analytics Dashboard"
            desc="Turn raw attendance data into actionable insights. Spot trends before they become problems."
            items={['Interactive visual dashboards', 'Per-student attendance heatmaps', 'Subject-wise performance trends', 'Automated low-attendance alerts', 'CSV / Excel data export']}
            color="from-amber-500 to-orange-600"
            delay="0.3s"
          />
        </div>

        {/* Extra 2-col feature strip */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <FeatureCard
            icon="🔔"
            title="Smart Notifications"
            desc="Proactively alert parents, students, and staff so nothing falls through the cracks."
            items={['Instant absent alerts to parents', 'Custom threshold notifications', 'SMS, email & in-app channels', 'Schedule digest reports']}
            color="from-rose-500 to-pink-600"
            delay="0.4s"
          />
          <FeatureCard
            icon="🔐"
            title="Role-Based Access Control"
            desc="Each user sees exactly what they need — nothing more, nothing less."
            items={['Admin / Teacher / Student roles', 'Fine-grained permission system', 'Audit logs for all actions', 'SSO & OAuth2 ready']}
            color="from-emerald-500 to-teal-600"
            delay="0.5s"
          />
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="why-us" className="relative px-6 py-28 bg-gradient-to-b from-[#0b0f1c] to-[#070b14] overflow-hidden">
        {/* Decorative ring */}
        <div className="spin-slow absolute -right-40 top-1/2 w-[600px] h-[600px] rounded-full border border-violet-500/10 pointer-events-none" />
        <div className="spin-slow absolute -left-40 bottom-0 w-[400px] h-[400px] rounded-full border border-fuchsia-500/10 pointer-events-none" style={{ animationDirection: 'reverse' }} />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-violet-400 text-xs tracking-[0.3em] uppercase font-semibold mb-4">Why AttendMaster</p>
            <h2 className="hero-title text-5xl sm:text-6xl">The Smarter Choice<br /><span className="shimmer-text">for Modern Education.</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: '⚡', title: 'Save 5+ Hours Weekly', desc: 'Automating repetitive attendance workflows frees up your most valuable resource — time. Teachers report saving over 5 hours every week.', color: 'text-yellow-400' },
              { emoji: '🎯', title: '99.8% Accuracy Rate', desc: 'AI-assisted validation eliminates manual data entry errors. Every record is verified, timestamped, and audit-ready from day one.', color: 'text-green-400' },
              { emoji: '📱', title: 'Works Everywhere', desc: 'A single codebase powers web, Android, and iOS. From a laptop in a staffroom to a phone in a classroom — it just works.', color: 'text-cyan-400' },
              { emoji: '🔒', title: 'Enterprise-Grade Security', desc: 'End-to-end encryption, GDPR-compliant data handling, and daily automated backups. Your data is always safe.', color: 'text-rose-400' },
              { emoji: '🚀', title: 'Set Up in Minutes', desc: 'No lengthy onboarding, no IT team required. Import students via CSV, set up your first class, and go live in under 10 minutes.', color: 'text-violet-400' },
              { emoji: '📞', title: '24/7 Expert Support', desc: 'Real humans, real fast. Our support team has an average first-response time under 3 minutes for all paid plans.', color: 'text-fuchsia-400' },
            ].map((c, i) => (
              <div key={i} className="gradient-border rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300 group" style={{ animation: `fadeUp 0.6s ease ${i * 0.08}s both` }}>
                <div className={`text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block`}>{c.emoji}</div>
                <h3 className={`font-bold text-xl mb-3 ${c.color}`}>{c.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section id="stats" className="px-6 py-28">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-violet-400 text-xs tracking-[0.3em] uppercase font-semibold mb-4">By The Numbers</p>
            <h2 className="hero-title text-5xl sm:text-6xl">Our <span className="shimmer-text">Impact</span></h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { value: '10000', suffix: '+', label: 'Students Managed', color: 'from-violet-500 to-purple-500' },
              { value: '500',   suffix: '+', label: 'Active Teachers',  color: 'from-cyan-500 to-blue-500' },
              { value: '50',    suffix: '+', label: 'Institutions',     color: 'from-amber-500 to-orange-500' },
              { value: '99',    suffix: '%', label: 'Accuracy Rate',    color: 'from-emerald-500 to-teal-500' },
            ].map((s, i) => (
              <div key={i} className="gradient-border rounded-2xl p-8 text-center group hover:-translate-y-1 transition-all duration-300">
                <div className={`hero-title text-5xl bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-2`}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <p className="text-gray-500 text-sm tracking-wide mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="px-6 py-28 bg-gradient-to-b from-[#0b0f1c] to-[#070b14]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-violet-400 text-xs tracking-[0.3em] uppercase font-semibold mb-4">Testimonials</p>
            <h2 className="hero-title text-5xl sm:text-6xl">Loved by <span className="shimmer-text">Educators.</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "AttendMaster completely transformed how we manage our 1,200-student campus. What used to take my staff 3 hours now takes 15 minutes. The analytics alone are worth every rupee.", name: "Dr. Priya Sharma", role: "Principal, Delhi Public School", avatar: "PS" },
              { quote: "I've tried 4 different tools in 6 years. Nothing comes close. The timetable builder is insane — I built our entire semester schedule in under 30 minutes.", name: "Rahul Verma", role: "HOD Mathematics, IIT Coaching", avatar: "RV" },
              { quote: "Parents love the instant notifications. The number of 'is my child present?' calls we get has dropped by 90%. That alone sold our management board.", name: "Sneha Kulkarni", role: "Administrator, City College", avatar: "SK" },
              { quote: "We onboarded 400 teachers in a single day. The role-based access system meant everyone saw exactly what they needed — zero confusion, zero chaos.", name: "Amit Joshi", role: "IT Director, State University", avatar: "AJ" },
              { quote: "The data export features are seriously impressive. I can now generate NAAC compliance reports in seconds instead of days. It's a total game-changer.", name: "Prof. Meera Nair", role: "Dean Academics, Engineering College", avatar: "MN" },
              { quote: "Switched from spreadsheets six months ago and I'm never going back. The mobile app is smooth, the dashboard is beautiful, and the support team is phenomenal.", name: "Kiran Desai", role: "Class Teacher, CBSE School", avatar: "KD" },
            ].map((t, i) => (
              <div key={i} className="gradient-border rounded-2xl p-7 flex flex-col gap-5 hover:-translate-y-1 transition-all duration-300 group" style={{ animation: `fadeUp 0.6s ease ${i * 0.08}s both` }}>
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, s) => <span key={s} className="text-amber-400 text-sm">★</span>)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-xs font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 via-fuchsia-900/20 to-violet-900/20 pointer-events-none" />
        <div className="orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[150px] pointer-events-none" />

        {/* Pulse rings */}
        {[1, 2, 3].map(i => (
          <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-violet-500/30 pointer-events-none"
            style={{ animation: `pulse-ring 3s ease-out ${i * 0.8}s infinite` }} />
        ))}

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-violet-400 text-xs tracking-[0.3em] uppercase font-semibold mb-6">Get Started Today</p>
          <h2 className="hero-title text-5xl sm:text-7xl mb-6">
            Ready to<br /><span className="shimmer-text">Transform</span><br />Your Campus?
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Join 500+ educators who have already upgraded their attendance system.
            Free setup. No credit card. Live in 10 minutes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/login">
              <MagButton primary className="text-base">Start Free Today →</MagButton>
            </Link>
            <MagButton className="text-base">Book a Demo</MagButton>
          </div>
          <p className="mt-8 text-gray-600 text-xs">No credit card required &nbsp;•&nbsp; Free 14-day trial &nbsp;•&nbsp; Cancel anytime</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-black">A</div>
            <span className="font-bold tracking-tight">Attend<span className="text-violet-400">Master</span></span>
          </div>
          <p className="text-gray-600 text-xs">© 2025 AttendMaster. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-gray-600">
            {['Privacy', 'Terms', 'Contact', 'Blog'].map(l => (
              <a key={l} href="#" className="hover:text-gray-300 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}