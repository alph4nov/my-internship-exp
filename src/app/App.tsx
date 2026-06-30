import { useState, useEffect, useRef } from "react";
import {
  Truck,
  Package,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Users,
  Building2,
  Award,
  ChevronRight,
  TrendingUp,
  Zap,
  ClipboardList,
} from "lucide-react";
import myImage from '/img/product_team.jpg';


const NAV_LINKS = [
  { id: "hero", label: "Home" },
  //{ id: "manifest", label: "Contents" },
  { id: "company", label: "Company" },
  { id: "department", label: "Department" },
  { id: "tasks", label: "Tasks" },
  { id: "memories", label: "Memories" },
  { id: "conclusion", label: "Conclusion" },
  //{ id: "thankyou", label: "Delivered" },
];

const TASK_DATA = [
  {
    num: "TASK-01",
    title: "Parcel Sorting & Manifest Verification",
    status: "COMPLETED",
    statusCls: "bg-emerald-100 text-emerald-700",
    desc: "Assisted the sorting team in verifying inbound manifests against physical parcel counts. Identified and logged discrepancies in the warehouse management system (WMS), reducing mismatch errors by 12% over six weeks. Developed a daily reconciliation checklist that was later adopted by the full team.",
    details: ["6 weeks duration", "12% error reduction", "WMS system", "Checklist adopted"],
    img: "https://images.unsplash.com/photo-1530213786676-41ad9f7736f6?w=700&h=460&fit=crop&auto=format",
    imgAlt: "Workers sorting parcels on a conveyor belt system in a large distribution centre",
    reverse: false,
  },
  {
    num: "TASK-02",
    title: "RouteVision Dashboard Reporting",
    status: "COMPLETED",
    statusCls: "bg-emerald-100 text-emerald-700",
    desc: "Compiled and presented weekly SLA performance reports for 12 delivery zones using the RouteVision analytics dashboard. Identified Zone 7 (Cheras) as a consistent underperformer and proposed route adjustments that improved on-time delivery from 84% to 91% within three weeks.",
    details: ["12 zones monitored", "Zone 7 turnaround", "84% → 91% OTD", "Weekly reporting"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=460&fit=crop&auto=format",
    imgAlt: "Analytics dashboard showing delivery performance metrics and route optimisation data",
    reverse: true,
  },
  {
    num: "TASK-03",
    title: "Customer Service Escalation Support",
    status: "COMPLETED",
    statusCls: "bg-emerald-100 text-emerald-700",
    desc: "Handled Tier-1 escalation cases involving lost, delayed, or damaged parcels. Processed 140+ cases over five weeks, coordinating between field riders, the warehouse team, and the customer experience team. Maintained an average resolution time of 2.4 business days against a 3-day SLA target.",
    details: ["140+ cases handled", "2.4 day avg resolution", "3-day SLA target", "Cross-team coordination"],
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=700&h=460&fit=crop&auto=format",
    imgAlt: "Customer service representative handling escalation tickets at a computer workstation",
    reverse: false,
  },
  {
    num: "TASK-04",
    title: "Rider Onboarding & SOP Documentation",
    status: "COMPLETED",
    statusCls: "bg-emerald-100 text-emerald-700",
    desc: "Currently revising the Last-Mile Rider Standard Operating Procedure manual in collaboration with the HR & Training Coordinator. The updated guide incorporates QR-based parcel scanning workflows and new proof-of-delivery protocols. Target completion: end of internship.",
    details: ["SOP manual revision", "QR scan workflows", "POD protocols", "Target: Aug 2026"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=460&fit=crop&auto=format",
    imgAlt: "Logistics documentation and workflow planning on a laptop in a warehouse office",
    reverse: true,
  },
];

const GALLERY_ITEMS = [
  { img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=520&h=420&fit=crop&auto=format", alt: "Team orientation day at SwiftRoute HQ with all new interns", caption: "Orientation Day", date: "Jun 3, 2026", h: 300 },
  { img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=520&fit=crop&auto=format", alt: "Handshake during team introduction at the operations hub", caption: "Team Introduction", date: "Jun 4, 2026", h: 240 },
  { img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=520&h=360&fit=crop&auto=format", alt: "Team lunch celebration after the Zone 7 performance milestone", caption: "Zone 7 Milestone Lunch", date: "Jul 12, 2026", h: 260 },
  { img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=420&h=520&fit=crop&auto=format", alt: "Night shift at the sorting hub during peak season", caption: "Night Shift at the Hub", date: "Jul 25, 2026", h: 310 },
  { img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=520&h=400&fit=crop&auto=format", alt: "Department presentation on SLA improvements to operations manager", caption: "Department Presentation", date: "Aug 1, 2026", h: 240 },
  { img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=520&h=520&fit=crop&auto=format", alt: "Team photo at end-of-month celebration event", caption: "End-of-Month Celebration", date: "Jul 31, 2026", h: 300 },
  { img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=520&h=400&fit=crop&auto=format", alt: "Study group session with fellow interns sharing notes", caption: "Intern Study Group", date: "Jun 18, 2026", h: 250 },
  { img: "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=420&h=380&fit=crop&auto=format", alt: "Rider briefing session on new QR scanning procedures", caption: "Rider Briefing Session", date: "Aug 8, 2026", h: 260 },
];

export default function App() {
  const [scrollPct, setScrollPct] = useState(0);
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const galleryRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollPct(pct);
      setPastHero(window.scrollY > 60);

      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const onGalleryMouseDown = (e: React.MouseEvent) => {
    if (!galleryRef.current) return;
    dragging.current = true;
    dragStartX.current = e.pageX - galleryRef.current.offsetLeft;
    dragScrollLeft.current = galleryRef.current.scrollLeft;
    galleryRef.current.style.cursor = "grabbing";
  };
  const onGalleryMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current || !galleryRef.current) return;
    e.preventDefault();
    const x = e.pageX - galleryRef.current.offsetLeft;
    galleryRef.current.scrollLeft = dragScrollLeft.current - (x - dragStartX.current) * 1.5;
  };
  const stopDrag = () => {
    dragging.current = false;
    if (galleryRef.current) galleryRef.current.style.cursor = "grab";
  };

  const vanLeft = `calc(${scrollPct}% - 14px)`;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* ── STICKY HEADER ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ background: pastHero ? "#0d1b3e" : "rgba(13,27,62,0.85)", backdropFilter: "blur(8px)" }}
      >
        <div className="flex items-center justify-between px-6 py-3">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 group"
          >
            <Truck className="w-5 h-5 text-orange-500 group-hover:text-orange-400 transition-colors" />
            <span className="text-white font-montserrat font-bold text-xs tracking-[0.2em] uppercase hidden sm:block">
              CST688-SPX Express
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase rounded transition-all ${
                  activeSection === link.id
                    ? "text-orange-400 bg-orange-500/10"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Progress track */}
        <div className="relative h-[3px] bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 transition-none"
            style={{ width: `${scrollPct}%` }}
          />
          {/* Van icon */}
          <div
            className="absolute top-1/2 -translate-y-1/2 transition-none"
            style={{ left: vanLeft }}
          >
            <div className="bg-orange-500 rounded-full p-[3px] shadow-lg shadow-orange-500/60 flex items-center justify-center">
              <Truck className="w-[18px] h-[18px] text-white" />
            </div>
          </div>
        </div>
      </header>


      {/* ── 1. HERO ── */}
      <section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16"
        style={{ background: "#0d1b3e" }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-16">
          {/* Tracking badge */}
          <div className="inline-flex items-center gap-3 border border-orange-500/30 bg-orange-500/8 rounded px-5 py-2.5 mb-10">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shrink-0" />
            <span className="font-mono text-orange-400 text-xs tracking-[0.2em] uppercase">
              STATUS: COMPLETED — INTERNSHIP 2026
            </span>
            <Package className="w-4 h-4 text-orange-400 shrink-0" />
          </div>

          <h1 className="font-montserrat font-black leading-none mb-3" style={{ fontSize: "clamp(3rem, 9vw, 6rem)" }}>
            <span className="text-white block">CST688</span>
            <span className="text-white block">INTERNSHIP</span>
            <span style={{ fontSize: "clamp(1rem, 3vw, 2rem)", color: "#ff6b00"}} className="block">Product Intern @SPX Express</span>
          </h1>

          <p className="font-mono text-white/30 text-xs tracking-[0.25em] uppercase mt-4 mb-10">
            PARCEL NO. INT-2026-0071 &nbsp;·&nbsp; TRACKING ACTIVE
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm">
            {[
              { icon: Users, text: "Izzat Mahfuz Idris" },
              { icon: Building2, text: "SPX Express | MidValley, KL" },
              { icon: MapPin, text: "30 Mar – 3 July 2026" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/70">
                <Icon className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="font-inter">{text}</span>
              </div>
            ))}
          </div>

          <div className="mt-14 flex items-center justify-center gap-2 text-white/25 text-xs font-mono uppercase tracking-widest">
            <span>Scroll to track your shipment</span>
            <ChevronRight className="w-4 h-4 animate-bounce" style={{ transform: "rotate(90deg)" }} />
          </div>
        </div>
      </section>


      {/* ── 2. MANIFEST (ToC) ── */}
      <section id="manifest" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <p className="font-mono text-orange-500 text-[10px] tracking-[0.25em] uppercase mb-2">
            CONTENTS
          </p>
          <h2 className="font-montserrat font-black text-[#0d1b3e] mb-14" style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)" }}>
            LIST OF<br />CONTENTS
          </h2>

          <div className="relative">
            {[
              { num: "01", label: "Company Background", desc: "History, mission, and overview of SwiftRoute Logistics", id: "company", stop: "ORIGIN" },
              { num: "02", label: "Department Background", desc: "Operations & Last-Mile Delivery team structure", id: "department", stop: "SORTED" },
              { num: "03", label: "Tasks & Projects", desc: "Work completed, contributions, and project outcomes", id: "tasks", stop: "IN TRANSIT" },
              { num: "04", label: "Activities & Memories", desc: "Team events, photos, and memorable moments", id: "memories", stop: "OUT FOR DELIVERY" },
              { num: "05", label: "Conclusion", desc: "Key takeaways, challenges, and operational insights", id: "conclusion", stop: "ARRIVED" },
              //{ num: "06", label: "Thank You", desc: "Gratitude and closing remarks", id: "thankyou", stop: "DELIVERED ✓" },
            ].map((item, i, arr) => (
              <div key={item.id} className="flex gap-0">
                {/* Timeline column */}
                <div className="flex flex-col items-center mr-6 shrink-0" style={{ width: 20 }}>
                  <div className="w-5 h-5 rounded-full bg-white border-2 border-orange-500 z-10 mt-4 shrink-0 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex-1 w-0.5 bg-gradient-to-b from-orange-400 to-orange-100 mt-1" />
                  )}
                </div>

                {/* Row button */}
                <button
                  onClick={() => scrollTo(item.id)}
                  className="flex-1 flex items-center gap-5 px-5 py-4 mb-1 group hover:bg-orange-50 rounded-xl transition-colors text-left"
                >
                  <span className="font-mono text-orange-300 text-xs w-6 shrink-0">{item.num}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-montserrat font-black text-[#0d1b3e] text-lg leading-tight group-hover:text-orange-600 transition-colors">
                      {item.label}
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5 truncate">{item.desc}</div>
                  </div>
                  <span className="font-mono text-[10px] text-gray-400 bg-gray-100 group-hover:bg-orange-100 group-hover:text-orange-600 px-2.5 py-1 rounded-full uppercase tracking-widest transition-colors hidden sm:block shrink-0">
                    {item.stop}
                  </span>
                  <ArrowRight className="w-4 h-4 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 3. COMPANY BACKGROUND ── */}
      <section id="company" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Text */}
            <div>
              <p className="font-mono text-orange-500 text-[10px] tracking-[0.25em] uppercase mb-2">SENDER INFORMATION</p>
              <h2 className="font-montserrat font-black text-[#0d1b3e] mb-5" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
                COMPANY<br />BACKGROUND
              </h2>
              <div className="w-12 h-1 bg-orange-500 mb-8" />

              <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
                <p>
                  <strong className="text-[#0d1b3e]">SPX Express</strong> a logistic and courier company, operates under 
                  Sea Limited, a Singapore-based global technology conglomerate, founded on 2018 as logistic arm for their
                  e-commerce platform, Shopee which founded on 2015.
                </p>
                <p>
                  With over 1000 employees and a network spanning to more than 180 distribution hubs, SPX
                  processes an average of 2.1 million parcels per day. Their proprietary real-time
                  tracking platform, <em>RouteVision</em>, serves enterprise clients and individual
                  consumers with full end-to-end visibility.
                </p>
                <p>
                  The company mission: <strong className="text-orange-600">"Fast & Reliable."</strong> — a
                  commitment to speed, extensive coverage and reliable solutions while being cost-effective to customers,
                  have place them to be one of the leading logistics partners in Southeast Asia, Brazil and Taiwan.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { val: "117k", label: "Avg Parcels / Week" },
                  { val: "180+", label: "Hubs" },
                  { val: "1000+", label: "Employees" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#0d1b3e] rounded-xl p-4 text-center">
                    <div className="font-montserrat font-black text-2xl text-orange-400">{s.val}</div>
                    <div className="font-mono text-white/40 text-[10px] uppercase tracking-widest mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <div className="group overflow-hidden rounded-xl bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=840&h=460&fit=crop&auto=format"
                  alt="SwiftRoute warehouse interior with automated sorting conveyor belts"
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="group overflow-hidden rounded-xl bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=420&h=420&fit=crop&auto=format"
                    alt="SwiftRoute delivery fleet lined up at the Petaling Jaya depot"
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="group overflow-hidden rounded-xl bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=420&h=420&fit=crop&auto=format"
                    alt="Staff processing packages at the parcel sorting facility"
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── 4. DEPARTMENT BACKGROUND ── */}
      <section id="department" className="py-24" style={{ background: "#f5f5f7" }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-mono text-orange-500 text-[10px] tracking-[0.25em] uppercase mb-2">CHECKPOINT DETAILS</p>
          <h2 className="font-montserrat font-black text-[#0d1b3e] mb-10" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            DEPARTMENT<br />BACKGROUND
          </h2>

          <div className="relative pb-8">
            <div className="overflow-hidden rounded-2xl bg-gray-200">
              <img
                src="./img/product_team.jpg"
                alt="MY SPX Superheroes"
                className="w-full object-cover"
                style={{ height: "clamp(280px, 40vw, 440px)" }}
              />
            </div>

            {/* Caption block overlapping bottom edge */}
            <div className="mx-0 md:mx-8 bg-[#0d1b3e] rounded-2xl md:rounded-t-none md:-mt-16 relative z-10 p-8 md:p-10">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <p className="font-mono text-orange-400 text-[10px] tracking-[0.2em] uppercase mb-3">
                    [MY] PRODUCT TEAM SUPERHEROES
                  </p>
                  <p className="text-white/75 leading-relaxed text-[15px]">
                    The Last-Mile Delivery (LMD) Department manages final-stretch logistics for the
                    entire Klang Valley region. The team of 48 coordinators, route planners, and field
                    officers handles 18,000–25,000 daily deliveries across 12 delivery zones, utilising
                    the RouteVision platform for dynamic route optimisation, SLA compliance tracking,
                    and rider performance analytics.
                  </p>
                </div>
                <div className="flex flex-col justify-center gap-4">
                  {[
                    { icon: Users, label: "Team Size", val: "11 Staff" },
                    { icon: MapPin, label: "Office", val: "Level 21, Southpoint Tower" },
                    { icon: Package, label: "Daily Volume", val: "~21,000" },
                  ].map(({ icon: Icon, label, val }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-orange-500/15 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-orange-400" />
                      </div>
                      <div>
                        <div className="font-mono text-white/35 text-[10px] uppercase tracking-widest">{label}</div>
                        <div className="font-montserrat font-bold text-white text-base">{val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── 5. TASKS & PROJECTS ── */}
      <section id="tasks" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-mono text-orange-500 text-[10px] tracking-[0.25em] uppercase mb-2">ACTIVE OPERATIONS LOG</p>
          <h2 className="font-montserrat font-black text-[#0d1b3e] mb-12" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            TASKS &<br />PROJECTS
          </h2>

          {/* Dashboard overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-20">
            {[
              { icon: ClipboardList, label: "Total Tasks", val: "7", sub: "Assigned projects", bg: "#0d1b3e", tc: "#ff6b00", sc: "rgba(255,255,255,0.4)" },
              { icon: CheckCircle2, label: "Completed", val: "7", sub: "On track", bg: "#ff6b00", tc: "#ffffff", sc: "rgba(255,255,255,0.6)" },
              { icon: Award, label: "Live", val: "4", sub: "Rollout to user", bg: "#facc15", tc: "#0d1b3e", sc: "rgba(13,27,62,0.5)" },
              //{ icon: Award, label: "Commendations", val: "2", sub: "From supervisors", bg: "#f5f5f7", tc: "#0d1b3e", sc: "#999" },
            ].map(({ icon: Icon, label, val, sub, bg, tc, sc }) => (
              <div key={label} className="rounded-2xl p-5" style={{ background: bg }}>
                <Icon className="w-5 h-5 mb-3" style={{ color: tc }} />
                <div className="font-montserrat font-black text-3xl" style={{ color: tc }}>{val}</div>
                <div className="font-bold text-sm mt-0.5" style={{ color: tc }}>{label}</div>
                <div className="text-xs mt-1" style={{ color: sc }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* 4 task blocks */}
          {TASK_DATA.map((task) => (
            <div
              key={task.num}
              className="grid md:grid-cols-2 gap-12 items-center mb-20"
            >
              <div className={task.reverse ? "md:order-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-gray-400 text-[10px] tracking-widest uppercase">{task.num}</span>
                  <span className={`font-mono text-[10px] px-3 py-1 rounded-full font-bold tracking-widest uppercase ${task.statusCls}`}>
                    {task.status}
                  </span>
                </div>
                <h3 className="font-montserrat font-black text-[#0d1b3e] mb-4 leading-tight" style={{ fontSize: "clamp(1.4rem,2.5vw,1.9rem)" }}>
                  {task.title}
                </h3>
                <div className="w-8 h-[3px] bg-orange-500 mb-5" />
                <p className="text-gray-600 leading-relaxed text-[15px] mb-6">{task.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {task.details.map((d) => (
                    <span key={d} className="font-mono text-[11px] bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div className={`group overflow-hidden rounded-2xl shadow-md bg-gray-200 ${task.reverse ? "md:order-1" : ""}`}>
                <img
                  src={task.img}
                  alt={task.imgAlt}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ── 6. ACTIVITIES & MEMORIES ── */}
      <section id="memories" className="py-24 overflow-hidden" style={{ background: "#f5f5f7" }}>
        <div className="max-w-6xl mx-auto px-6 mb-10">
          <p className="font-mono text-orange-500 text-[10px] tracking-[0.25em] uppercase mb-2">DELIVERY PHOTOS</p>
          <h2 className="font-montserrat font-black text-[#0d1b3e]" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            ACTIVITIES &<br />MEMORIES
          </h2>
          <p className="font-mono text-gray-400 text-[11px] tracking-widest uppercase mt-4">
            DRAG TO EXPLORE →
          </p>
        </div>

        <div
          ref={galleryRef}
          className="flex gap-5 overflow-x-scroll select-none"
          style={{
            scrollbarWidth: "none",
            cursor: "grab",
            paddingLeft: "max(24px, calc((100vw - 1152px) / 2))",
            paddingRight: "max(24px, calc((100vw - 1152px) / 2))",
            paddingBottom: "16px",
          }}
          onMouseDown={onGalleryMouseDown}
          onMouseMove={onGalleryMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          {GALLERY_ITEMS.map((item, i) => (
            <div key={i} className="shrink-0 group" style={{ width: 260 }}>
              <div
                className="overflow-hidden rounded-2xl bg-gray-300"
                style={{ height: item.h }}
              >
                <img
                  src={item.img}
                  alt={item.alt}
                  draggable={false}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                />
              </div>
              <div className="mt-3 px-1">
                <div className="font-montserrat font-bold text-[#0d1b3e] text-sm">{item.caption}</div>
                <div className="font-mono text-[11px] text-gray-400 mt-0.5">{item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ── 7. CONCLUSION ── */}
      <section id="conclusion" className="py-24" style={{ background: "#0d1b3e" }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="font-mono text-orange-400 text-[10px] tracking-[0.25em] uppercase mb-2">DELIVERY NOTES</p>
          <h2 className="font-montserrat font-black text-white mb-12" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            CONCLUSION &<br />DISCUSSION
          </h2>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              {
                icon: Award,
                title: "Key Takeaways",
                color: "#ff6b00",
                points: [
                  "Real logistics is data-driven at every level — from route plans to SLA dashboards",
                  "Cross-functional communication is the backbone of last-mile delivery success",
                  "Small process improvements compound quickly at scale",
                ],
              },
              {
                icon: Zap,
                title: "Challenges Faced",
                color: "#facc15",
                points: [
                  "Adapting to peak-day pace and volume during June double-date sales events",
                  "Navigating WMS limitations with manual fallback procedures",
                  "Building trust and rapport with field riders as an intern",
                ],
              },
              {
                icon: TrendingUp,
                title: "Operational Insights",
                color: "#34d399",
                points: [
                  "Zone-level variance is often solved through better route sequencing, not more riders",
                  "First-attempt delivery rate drives the most cost savings across the network",
                  "Technology adoption at field level requires deliberate change management",
                ],
              },
            ].map(({ icon: Icon, title, color, points }) => (
              <div key={title} className="rounded-2xl p-6 border border-white/10 bg-white/4">
                <Icon className="w-5 h-5 mb-4" style={{ color }} />
                <h3 className="font-montserrat font-black text-base mb-4" style={{ color }}>{title}</h3>
                <ul className="space-y-3">
                  {points.map((p, i) => (
                    <li key={i} className="flex gap-3 text-white/65 text-sm leading-relaxed">
                      <span className="text-white/20 shrink-0 mt-0.5">—</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Closing quote */}
          <div className="rounded-2xl p-8 md:p-10 border border-orange-500/20 bg-orange-500/6">
            <p className="text-white/80 text-lg leading-relaxed italic">
              "This internship confirmed that logistics is not just about moving boxes — it is about
              orchestrating information, people, and technology in a high-stakes, real-time environment.
              The three months at SwiftRoute have given me a foundation that no classroom can fully
              replicate: the ability to think operationally, act under pressure, and measure what matters."
            </p>
            <div className="mt-5 font-mono text-orange-400 text-sm">
              — Ahmad Farhan bin Zulkifli, August 2026
            </div>
          </div>
        </div>
      </section>


      {/* ── 8. THANK YOU ── */}
      <section
        id="thankyou"
        className="py-32 relative overflow-hidden"
        style={{ background: "#080f22", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,107,0,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          {/* Delivered parcel icon */}
          <div
            className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-8 relative"
            style={{ background: "rgba(255,107,0,0.08)", border: "1px solid rgba(255,107,0,0.2)" }}
          >
            <Package className="w-10 h-10 text-orange-400" />
            <div
              className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          </div>

          <p className="font-mono text-orange-400 text-[10px] tracking-[0.3em] uppercase mb-5">
            PARCEL STATUS: DELIVERED ✓
          </p>

          <h2 className="font-montserrat font-black text-white leading-none mb-6" style={{ fontSize: "clamp(3.5rem,10vw,7rem)" }}>
            THANK<br /><span style={{ color: "#ff6b00" }}>YOU</span>
          </h2>

          <p className="text-white/55 text-base leading-relaxed mb-12 max-w-lg mx-auto">
            To the entire SwiftRoute Logistics team, my supervisors, and my fellow interns —
            thank you for every lesson, challenge, and moment of guidance throughout this journey.
            This experience was delivered right on time.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { sup: "Presented by", main: "Ahmad Farhan bin Zulkifli", sub: "INT-2026-0071" },
              { sup: "Host Company", main: "SwiftRoute Logistics Sdn. Bhd.", sub: "Petaling Jaya Hub" },
              { sup: "Duration", main: "June – August 2026", sub: "12 Weeks · 480 Hours" },
            ].map(({ sup, main, sub }) => (
              <div
                key={sup}
                className="rounded-xl p-5 text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="font-mono text-white/30 text-[10px] uppercase tracking-widest mb-2">{sup}</div>
                <div className="font-montserrat font-bold text-white text-sm leading-snug">{main}</div>
                <div className="font-mono text-orange-400 text-[10px] mt-1.5">{sub}</div>
              </div>
            ))}
          </div>

          <p className="font-mono text-white/15 text-[10px] tracking-[0.3em] uppercase mt-16">
            END OF TRANSMISSION — SHIPMENT COMPLETE
          </p>
        </div>
      </section>

    </div>
  );
}
