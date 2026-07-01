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
  DollarSign,
  ShieldCheck,
  Clock,
  Box,
  Smartphone,
  Network,
  Terminal,
  AlertCircle,
} from "lucide-react";


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
    title: "[UAT & LIVE] IAC Multiple ePOD",
    status: "COMPLETED",
    statusCls: "bg-emerald-100 text-emerald-700",
    desc: "Allow multiple ePOD (electronic proof-of-delivery) submissions for a single parcel in the IAC system. Conducted UAT and pilot live testing with Shopee Marketplace team. Successfully rolled out the feature to all users (Shopee and Driver), resulting in better customer experience.",
    details: ["Better UX", "Clearer details", "April-May 2026"],
    img: "./img/task1.png",
    imgAlt: "Task 1",
    reverse: false,
  },
  {
    num: "TASK-02",
    title: "[UAT] High Value Asset Tracking via AMS]",
    status: "COMPLETED",
    statusCls: "bg-emerald-100 text-emerald-700",
    desc: "Utilizing AMS to track high value assets used in the warehouse and hubs by the ops. Aims for more systematic asset usage tracking with history, and reducing the percentage of lost assets during operation. Currently in pilot live testing phase with help from Asset team (HQ).",
    details: ["Asset Tracking", "Reduce losses", "Pilot Testing", "April & July 2026"],
    img: "./img/task2.png",
    imgAlt: "Task 2",
    reverse: true,
  },
  {
    num: "TASK-03",
    title: "[UAT & LIVE] Weekend Label Phase 2",
    status: "COMPLETED",
    statusCls: "bg-emerald-100 text-emerald-700",
    desc: "Enhancement feature for Shopee AWB label & Shopee tracking system. The feature will indicates the information of the successful delivery rate during weekend (according to region). Conducted the UAT testing and feature already rollout to all users. ",
    details: ["Clearer details", "Improve Efficiency", " April & July 2026"],
    img: "./img/task3.png",
    imgAlt: "Task 3",
    reverse: false,
  },
  {
    num: "TASK-04",
    title: "[UAT & LIVE] Proof of Onhold Validation",
    status: "COMPLETED",
    statusCls: "bg-emerald-100 text-emerald-700",
    desc:"Enhancement feature for Shopee ops to validate the onhold reason for the parcel delivery attempt. Implementing the use of AI and automated system for validation with manual review option to validate the parcel onhold reason before allowing to be process. Also featuring the OH List for better visibility and management to the ops team. Already rollout in phase and have been used by the system.",
    details: ["Enhanced Validation", "Reduced losses", "POD protocols", "May-June 2026"],
    img: "./img/task4.png",
    imgAlt: "Task 4",
    reverse: true,
  },
];

const PROCESS_CARDS = [
  {
    id: 1,
    title: "Action Conducted",
    bg: "#e11d48",
    desc: "#1 QA & Product Validation (UAT)\n" + "#2 Stakeholder Management & Communication (Meetings, Alignment with Stakeholders), Debug sessions\n" + "#3 Continuous Improvement & Operational Readiness (Material prep & release announcement&configuration",
  },
  {
    id: 2,
    title: "BENEFITS",
    bg: "#2563eb",
    desc: "#1 The Product Lifecycle Insights\n" + "#2 Stages in Product pipeline exposure\n" + "\ta. Regional Initiative\n \tb. Planning and Approval\n \tc. UAT Verification\n \td. Operational Pilot ",
  },
  {
    id: 3,
    title: "SKILLS GAINED",
    bg: "#16a34a",
    desc: "#1 Product & Management skills\n" + "#2 Stakeholder coordination\n" + "#3 Technical QA",
  },
];

const GALLERY_ITEMS = [
  { img: "./img/onboard1.jpg", alt: "Onboarding Merch", caption: "Onboarding Merch", date: "March 30, 2026", h: 330 },
  { img: "./img/img5.jpg", alt: "Raya Photoshoot Challenge", caption: "Raya Photoshoot Challenge", date: "April 6, 2026", h: 400 },
  { img: "./img/img6.jpg", alt: "Product Team Raya Potluck", caption: "Product Team Raya Potluck", date: "April 8, 2026", h: 360 },
  { img: "./img/foodie.HEIC", alt: "Product Team Raya Potluck", caption: "Potluck Fooodie", date: "April 8, 2026", h: 400 },
  { img: "./img/img3.jpg", alt: "My Desk", caption: "My Desk", date: "Some day in May 2026", h: 370 },
  { img: "./img/raya-win.jpg", alt: "Photo Challenge prize", caption: "Photo Challenge prize", date: "April 9, 2026", h: 350 },
  { img: "./img/img2.jpg", alt: "Aisya's Wedding", caption: "Attending Aisya's Wedding", date: "June 14, 2026", h: 400 },
  { img: "./img/img9.jpg", alt: "Meeting tri-weekly", caption: "Proof i joined the meeting", date: "some day in May 2026", h: 340 },
  { img: "./img/img4.jpg", alt: "Team Photo", caption: "Team Photo", date: "April 9, 2026", h: 200 },
  { img: "./img/img8.jpg", alt: "Team Photo", caption: "Team Photo", date: "April 9, 2026", h: 370 },
];

