import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "motion/react";
import { Radar, Search, ShieldCheck, Clock, ArrowRight, CheckCircle2, Globe, Mail, ChevronDown, GraduationCap, Briefcase, Rocket, MapPin, Compass, Flag, Undo2, X, Sparkles, Zap, LayoutDashboard, Heart, ArrowLeft, Menu, Bell } from "lucide-react";
import * as React from "react";
import { useEffect, useState, useRef } from "react";

function PaywallModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-brand w-8 h-8" />
              </div>
              
              <h3 className="font-display text-2xl font-bold text-ink mb-3">Contenu Réservé</h3>
              <p className="text-ink-light leading-relaxed mb-8">
                Cette fonctionnalité est réservée aux membres de la communauté <span className="font-work font-bold">Wørk.ie</span>. Rejoignez-nous pour accéder à l'intégralité des outils.
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => window.location.href = '#tarifs'}
                  className="w-full bg-brand text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-brand/20 transition-all"
                >
                  Découvrir les Offres
                </button>
                <button 
                  onClick={onClose}
                  className="w-full bg-surface text-ink-light py-4 rounded-xl font-bold hover:bg-black/5 transition-all"
                >
                  Plus tard
                </button>
              </div>

              <p className="mt-6 text-xs text-ink-light/60">
                Paiement sécurisé par Stripe. Sans engagement.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Counter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}

