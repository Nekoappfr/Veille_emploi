import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "motion/react";
import { Radar, Search, ShieldCheck, Clock, ArrowRight, CheckCircle2, Globe, Mail, ChevronDown, GraduationCap, Briefcase, Rocket, MapPin, Compass, Flag, Undo2, X, Sparkles, Zap, LayoutDashboard, Heart } from "lucide-react";
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
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white border border-black/5 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-ink/20 hover:text-ink transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-brand/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Zap className="w-10 h-10 text-brand" />
              </div>
              
              <h2 className="font-display text-3xl font-extrabold mb-4 text-ink">Accès Premium Requis</h2>
              <p className="text-ink/60 text-lg mb-8">
                Vous avez trouvé le canal idéal ! Pour rejoindre nos groupes Telegram privés et recevoir les alertes en temps réel, un abonnement est nécessaire.
              </p>

              <div className="space-y-3 mb-10">
                {[
                  "Accès illimité à tous les canaux Telegram",
                  "Alertes instantanées 24h/24",
                  "Offres exclusives (marchés cachés)",
                  "Support prioritaire par nos experts"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-left bg-slate-50 border border-black/5 p-3 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-brand shrink-0" />
                    <span className="font-medium text-ink/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://buy.stripe.com/example"
                className="w-full bg-brand text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-xl shadow-brand/20 hover:shadow-brand/40 transition-all"
              >
                <Sparkles className="w-6 h-6" />
                S'abonner maintenant — 19€/mois
              </motion.a>
              
              <p className="mt-6 text-xs text-ink/30 uppercase tracking-widest font-bold">
                Sans engagement • Annulation en 1 clic
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
  const [step, setStep] = useState(1);
  const [selectedExp, setSelectedExp] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
            setStep(1);
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

  const handleExpSelect = (label: string) => {
    setSelectedExp(label);
    setStep(2);
  };

  const resetSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStep(1);
    setSelectedExp(null);
  };

  return (
    <div className="min-h-screen selection:bg-brand/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20">
              <Radar className="text-white w-6 h-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-ink">Radar OSINT</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/60">
            <a href="#valeur" className="hover:text-brand transition-colors">Valeur</a>
            <a href="#tarifs" className="hover:text-brand transition-colors">Tarifs</a>
          </div>
          <a 
            href="https://buy.stripe.com/example" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ink text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand transition-all shadow-lg shadow-ink/5"
          >
            S'abonner
          </a>
        </div>
      </nav>

      <main className="relative">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} />
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 md:px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-[1fr_auto] lg:grid-cols-[1.4fr_0.6fr] gap-6 md:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`relative ${isExpOpen ? 'z-50' : 'z-10'}`}
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 md:mb-10 text-ink">
                Le radar de l'emploi <span className="text-brand">OSINT.</span>
              </h1>
              
              <div className="flex items-center gap-3 mb-6 group cursor-default">
                <div className="flex -space-x-1">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      className="w-1.5 h-1.5 rounded-full bg-brand"
                    />
                  ))}
                </div>
                <span className="text-sm font-bold tracking-tight text-brand/80 uppercase">
                  Soyez le premier à candidater
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-brand/20 to-transparent max-w-[100px]" />
              </div>

              <p className="text-base md:text-xl text-ink/60 leading-relaxed max-w-xl mb-4">
                Nous surveillons le web pour vous et livrons les meilleures offres en OSINT, Intelligence Économique et Due Diligence.
              </p>

              <div className="flex items-center gap-3 mb-8">
                <div className="bg-brand/5 px-4 py-1 rounded-lg border border-brand/10 backdrop-blur-sm">
                  <span className="text-[10px] md:text-xs font-mono font-black text-brand tracking-[0.3em] uppercase">
                    DÉTECTION_TEMPS_RÉEL
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        opacity: [0.2, 1, 0.2],
                        scale: [0.9, 1.1, 0.9]
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                      className="w-1.5 h-1.5 rounded-full bg-brand"
                    />
                  ))}
                </div>
              </div>

              <div className="relative max-w-xl mb-8" ref={dropdownRef}>
                <motion.div 
                  className={`flex items-center gap-4 border transition-all duration-300 p-2 pl-6 rounded-2xl shadow-2xl ${isExpOpen ? 'bg-white backdrop-blur-xl border-brand ring-4 ring-brand/10' : 'bg-white border-black/5 hover:border-brand/50'}`}
                  onClick={() => setIsExpOpen(!isExpOpen)}
                >
                  {step === 1 ? (
                    <Search className={`w-6 h-6 transition-colors ${isExpOpen ? 'text-brand' : 'text-ink/30'}`} />
                  ) : (
                    <MapPin className="w-6 h-6 text-brand" />
                  )}
                  
                  <div className="flex-1 cursor-pointer py-3">
                    <p className="text-ink/40 text-[10px] md:text-xs font-medium uppercase tracking-wider mb-0.5 flex items-center gap-2">
                      {step === 1 ? "Étape 1/2 : Votre profil" : "Étape 2/2 : Localisation"}
                      {selectedExp && <span className="text-brand font-bold">• {selectedExp}</span>}
                    </p>
                    <p className="text-ink font-bold text-sm md:text-base leading-tight">
                      {step === 1 ? "Quelle est votre expérience professionnelle ?" : "Où recherchez-vous votre emploi ?"}
                    </p>
                  </div>

                  {step === 2 && (
                    <button 
                      onClick={resetSearch}
                      className="p-2 hover:bg-slate-50 rounded-lg text-ink/30 hover:text-ink transition-colors"
                      title="Retour"
                    >
                      <Undo2 className="w-5 h-5" />
                    </button>
                  )}

                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all ${isExpOpen ? 'bg-brand text-white rotate-180' : 'bg-slate-50 text-ink/40'}`}>
                    <ChevronDown className="w-5 h-5 md:w-6 h-6" />
                  </div>
                </motion.div>

                <AnimatePresence mode="wait">
                  {isExpOpen && (
                    <motion.div 
                      key={step}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-2xl border border-black/5 rounded-2xl shadow-2xl overflow-hidden z-50 p-2"
                    >
                      {step === 1 ? (
                        expOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExpSelect(opt.label);
                            }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-brand/5 group transition-all text-left"
                          >
                            <div className="w-10 h-10 rounded-lg bg-slate-50 group-hover:bg-brand/10 text-ink/40 group-hover:text-brand flex items-center justify-center transition-colors">
                              {opt.icon}
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-ink group-hover:text-brand transition-colors">{opt.label}</p>
                              <p className="text-xs text-ink/40">Sélectionner ce niveau</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-ink/20 group-hover:text-brand group-hover:translate-x-1 transition-all" />
                          </motion.button>
                        ))
                      ) : (
                        locationOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsExpOpen(false);
                              setShowPaywall(true);
                            }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-brand/5 group transition-all text-left"
                          >
                            <div className="w-10 h-10 rounded-lg bg-slate-50 group-hover:bg-brand/10 text-ink/40 group-hover:text-brand flex items-center justify-center transition-colors">
                              {opt.icon}
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-ink group-hover:text-brand transition-colors">{opt.label}</p>
                              <p className="text-xs text-ink/40">Rejoindre le groupe {opt.label}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-ink/20 group-hover:text-brand group-hover:translate-x-1 transition-all" />
                          </motion.button>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Innovative Marquee Band */}
              <div className="relative mb-12 group">
                <div className="w-full overflow-hidden relative">
                  {/* Gradient Masks for smooth entry/exit */}
                  <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                  <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ 
                      duration: 15, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="flex whitespace-nowrap py-6 items-center"
                  >
                    {[
                      { name: "LinkedIn", icon: <Globe className="w-4 h-4" />, style: "font-sans font-black tracking-tighter text-[#0077B5]" },
                      { name: "Indeed", icon: <Search className="w-4 h-4" />, style: "font-sans font-bold text-[#21409A]" },
                      { name: "Welcome to the Jungle", icon: <Rocket className="w-4 h-4" />, style: "font-serif italic font-bold text-ink" },
                      { name: "Glassdoor", icon: <CheckCircle2 className="w-4 h-4" />, style: "font-sans font-semibold text-[#0CAA41]" },
                      { name: "Monster", icon: <Zap className="w-4 h-4" />, style: "font-impact text-2xl text-[#6d4c9f]" },
                      { name: "Hired", icon: <Compass className="w-4 h-4" />, style: "font-tech text-[#f36c52]" },
                      { name: "Otta", icon: <Sparkles className="w-4 h-4" />, style: "font-display font-black text-ink" },
                      { name: "Remote.ok", icon: <Globe className="w-4 h-4" />, style: "font-mono font-bold text-[#ff4742]" },
                      { name: "We Work Remotely", icon: <MapPin className="w-4 h-4" />, style: "font-serif font-bold text-[#ff0000]" },
                      // Duplicate for seamless loop
                      { name: "LinkedIn", icon: <Globe className="w-4 h-4" />, style: "font-sans font-black tracking-tighter text-[#0077B5]" },
                      { name: "Indeed", icon: <Search className="w-4 h-4" />, style: "font-sans font-bold text-[#21409A]" },
                      { name: "Welcome to the Jungle", icon: <Rocket className="w-4 h-4" />, style: "font-serif italic font-bold text-ink" },
                      { name: "Glassdoor", icon: <CheckCircle2 className="w-4 h-4" />, style: "font-sans font-semibold text-[#0CAA41]" },
                      { name: "Monster", icon: <Zap className="w-4 h-4" />, style: "font-impact text-2xl text-[#6d4c9f]" },
                      { name: "Hired", icon: <Compass className="w-4 h-4" />, style: "font-tech text-[#f36c52]" },
                      { name: "Otta", icon: <Sparkles className="w-4 h-4" />, style: "font-display font-black text-ink" },
                      { name: "Remote.ok", icon: <Globe className="w-4 h-4" />, style: "font-mono font-bold text-[#ff4742]" },
                      { name: "We Work Remotely", icon: <MapPin className="w-4 h-4" />, style: "font-serif font-bold text-[#ff0000]" }
                    ].map((board, i) => (
                      <div 
                        key={i} 
                        className="mx-12 flex items-center gap-3 group/item transition-all duration-300"
                      >
                        <div className="w-8 h-8 flex items-center justify-center text-ink/20 group-hover/item:text-brand transition-all">
                          {board.icon}
                        </div>
                        <span className={`text-lg opacity-40 group-hover/item:opacity-100 transition-all duration-300 cursor-default ${board.style}`}>
                          {board.name}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>



            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center sm:justify-end"
            >
              {/* Telegram Mockup - Responsive scaling */}
              <div 
                onClick={() => setShowPaywall(true)}
                className="relative z-10 bg-[#17212b] rounded-[2rem] shadow-[0_0_50px_rgba(255,85,0,0.1)] border border-black/5 overflow-hidden w-[260px] sm:w-[280px] md:w-[320px] transform scale-90 sm:scale-100 lg:scale-95 origin-center sm:origin-right cursor-pointer hover:border-brand/50 transition-all duration-500 group/mockup"
              >
                <div className="absolute inset-0 bg-brand/0 group-hover/mockup:bg-brand/5 transition-colors z-20" />
                {/* Header */}
                <div className="bg-[#242f3d] p-3 md:p-4 flex items-center gap-3 border-b border-black/20">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand to-[#FF885E] flex items-center justify-center text-white font-bold shadow-lg">
                    <Radar className="w-5 h-5 md:w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-[12px] md:text-[14px] leading-tight">Radar OSINT</h3>
                    <p className="text-white/40 text-[10px] md:text-[11px]">2 482 membres en ligne</p>
                  </div>
                  <div className="flex gap-3 text-white/40">
                    <Search className="w-4 h-4 md:w-5 h-5" />
                  </div>
                </div>

                {/* Chat Content */}
                <div className="h-[320px] md:h-[420px] overflow-y-auto p-3 md:p-4 space-y-4 bg-[#0e1621] custom-scrollbar">
                  {/* Message 1 */}
                  <div className="bg-[#182533] rounded-2xl p-4 border border-white/5 relative shadow-xl">
                    <span className="text-brand text-[10px] md:text-[11px] font-black uppercase tracking-widest block mb-2">Bot Intelligence</span>
                    <div className="text-white text-[11px] md:text-[13px] leading-relaxed space-y-2">
                      <p className="font-bold text-white/90">🆕 Analyste Due Diligence Senior</p>
                      <p className="flex items-center gap-2 text-white/60">
                        <span className="w-1.5 h-1.5 bg-brand rounded-full" /> S-RM | Cape Town
                      </p>
                      <p className="text-white/40 italic text-[10px] md:text-[11px]">Recherche et rédaction de rapports de conformité. Expertise risques politiques.</p>
                      <p className="text-brand truncate text-[10px] md:text-[11px] font-medium">https://www.s-rminform.com/careers/...</p>
                    </div>
                    <div className="flex justify-end mt-2">
                      <span className="text-white/20 text-[9px] md:text-[10px]">18:00 ✓✓</span>
                    </div>
                  </div>

                  {/* Message 2 */}
                  <div className="bg-[#182533] rounded-2xl p-4 border border-white/5 relative shadow-xl">
                    <div className="text-white text-[11px] md:text-[13px] leading-relaxed space-y-2">
                      <p className="font-bold text-white/90">🆕 Consultant Intelligence Éco</p>
                      <p className="flex items-center gap-2 text-white/60">
                        <span className="w-1.5 h-1.5 bg-brand rounded-full" /> ADIT | Paris, France
                      </p>
                      <p className="text-white/40 italic text-[10px] md:text-[11px]">Veille stratégique et analyse de risques pays. Master requis.</p>
                      <p className="text-brand truncate text-[10px] md:text-[11px] font-medium">https://adit.fr/recrutement/...</p>
                    </div>
                    <div className="flex justify-end mt-2">
                      <span className="text-white/20 text-[9px] md:text-[10px]">18:01 ✓✓</span>
                    </div>
                  </div>
                </div>

                {/* Input Bar */}
                <div className="bg-[#17212b] p-3 flex items-center gap-3 border-t border-black/20">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-ink/40 text-[10px] font-bold">AE</div>
                  <div className="flex-1 bg-slate-50 rounded-full px-4 py-2 flex items-center">
                    <span className="text-ink/20 text-xs">Écrire un message...</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white shadow-lg shadow-brand/20">
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand/20 rounded-full blur-[100px] -z-10" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-[100px] -z-10" />
            </motion.div>
          </div>
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
                <h3 className="text-xl font-bold mb-4 text-ink">Curation Hybride</h3>
                <p className="text-ink/60 leading-relaxed">
                  Un mélange puissant d'algorithmes de scraping et de validation manuelle par des experts en intelligence économique.
                </p>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 hover:border-brand/50 transition-all group shadow-sm">
                <div className="w-14 h-14 bg-brand/5 rounded-2xl flex items-center justify-center mb-6 border border-brand/10 group-hover:scale-110 transition-transform">
                  <Clock className="text-brand w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-ink">Rendez-vous à 18h</h3>
                <p className="text-ink/60 leading-relaxed">
                  Chaque jour à 18h00 pile, recevez votre condensé d'opportunités directement dans votre boîte mail.
                </p>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 hover:border-brand/50 transition-all group shadow-sm">
                <div className="w-14 h-14 bg-brand/5 rounded-2xl flex items-center justify-center mb-6 border border-brand/10 group-hover:scale-110 transition-transform">
                  <Mail className="text-brand w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-ink">Alertes Exclusives</h3>
                <p className="text-ink/60 leading-relaxed">
                  Accédez à des offres "cachées" ou publiées sur des réseaux spécialisés que les agrégateurs classiques ignorent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="tarifs" className="py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-ink border border-white/5 text-white rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-20 relative overflow-hidden shadow-2xl">
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 border border-brand/20 rounded-full text-brand text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6 md:mb-8">
                    <Zap className="w-4 h-4" />
                    Offre Limitée
                  </div>
                  <h2 className="font-display text-3xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight text-white">Un investissement pour votre futur.</h2>
                  <p className="text-white/50 text-lg md:text-xl mb-8 md:mb-10 leading-relaxed">
                    Rejoignez la communauté des experts OSINT les mieux informés. Pas d'engagement, juste de la valeur brute.
                  </p>
                  <ul className="space-y-4 md:space-y-5">
                    {[
                      "Accès complet au Radar pendant 3 mois",
                      "Newsletter quotidienne à 18h",
                      "Offres OSINT, IE & Due Diligence",
                      "Support prioritaire par email"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 md:gap-4 text-base md:text-lg">
                        <CheckCircle2 className="text-brand w-5 h-5 md:w-6 h-6 flex-shrink-0" />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative mt-8 lg:mt-0">
                  <div className="absolute inset-0 bg-brand/20 blur-[80px] md:blur-[100px] -z-10" />
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 text-center relative">
                    <div className="text-brand font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-4 md:mb-6">PRIX DE LANCEMENT</div>
                    <div className="flex items-baseline justify-center gap-2 mb-8 md:mb-10">
                      <span className="text-6xl md:text-8xl font-black tracking-tighter text-white">15€</span>
                      <span className="text-white/30 font-bold text-lg md:text-xl">/ 3 mois</span>
                    </div>
                    <a 
                      href="https://buy.stripe.com/example"
                      className="w-full bg-brand text-white py-4 md:py-6 rounded-xl md:rounded-2xl font-black text-lg md:text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(255,85,0,0.3)] block"
                    >
                      S'ABONNER MAINTENANT
                    </a>
                    <div className="flex items-center justify-center gap-2 mt-6 md:mt-8 text-white/30 text-xs md:text-sm font-medium">
                      <ShieldCheck className="w-4 h-4" />
                      Paiement sécurisé via Stripe
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-[#0a192f] text-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center">
                  <Radar className="text-white w-6 h-6" />
                </div>
                <span className="font-display font-bold text-2xl text-white">Radar OSINT</span>
              </div>
              <p className="text-white/60 max-w-sm leading-relaxed">
                La première plateforme de veille stratégique dédiée aux métiers de l'intelligence et de l'investigation numérique.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Navigation</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><a href="#valeur" className="hover:text-brand transition-colors">Valeur</a></li>
                <li><a href="#tarifs" className="hover:text-brand transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Légal</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><a href="#" className="hover:text-brand transition-colors">Mentions Légales</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-sm">
              © {new Date().getFullYear()} Radar OSINT. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-brand hover:border-brand transition-all cursor-pointer">
                <Mail className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-lg">
        <div className="bg-white/60 backdrop-blur-2xl border border-black/5 shadow-2xl rounded-full p-1.5 flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 p-2 text-brand transition-colors">
            <Compass className="w-5 h-5" />
            <span className="text-[8px] font-mono font-black uppercase tracking-[0.2em]">Explorer</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-ink/30 hover:text-brand transition-colors">
            <Heart className="w-5 h-5" />
            <span className="text-[8px] font-mono font-black uppercase tracking-[0.2em]">Favoris</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-ink/30 hover:text-brand transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[8px] font-mono font-black uppercase tracking-[0.2em]">Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}