const SUB_TEAMS = [
  { name: "Finance", code: "FIN", icon: DollarSign },
  { name: "Non-Shopee Seller", code: "NSS", icon: Users },
  { name: "Linehaul (Land, Air, Sea)", code: "LH", icon: Truck },
  { name: "Workforce Management", code: "WFM", icon: Clock },
  { name: "Asset", code: "AMS", icon: Box },
  { name: "FM, LM, DOP", code: "OPS-DRIVER", icon: MapPin },
  { name: "BSC / Locker", code: "BSC", icon: Smartphone },
  { name: "SOC / Network / ASM / WH / SIP / EM", code: "NET", icon: Network },
  { name: "QA Testers", code: "QA", icon: Terminal },
  { name: "Exceptional Handling / Channel Integrations / Misc", code: "EHA", icon: AlertCircle },
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

          <h1 className="font-montserrat font-black leading-none mb-3" style={{ fontSize: "clamp(3rem, 9vw, 5rem)" }}>
            <span className="text-white block">CST688</span>
            <span className="text-white block">INDUSTRIAL TRAINING</span>
            <span style={{ fontSize: "clamp(1rem, 3vw, 2rem)", color: "#ff6b00", fontStyle: "italic" }} className="block">Product Intern @SPX Express</span>
          </h1>

          <p className="font-mono text-white/30 text-xs tracking-[0.25em] uppercase mt-4 mb-10">
            PARCEL NO. INT-2026-07-03 &nbsp;·&nbsp; TRACKING ACTIVE
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
              { num: "01", label: "Company Background", desc: "History, mission, and overview of SPX Express", id: "company", stop: "ORIGIN" },
              { num: "02", label: "Department Background", desc: "Knowing the team behind the operation", id: "department", stop: "SORTED" },
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
          <div className="grid lg:grid-cols-1 gap-16 items-start">
            {/* Text */}
            <div>
              <p className="font-mono text-orange-500 text-[10px] tracking-[0.25em] uppercase mb-2">SENDER INFORMATION</p>
              <h2 className="font-montserrat font-black text-[#0d1b3e] mb-5" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
                COMPANY<br />BACKGROUND
              </h2>
              <div className="w-12 h-1 bg-orange-500 mb-8" />

              <div className="group overflow-hidden rounded-xl bg-gray-200">
                <img
                  src="./img/sealtd-spx.png"
                  alt="SPX Xpress Sdn Bhd"
                  className="w-full h-105 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
                <p>
                  <strong className="text-[#0d1b3e]">SPX Express</strong> a logistic and courier company, operates under 
                  Sea Limited, a Singapore-based global technology conglomerate, founded on 2018 as logistic arm for their
                  e-commerce platform, Shopee which founded on 2015.
                </p>
                <p>
                  With over 1000 employees and a network spanning to more than 180 distribution hubs, SPX
                  processes an average of 2.5 million parcels per day. Their proprietary real-time
                  tracking platform, serves and manage the order fulfillment and delivery operations for Shopee, ensuring timely and efficient parcel delivery across the region.
                </p>
                <p>
                  The company mission: <strong className="text-orange-600">"Fast & Reliable."</strong> — a
                  commitment to speed, extensive coverage and reliable solutions while being cost-effective to customers,
                  have place them to be one of the leading logistics partners in Southeast Asia, Brazil and Taiwan.
                </p>
                <p>
                  The MY SPX HQ located at: <strong className="text-orange-600">Level 25, Menara Southpoint, Mid Valley City, Kuala Lumpur</strong>
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { val: "2.5M", label: "Parcels / day" },
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
                  src="./img/southpoint-tower-1.jpg"
                  alt="SPX Xpress Sdn Bhd"
                  className="w-full h-90 object-cover group-hover:scale-105 transition-transform duration-500 object-position-top"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="group overflow-hidden rounded-xl bg-gray-200">
                  <img
                    src="./img/shopee-logo.png"
                    alt="SwiftRoute delivery fleet lined up at the Petaling Jaya depot"
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="group overflow-hidden rounded-xl bg-gray-200">
                  <img
                    src="./img/spx-logo.jpeg"
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
                src="./img/product-team-new.jpg"
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
                    The Product Team consist of 15 total members, 11 FTE and 4 other members including interns.
                    The MY Product Team is responsible for localizing, testing, deploying, and maintaining the software systems that power SPX Express 
                    operations in Malaysia. They ensure that global or regional tech solutions align 
                    perfectly with local operational workflows, legal requirements, and business goals.
                  </p>
                </div>
                <div className="flex flex-col justify-center gap-4">
                  {[
                    { icon: Users, label: "Team Size", val: "11 FTE Staff" },
                    { icon: MapPin, label: "Office", val: "Level 21, Southpoint Tower" },
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
              <div className="mt-8 grid sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
                    {SUB_TEAMS.map((team) => {
                      const Icon = team.icon;
                      return (
                        <div key={team.name} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-yellow-400" />
                          </div>
                          <div>
                            <div className="font-mono text-white/35 text-[9px] uppercase tracking-wider">{team.code}</div>
                            <div className="font-montserrat font-bold text-white text-s leading-snug hover:text-yellow-400">{team.name}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── 5. TASKS & PROJECTS ── */}
      <section id="tasks" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-mono text-orange-500 text-[10px] tracking-[0.25em] uppercase mb-2">MY BACKLOGS</p>
          <h2 className="font-montserrat font-black text-[#0d1b3e] mb-12" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            TASKS &<br />PROJECTS
          </h2>

          {/* Dashboard overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-20">
            {[
              { icon: ClipboardList, label: "Total Tasks", val: "7", sub: "Assigned projects", bg: "#0d1b3e", tc: "#ff6b00", sc: "rgba(255,255,255,0.4)" },
              { icon: CheckCircle2, label: "Completed", val: "7", sub: "On track", bg: "#ff6b00", tc: "#ffffff", sc: "rgba(255,255,255,0.6)" },
              { icon: Award, label: "Live", val: "5", sub: "Rollout to user", bg: "#facc15", tc: "#0d1b3e", sc: "rgba(13,27,62,0.5)" },
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

          {/* Sticky stacking process cards */}
          <div className="mt-8">
            <div className="rounded-[2rem] bg-[#f5f5f7] px-4 py-5 md:px-8 md:py-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-mono text-orange-500 text-[10px] tracking-[0.25em] uppercase mb-2">
                    PROCESS FLOW
                  </p>
                  <h3 className="font-montserrat font-black text-[#0d1b3e]" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)" }}>
                    INSIGHTS<br />
                  </h3>
                </div>
              </div>

              <div>
                {PROCESS_CARDS.map((card) => (
                  <div
                    key={card.id}
                    className="sticky top-24 z-10"
                  >
                    <div
                      className="rounded-[2rem] min-h-[300px] px-8 py-8 md:px-10 md:py-10 text-white shadow-[0_20px_70px_-35px_rgba(13,27,62,0.8)] flex flex-col justify-center"
                      style={{ background: card.bg }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 font-mono text-sm font-bold">
                          {card.id}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/70">
                          ASSIGNMENT TASKS
                        </span>
                      </div>
                      <h4 className="font-montserrat font-black leading-tight mb-3" style={{ fontSize: "clamp(1.3rem,2vw,1.7rem)" }}>
                        {card.title}
                      </h4>
                      <p className="text-sm md:text-base leading-relaxed text-white/80 max-w-2.5xl whitespace-pre-line whitespace-pre-wrap">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
                  "A good logistics is data-driven at every level. An excellent and well-maintained system is one of the key for success",
                  "Cross-functional communication is important for achieving greater achievement",
                  "Small but continuous enhancements help improve and smooth the process",
                ],
              },
              {
                icon: Zap,
                title: "Challenges Faced",
                color: "#facc15",
                points: [
                  "Aligning user needs and business needs",
                  "Technical issues, cross-functional teamwork, and miscommunication ",
                  "Adapting to the corporate daily routine",
                  "Navigating the new-to-me system",
                ],
              },
              {
                icon: TrendingUp,
                title: "Operational Insights",
                color: "#34d399",
                points: [
                  "Wonderful and insightful journey",
                  "Helps shape and prepare for the upcoming career",
                  "Experience in fast-paced workflow",
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
              "Before, I wasn't aware how and what product management team does, especially coming from technical background, guessing every decision will be decide by software engineers.
              But this internship experience has opened my eyes, how a product team works, how corporate works and communicate which each other, giving me
              an insightful exposure to the real behind the scene. It so much more than just deliver a parcel."
            </p>
            <div className="mt-5 font-mono text-orange-400 text-sm">
              — Izzat, July 2026
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
            To all, throughout the journey, thank you for the chance given, guidelines, and support.
            It was memorable and valuable experience to be part of the team. Also, this concluded my wonderful journey as 
            a student (for now), may God bless all of us, insyaAllah. Peace out.
          </p>

          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { sup: "Presented by", main: "Izzat Mahfuz", sub: "2026" },
              { sup: "University", main: "UiTM", sub: "Shah Alam" },
              { sup: "Company", main: "SPX Xpress Sdn. Bhd.", sub: "Mid Valley, KL" },
              { sup: "Duration", main: "Mar – July 2026", sub: "14 Week" },
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

      <footer className="border-t border-white/10 bg-[#0d1b3e] py-8 px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
          <p className="text-white/50 text-xs font-mono text-center md:text-left">
            alph4nov © 2026
          </p>
          <div className="flex items-center gap-6 text-xs font-montserrat">
            <a
              href="https://www.linkedin.com/in/izzat-m-a64083183/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-blue-300 transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/alph4nov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-purple-300 transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