export default function App() {
  const [isExpOpen, setIsExpOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [cityInput, setCityInput] = useState("");
  const [selectedExp, setSelectedExp] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsExpOpen(false);
        // Reset to step 1 when closing if needed, or keep it. Let's reset for clarity.
        setTimeout(() => {
          if (!isExpOpen) {
            setSelectedCity(null);
            setCityInput("");
            setSelectedExp(null);
          }
        }, 300);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpOpen]);

  const expOptions = [
    { id: 'stage', label: "Alternance / Stage", icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'junior', label: "1 à 2 ans d'expérience", icon: <Briefcase className="w-5 h-5" /> },
    { id: 'senior', label: "Plus de 3 ans d'expérience", icon: <Rocket className="w-5 h-5" /> },
  ];

  const locationOptions = [
    { label: "France", icon: <Flag className="w-5 h-5" />, link: "https://t.me/example_france" },
    { label: "Europe / International", icon: <Globe className="w-5 h-5" />, link: "https://t.me/example_intl" },
  ];

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setCityInput(city);
    setIsExpOpen(true);
  };

  const handleExpSelect = (label: string) => {
    setSelectedExp(label);
    // Final action: redirect or show success
    // For now, let's just close and maybe show a success state or redirect to Telegram
    window.open("https://t.me/example_france", "_blank");
    setIsExpOpen(false);
  };

  const radarJobs = [
    {
      title: "Analyste Cyber-OSINT",
      company: "Thales",
      location: "Vélizy",
      tags: ["Cyber", "OSINT"],
      time: "Il y a 31j",
      description: "Expertise en surveillance cyber et automatisation de collecte de données sensibles."
    },
    {
      title: "Investigateur Fraude",
      company: "BNP Paribas",
      location: "Paris",
      tags: ["AML", "Blockchain"],
      time: "Il y a 34j",
      description: "Analyse des transactions suspectes et traçage d'actifs sur les registres distribués."
    },
    {
      title: "Due Diligence Officer",
      company: "Kroll",
      location: "London",
      tags: ["Corporate", "KYC"],
      time: "Il y a 38j",
      description: "Enquêtes de réputation et vérification d'antécédents pour fusions-acquisitions."
    },
    {
      title: "Veilleur Stratégique",
      company: "Airbus",
      location: "Toulouse",
      tags: ["E-Reputation", "Social"],
      time: "Il y a 42j",
      description: "Surveillance des signaux faibles et analyse de l'image de marque sur les réseaux."
    }
  ];

  const resetSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCity(null);
    setCityInput("");
    setSelectedExp(null);
    setIsExpOpen(false);
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-brand/20 font-sans text-ink">
      {/* Navigation - Scrolled only */}
      <AnimatePresence>
        {scrolled && (
          <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-[110] bg-white/90 backdrop-blur-md border-b border-black/5 shadow-sm"
          >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center shadow-lg shadow-brand/20">
                  <Radar className="text-white w-5 h-5" />
                </div>
                <span className="font-work font-extrabold text-lg tracking-tight text-ink">Wørk.ie</span>
              </div>
              <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-ink/40">
                <a href="#valeur" className="hover:text-brand transition-colors">Valeur</a>
                <a href="#forums" className="hover:text-brand transition-colors">Forums</a>
                <a href="#tarifs" className="hover:text-brand transition-colors">Tarifs</a>
              </div>
              <button 
                onClick={() => setShowPaywall(true)}
                className="bg-brand text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand/90 transition-all shadow-lg shadow-brand/20"
              >
                S'abonner
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="relative pt-6 pb-24">
        {/* Background Grid - Subtler */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} />
        
        {/* Hero Section - Vantage Style */}
        <section className="relative px-6 max-w-xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-4xl font-extrabold leading-[1.1] text-ink mb-6 tracking-tight">
              <span className="font-work text-4xl font-black tracking-tighter">Wørk.ie :</span> <br />
              <span className="text-brand">Soyez le premier</span> <br />
              à candidater.
            </h1>

            <p className="text-[10px] font-black text-ink/40 uppercase tracking-[0.2em] mb-3 ml-1">
              Le premier agrégateur d'opportunités qualifiées en OSINT et Intelligence Economique.
            </p>

            {/* Experience Dropdown CTA - Vantage Style */}
            <div className="relative mb-8" ref={dropdownRef}>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                  <MapPin className={`w-5 h-5 transition-colors ${selectedCity ? 'text-brand' : 'text-ink/20'}`} />
                </div>
                <input 
                  type="text"
                  value={cityInput}
                  onChange={(e) => {
                    setCityInput(e.target.value);
                    if (selectedCity) setSelectedCity(null);
                    if (isExpOpen) setIsExpOpen(false);
                  } }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && cityInput.trim()) {
                      handleCitySelect(cityInput.trim());
                    }
                  }}
                  placeholder="Où souhaitez-vous travailler ?"
                  className="w-full bg-white border border-border rounded-2xl py-4 pl-12 pr-24 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all shadow-sm"
                />
                <div className="absolute inset-y-0 right-2 flex items-center gap-2">
                  {cityInput.trim() && !selectedCity && (
                    <button 
                      onClick={() => handleCitySelect(cityInput.trim())}
                      className="bg-brand text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg shadow-brand/20 hover:scale-105 transition-all"
                    >
                      Confirmer
                    </button>
                  )}
                  {selectedCity && (
                    <button 
                      onClick={() => setIsExpOpen(!isExpOpen)}
                      className="p-2 text-brand hover:bg-brand/5 rounded-xl transition-all"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpOpen ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {isExpOpen && selectedCity && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 right-0 mt-4 bg-white border border-border rounded-[2.5rem] shadow-2xl z-50 overflow-hidden p-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-4 px-4">
                        <div className="flex flex-col">
                          <p className="text-[10px] font-black text-ink/30 uppercase tracking-[0.2em]">Votre expérience</p>
                          <p className="text-[9px] font-bold text-brand truncate">Recherche à {selectedCity}</p>
                        </div>
                      </div>
                      {expOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => handleExpSelect(opt.label)}
                          className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-brand/5 transition-colors text-left group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all">
                            {opt.icon}
                          </div>
                          <span className="font-bold text-ink">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Categories - Vantage Style */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar mb-10">
              {["ALL JOBS", "OSINT", "INTELLIGENCE ECONOMIQUE", "VIE", "HUMINT"].map((cat, i) => (
                <button 
                  key={i}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-[10px] font-black tracking-widest transition-all ${i === 0 ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'bg-brand-light text-brand hover:bg-brand/10'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Section Header - Ultra Compact & Pro */}
            <div className="mb-6 flex flex-col gap-3">
              <h2 className="font-work text-lg font-black text-ink tracking-tighter uppercase">
                Archives
              </h2>
              
              <div className="bg-brand/5 border border-brand/10 rounded-xl p-2 flex items-center gap-2 max-w-fit">
                <Zap className="text-brand w-3 h-3 shrink-0" />
                <p className="text-[9px] text-brand font-bold leading-tight uppercase tracking-wider">
                  82% des recrutements OSINT se jouent en 24h
                </p>
              </div>

              <button 
                onClick={() => setShowPaywall(true)}
                className="text-[10px] font-black text-brand uppercase tracking-widest hover:opacity-70 transition-all flex items-center gap-2"
              >
                Accédez aux dernières offres
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Job List - Vantage Style */}
            <div className="space-y-4 mb-10">
              {radarJobs.map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setShowPaywall(true)}
                  className="bg-white border border-border rounded-3xl p-5 flex items-center gap-4 hover:shadow-xl hover:shadow-brand/5 transition-all cursor-pointer group relative opacity-70 grayscale-[0.5] hover:opacity-100 hover:grayscale-0"
                >
                  <div className="w-14 h-14 rounded-2xl bg-ink/[0.03] border border-border flex items-center justify-center shrink-0 group-hover:bg-brand/5 transition-colors">
                    <Radar className="w-6 h-6 text-ink/20 group-hover:text-brand transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-extrabold text-ink truncate group-hover:text-brand transition-colors">{job.title}</h4>
                      <span className="px-2 py-0.5 bg-ink/5 text-ink/40 text-[8px] font-black rounded-md uppercase tracking-widest">Archivé</span>
                    </div>
                    <p className="text-[10px] font-bold text-ink/40 uppercase tracking-widest mb-2">{job.company}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[9px] font-bold text-ink/40">
                        <MapPin className="w-3 h-3 text-brand" />
                        {job.location}, FR
                      </div>
                      <div className="flex items-center gap-1 text-[9px] font-bold text-ink/40">
                        <Clock className="w-3 h-3 text-brand" />
                        {job.time}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Featured Card - Vantage Style */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-brand rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-brand/30 mb-12"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl" />
              <div className="relative z-10">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60 mb-3 block">FIELD REPORT : INTERNATIONAL MOBILITY</span>
                <h3 className="text-xl font-extrabold leading-tight mb-6 max-w-[340px]">
                  Sponsorship & Recrutement Direct : Analyse des corridors de mobilité pour les experts en renseignement. Notre retour d'expérience terrain 2026.
                </h3>
                <button 
                  onClick={() => setShowPaywall(true)}
                  className="bg-white/20 backdrop-blur-md border border-white/30 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-brand transition-all flex items-center gap-2 group"
                >
                  Accéder à l'analyse
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              {/* Abstract Wave Detail */}
              <div className="absolute bottom-4 right-8 opacity-20">
                <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 50C20 40 40 60 60 50C80 40 100 60 120 50" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  <path d="M0 30C20 20 40 40 60 30C80 20 100 40 120 30" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
                </svg>
              </div>
            </motion.div>

            {/* Innovative Marquee Band removed */}
          </motion.div>
        </section>

        {/* Value Proposition */}
        <section id="valeur" className="py-24 relative bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-ink">Pourquoi choisir notre curation ?</h2>
              <p className="text-lg text-ink/60">
                L'intelligence ne dort jamais, nous non plus. Nous combinons technologie et expertise humaine pour vous offrir le meilleur du marché.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 hover:border-brand/50 transition-all group shadow-sm">
                <div className="w-14 h-14 bg-brand/5 rounded-2xl flex items-center justify-center mb-6 border border-brand/10 group-hover:scale-110 transition-transform">
                  <Search className="text-brand w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-ink">Expertise Analytique</h3>
                <p className="text-ink/60 leading-relaxed">
                  Au-delà du simple scraping, chaque opportunité est qualifiée par nos analystes pour garantir sa pertinence stratégique et opérationnelle.
                </p>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 hover:border-brand/50 transition-all group shadow-sm">
                <div className="w-14 h-14 bg-brand/5 rounded-2xl flex items-center justify-center mb-6 border border-brand/10 group-hover:scale-110 transition-transform">
                  <Zap className="text-brand w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-ink">Réactivité Opérationnelle</h3>
                <p className="text-ink/60 leading-relaxed">
                  Le renseignement est une course contre la montre. Nos cycles de collecte tri-quotidiens vous assurent une avance critique sur le marché.
                </p>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 hover:border-brand/50 transition-all group shadow-sm">
                <div className="w-14 h-14 bg-brand/5 rounded-2xl flex items-center justify-center mb-6 border border-brand/10 group-hover:scale-110 transition-transform">
                  <Mail className="text-brand w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-ink">Réseaux Fermés</h3>
                <p className="text-ink/60 leading-relaxed">
                  Nous exploitons des canaux de recrutement non indexés et des cercles de confiance inaccessibles aux moteurs de recherche standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Forums Section */}
        <section id="forums" className="py-24 relative overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/5 border border-brand/10 rounded-full text-brand text-xs font-bold tracking-widest uppercase mb-8">
                  <Compass className="w-4 h-4" />
                  Communauté Exclusive
                </div>
                <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 text-ink leading-tight">
                  Le RETEX au service de votre carrière.
                </h2>
                <p className="text-xl text-ink/60 mb-10 leading-relaxed">
                  Intégrez notre cercle de confiance : un espace d'échange sécurisé où les praticiens du renseignement partagent des retours d'expérience sans filtre sur les employeurs et les méthodologies.
                </p>
                
                <div className="space-y-6">
                  {[
                    { title: "Tips Entreprises", desc: "Découvrez l'envers du décor avant de postuler." },
                    { title: "Retours d'Expérience", desc: "Des témoignages réels sur les missions et les salaires." },
                    { title: "Entraide OSINT", desc: "Posez vos questions techniques à la communauté." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-black/5">
                        <CheckCircle2 className="text-brand w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-ink mb-1">{item.title}</h4>
                        <p className="text-ink/60 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-brand/5 blur-[100px] -z-10" />
                <div className="bg-white border border-black/5 rounded-[2.5rem] p-8 shadow-xl">
                  <div className="space-y-4">
                    {[
                      { user: "Alex M.", text: "Le process chez Thales est assez long, prévoyez 3 entretiens techniques...", time: "Il y a 2h" },
                      { user: "Sarah K.", text: "Nouveau tip pour le scraping LinkedIn sans se faire flagger : utilisez...", time: "Il y a 5h" },
                      { user: "Marc D.", text: "Quelqu'un a un retour sur l'ambiance au pôle cyber de la DGSE ?", time: "Il y a 1j" }
                    ].map((post, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-surface p-5 rounded-2xl border border-black/5"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-bold text-ink text-sm">{post.user}</span>
                          <span className="text-[10px] text-ink-light font-bold uppercase">{post.time}</span>
                        </div>
                        <p className="text-ink-light text-sm italic">"{post.text}"</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-8 p-6 bg-brand-light rounded-2xl text-center border border-brand/10">
                    <p className="text-brand font-bold text-sm mb-2">Accès réservé aux membres Premium</p>
                    <button 
                      onClick={() => setShowPaywall(true)}
                      className="text-xs font-bold uppercase tracking-widest text-brand hover:underline"
                    >
                      Rejoindre la discussion →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="tarifs" className="py-24 bg-brand-light/30 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-black/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-brand/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
              
              <div className="grid lg:grid-cols-2 gap-16 items-center relative">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-xs font-bold mb-8">
                    <Sparkles className="w-4 h-4" />
                    OFFRE LIMITÉE
                  </div>
                  <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 leading-tight text-ink">Un investissement pour votre futur.</h2>
                  <p className="text-ink-light text-lg md:text-xl mb-10 leading-relaxed">
                    Rejoignez la communauté des experts OSINT les mieux informés. Pas d'engagement, juste de la valeur brute.
                  </p>
                  <ul className="space-y-5">
                    {[
                      "Accès complet au Radar pendant 3 mois",
                      "Accès aux Forums Privés & Tips",
                      "Alertes en temps réel (3 scans/jour)",
                      "Support prioritaire par email"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-4 text-lg">
                        <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="text-brand w-4 h-4" />
                        </div>
                        <span className="text-ink-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-surface rounded-[2.5rem] p-10 md:p-12 text-center border border-black/5 shadow-inner">
                  <div className="text-brand font-bold uppercase tracking-widest text-xs mb-6">PRIX DE LANCEMENT</div>
                  <div className="flex items-baseline justify-center gap-2 mb-10">
                    <span className="text-7xl md:text-8xl font-bold tracking-tighter text-ink">18€</span>
                    <span className="text-ink-light font-medium text-xl">/ 3 mois</span>
                  </div>
                  <button 
                    onClick={() => setShowPaywall(true)}
                    className="w-full bg-brand text-white py-6 rounded-2xl font-bold text-xl hover:shadow-xl hover:shadow-brand/20 transition-all block"
                  >
                    S'ABONNER MAINTENANT
                  </button>
                  <div className="flex items-center justify-center gap-2 mt-8 text-ink-light/40 text-sm font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    Paiement sécurisé via Stripe
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-24 bg-white border-t border-black/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center shadow-lg shadow-brand/20">
                  <Radar className="text-white w-7 h-7" />
                </div>
                <span className="font-display font-bold text-3xl text-ink">Vantage</span>
              </div>
              <p className="text-ink-light max-w-sm text-lg leading-relaxed">
                La plateforme de référence pour la mobilité stratégique des experts en renseignement et investigation numérique.
              </p>
            </div>
            <div>
              <h4 className="text-ink font-bold mb-8 text-lg">Navigation</h4>
              <ul className="space-y-4 text-ink-light">
                <li><a href="#valeur" className="hover:text-brand transition-colors">Valeur</a></li>
                <li><a href="#forums" className="hover:text-brand transition-colors">Forums</a></li>
                <li><a href="#tarifs" className="hover:text-brand transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-ink font-bold mb-8 text-lg">Légal</h4>
              <ul className="space-y-4 text-ink-light">
                <li><a href="#" className="hover:text-brand transition-colors">Mentions Légales</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-ink-light/40 text-sm">
              © {new Date().getFullYear()} <span className="font-work font-bold">Wørk.ie</span> OSINT. Tous droits réservés.
            </p>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-surface border border-black/5 flex items-center justify-center text-ink-light hover:text-brand hover:border-brand transition-all cursor-pointer">
                <Mail className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation - Glassmorphism Pill */}
      <div className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-md">
        <div className="bg-white/10 backdrop-blur-[40px] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-full px-6 py-3 flex items-center justify-around">
          <button 
            onClick={() => setShowPaywall(true)}
            className="flex flex-col items-center gap-1 text-black hover:scale-110 transition-all"
          >
            <Search className="w-5 h-5 stroke-[3px]" />
            <span className="text-[8px] font-black uppercase tracking-tighter">Explorer</span>
          </button>
          <button 
            onClick={() => setShowPaywall(true)}
            className="flex flex-col items-center gap-1 text-black hover:scale-110 transition-all"
          >
            <Heart className="w-5 h-5 fill-black stroke-[1px]" />
            <span className="text-[8px] font-black uppercase tracking-tighter">Favoris</span>
          </button>
          <button 
            onClick={() => setShowPaywall(true)}
            className="flex flex-col items-center gap-1 text-black hover:scale-110 transition-all"
          >
            <LayoutDashboard className="w-5 h-5 fill-black stroke-[1px]" />
            <span className="text-[8px] font-black uppercase tracking-tighter">Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}
