import { Link, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";

/* ─── Colour tokens (Tailwind arbitrary values) ────────────────────────────
   Primary   : #7A0000  (deep crimson / maroon)
   Secondary : #B91C1C  (rich red for hover accents)
   Gold      : #C9A84C  (Newari gold accent)
   Cream     : #FDF6EC  (warm off-white background)
   Dark      : #1A0A0A  (near-black for text)
────────────────────────────────────────────────────────────────────────── */

/* ── Reusable small components ─────────────────────────────────────────── */

const linkClass =
  "text-[#1A0A0A] font-medium hover:text-[#7A0000] transition-colors duration-200 relative" +
  " after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[2px]" +
  " after:bg-[#7A0000] hover:after:w-full after:transition-all after:duration-300";

function NavLink({ to, children }) {
  return (
    <Link to={to} className={linkClass}>
      {children}
    </Link>
  );
}

function ScrollLink({ targetId, children, onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    if (onClick) onClick();
  };
  return (
    <button onClick={handleClick} className={linkClass}>
      {children}
    </button>
  );
}

function PrimaryBtn({ to, onClick, children, className = "" }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (to) navigate(to);
    if (onClick) onClick();
  };
  return (
    <button
      onClick={handleClick}
      className={`bg-[#7A0000] text-white font-semibold px-6 py-2.5 rounded-full
                  hover:bg-[#9B0000] active:scale-95 shadow-md hover:shadow-[#7A000040]
                  transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
}

function OutlineBtn({ to, children, className = "" }) {
  return (
    <Link
      to={to}
      className={`border-2 border-[#7A0000] text-[#7A0000] font-semibold px-6 py-2.5 rounded-full
                  hover:bg-[#7A0000] hover:text-white active:scale-95
                  transition-all duration-200 ${className}`}
    >
      {children}
    </Link>
  );
}

/* ── Feature card ──────────────────────────────────────────────────────── */
function FeatureCard({ icon, title, desc }) {
  return (
    <div
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-[#F0E0D0]
                 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3"
    >
      <div className="w-12 h-12 rounded-xl bg-[#7A000015] flex items-center justify-center text-2xl">
        {icon}
      </div>
      <h3 className="font-bold text-[#1A0A0A] text-lg">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

/* ── NAVBAR ────────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none">
          <span className="text-2xl">न</span>
          <span className="font-extrabold text-xl text-[#7A0000] tracking-tight">
            Nepal Bhasa
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <ScrollLink targetId="about">About Us</ScrollLink>
          <PrimaryBtn to="/login">Login</PrimaryBtn>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-[#7A0000] transition-all duration-300
              ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#7A0000] transition-all duration-300
              ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#7A0000] transition-all duration-300
              ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu drawer */}
      <div
        className={`md:hidden bg-white border-t border-[#F0E0D0] overflow-hidden transition-all duration-300
          ${menuOpen ? "max-h-60 py-4" : "max-h-0"}`}
      >
        <div className="flex flex-col items-center gap-4 px-6">
          <ScrollLink targetId="about" onClick={() => setMenuOpen(false)}>
            About Us
          </ScrollLink>
          <PrimaryBtn to="/login" className="w-full text-center">
            Login / Sign Up
          </PrimaryBtn>
        </div>
      </div>
    </header>
  );
}

/* ── HERO ──────────────────────────────────────────────────────────────── */
function Hero() {
  const headlineRef = useRef(null);

  // Fade-in animation on mount
  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  return (
    <section className="min-h-screen bg-[#FDF6EC] pt-24 pb-16 flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT — copy */}
          <div ref={headlineRef} className="flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#7A000015] text-[#7A0000] text-sm font-semibold px-4 py-1.5 rounded-full w-fit">
              <span>🌿</span> Rediscover Your Roots
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A0A0A] leading-tight">
              Speak the Language{" "}
              <span className="text-[#7A0000]">Your Ancestors</span>{" "}
              Were Born Into
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed max-w-md">
              Nepal Bhasa is more than words — it's living heritage. Learn Newari
              through bite-sized, guided lessons crafted for every generation.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <PrimaryBtn to="/signup" className="px-8 py-3 text-base">
                Get Started — It's Free
              </PrimaryBtn>
              
            </div>


          </div>

          {/* RIGHT — illustration */}
          <div className="relative flex justify-center items-center">
            {/* Decorative blob */}
            <div
              className="absolute w-72 h-72 rounded-full bg-[#7A000018] blur-3xl"
              aria-hidden="true"
            />
            {/* Card frame */}
            <div
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-[#F0E0D0]
                         w-full max-w-md aspect-[4/3] bg-gradient-to-br from-[#7A0000] to-[#3D0000]
                         flex flex-col items-center justify-center gap-4 p-8 text-center"
            >
              <img
                src="/newari_hero.png"
                alt="Newari cultural illustration"
                className="w-full h-full object-cover absolute inset-0 opacity-30 rounded-3xl"
              />
              <div className="relative z-10">
                <p className="text-[#C9A84C] text-5xl font-extrabold mb-2">न</p>
                <p className="text-white/80 text-sm">Nepal Bhasa · नेपाल भाषा</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── ABOUT US ─────────────────────────────────────────────────────────── */
function AboutUs() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* About intro */}
        <div className="mb-14">
          <span className="text-[#7A0000] font-semibold text-sm uppercase tracking-widest">
            Our Story
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#1A0A0A]">
            About Us
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed max-w-2xl">
            Nepal Bhasa App was built by a passionate team of Newari heritage
            enthusiasts, linguists, and educators determined to keep the ancient
            language of the Kathmandu Valley alive. Through gamified, bite-sized
            lessons rooted in authentic cultural context, we make it joyful and
            accessible for anyone — beginner or returning speaker — to learn,
            practice, and celebrate Nepal Bhasa every day.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-[#F0E0D0] mb-14" />

        {/* Why Nepal Bhasa label — bridges into Features section */}
        <div className="text-center">
          <span className="text-[#7A0000] font-semibold text-sm uppercase tracking-widest">
            Why Nepal Bhasa?
          </span>
          <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#1A0A0A]">
            Everything You Need to Speak Newari
          </h3>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Our platform combines modern pedagogy with traditional wisdom so you
            can learn authentically and joyfully.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── FEATURES ──────────────────────────────────────────────────────────── */
function Features() {
  const features = [
    {
      icon: "📖",
      title: "Structured Lessons",
      desc: "Progressive lessons from the alphabet to full conversations, carefully crafted by native speakers.",
    },
    {
      icon: "🎧",
      title: "Native Audio",
      desc: "Hear authentic Newari pronunciation from fluent speakers to train your ear from day one.",
    },
    {
      icon: "🏆",
      title: "Gamified Learning",
      desc: "Earn points, unlock levels, and build streaks that keep you motivated every single day.",
    },
    {
      icon: "🗺️",
      title: "Cultural Context",
      desc: "Every lesson is rooted in Newari history, festivals, and traditions — learn the whole story.",
    },
    {
      icon: "📱",
      title: "Learn Anywhere",
      desc: "Fully responsive — practice on your phone, tablet, or desktop whenever inspiration strikes.",
    },
    {
      icon: "❤️",
      title: "Community Driven",
      desc: "Join a growing community of heritage learners keeping Nepal Bhasa alive for future generations.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">


        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA BANNER ────────────────────────────────────────────────────────── */
function CTABanner() {
  return (
    <section className="py-20 bg-[#FDF6EC]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A0A0A] leading-tight">
          Your ancestors spoke it.{" "}
          <span className="text-[#7A0000]">Now it's your turn.</span>
        </h2>
        <p className="mt-4 text-gray-500 text-lg">
          Start with a single lesson today. No experience needed — just curiosity
          and a love for your heritage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <PrimaryBtn to="/signup" className="px-10 py-3 text-base">
            Start Learning for Free
          </PrimaryBtn>
          <OutlineBtn to="/login">I Already Have an Account</OutlineBtn>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#1A0A0A] text-white py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">न</span>
          <span className="font-extrabold text-[#C9A84C]">Nepal Bhasa</span>
        </div>
        <p className="text-white/40 text-sm text-center">
          © {new Date().getFullYear()} Nepal Bhasa App · Preserving Newari for
          generations
        </p>
        <div className="flex gap-5 text-sm text-white/50">
          <Link to="/about" className="hover:text-[#C9A84C] transition-colors">
            About
          </Link>
          <Link to="/privacy" className="hover:text-[#C9A84C] transition-colors">
            Privacy
          </Link>
          <Link to="/contact" className="hover:text-[#C9A84C] transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* ── PAGE ──────────────────────────────────────────────────────────────── */
export default function Landing() {
  return (
    <>
      {/* Floating animation keyframes (injected once) */}
      <style>{`
        @keyframes float {
          from { transform: translateY(0px) rotate(-2deg); }
          to   { transform: translateY(-10px) rotate(2deg); }
        }
      `}</style>

      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <Features />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}