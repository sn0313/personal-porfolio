import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Cloud, Cpu, Database, Github, Linkedin, Mail, ExternalLink, Terminal, Code2, Server, 
  ChevronRight, Award, BookOpen, Briefcase, LayoutDashboard, Search, Bell, User, Menu, 
  X, Settings, HelpCircle, Globe, RefreshCw, MoreVertical, ChevronDown, Activity, Box, 
  ShieldCheck, Zap, Send, Shield, Monitor, Layers, Network, HardDrive, Cpu as CpuIcon
} from 'lucide-react';
import { EXPERIENCES, PROJECTS, EDUCATION, SKILLS } from './constants';

type View = 'dashboard' | 'compute' | 'storage' | 'networking' | 'ai' | 'security';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'system';
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isSystemHealthy, setIsSystemHealthy] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { text: 'Cloud System OS v2.0.4 initialized.', type: 'system' },
    { text: 'Identity verified: Ong Shi Nee. Access level: Root.', type: 'system' }
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const toggleHealth = () => {
    setIsSystemHealthy(!isSystemHealthy);
    const msg = isSystemHealthy ? 'CRITICAL: DISASTER RECOVERY PROTOCOL TRIGGERED' : 'RESOLVED: FAULT TOLERANCE RESTORED';
    setTerminalHistory(prev => [...prev, { text: msg, type: isSystemHealthy ? 'error' : 'system' }]);
  };

  useEffect(() => terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [terminalHistory]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim().toLowerCase();
    const inputLine: TerminalLine = { text: `user@portfolio:~$ ${terminalInput}`, type: 'input' };
    setTerminalHistory(prev => [...prev, inputLine]);
    setTerminalInput('');

    // Typing simulation helper
    const typeOutput = async (text: string, type: 'output' | 'error' | 'system' = 'output', delay = 15) => {
      let currentText = "";
      const id = Date.now();
      setTerminalHistory(prev => [...prev, { text: "", type, id } as any]);
      
      for (const char of text) {
        currentText += char;
        setTerminalHistory(prev => prev.map(line => (line as any).id === id ? { ...line, text: currentText } : line));
        await new Promise(r => setTimeout(r, delay));
      }
    };

    if (cmd === 'help') await typeOutput('Commands: help, ls, whoami, clear, switch <view>, status, uptime');
    else if (cmd === 'whoami') await typeOutput('Ong Shi Nee - Cloud Architect & Consultant');
    else if (cmd === 'ls') await typeOutput('nodes/ dashboard/ compute/ storage/ ai/ security/');
    else if (cmd === 'status') await typeOutput(`System: ${isSystemHealthy ? 'HEALTHY' : 'FAILOVER_ACTIVE'} | Latency: 24ms | Resources: ACTIVE`);
    else if (cmd === 'uptime') await typeOutput('Up for 34 days, 12 hours, 4 minutes');
    else if (cmd.startsWith('switch ')) {
      const v = cmd.split(' ')[1] as View;
      if (['dashboard', 'compute', 'storage', 'networking', 'ai', 'security'].includes(v)) {
        setCurrentView(v);
        await typeOutput(`Redirecting to ${v} node...`, 'system');
      } else await typeOutput('Invalid node specified.', 'error');
    }
    else if (cmd === 'clear') { setTerminalHistory([]); return; }
    else await typeOutput(`Unknown command: ${cmd}`, 'error');
  };

  return (
    <div className={`flex h-screen bg-console-bg text-slate-300 font-sans overflow-hidden ${!isSystemHealthy ? 'shake-system' : ''}`}>
      {/* Glitch Overlay for Failover */}
      {!isSystemHealthy && <div className="glitch-overlay glitch-active bg-red-500/10" />}
      
      {/* Sidebar */}
      <motion.aside 
        animate={{ width: isSidebarOpen ? 260 : 0 }}
        className="bg-console-sidebar border-r border-console-border flex flex-col overflow-hidden shadow-2xl z-50"
      >
        <div className="p-5 flex items-center gap-3 border-b border-console-border h-14 shrink-0 bg-console-header/30">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
            <Cloud className="w-5 h-5 text-oci-orange drop-shadow-[0_0_8px_rgba(242,125,38,0.5)]" />
          </motion.div>
          <span className="font-display font-bold text-white tracking-widest text-sm uppercase">Cloud Console</span>
        </div>

        <nav className="flex-1 overflow-y-auto pt-6 px-2 space-y-1">
          <NavGroup title="Main Operations">
            <NavItem id="dashboard" icon={LayoutDashboard} label="System Overview" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
            <NavItem id="compute" icon={Server} label="Experience Nodes" active={currentView === 'compute'} onClick={() => setCurrentView('compute')} />
            <NavItem id="storage" icon={Database} label="Knowledge Blocks" active={currentView === 'storage'} onClick={() => setCurrentView('storage')} />
          </NavGroup>
          <NavGroup title="Cloud Infrastructure">
            <NavItem id="networking" icon={Network} label="Project Topology" active={currentView === 'networking'} onClick={() => setCurrentView('networking')} />
            <NavItem id="ai" icon={Zap} label="Cognitive Clusters" active={currentView === 'ai'} onClick={() => setCurrentView('ai')} />
            <NavItem id="security" icon={Shield} label="Identity Vault" active={currentView === 'security'} onClick={() => setCurrentView('security')} />
          </NavGroup>
        </nav>

        <div className="p-4 border-t border-console-border bg-console-header/20">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5 hover:border-oci-orange/30 transition-all cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-oci-orange to-amber-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-oci-orange/20">OS</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate font-display">Ong Shi Nee</p>
              <p className="text-[10px] text-slate-500 font-mono">ROOT_ADMIN</p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-14 bg-console-header/90 backdrop-blur-xl border-b border-console-border flex items-center justify-between px-6 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-oci-orange">
              <Menu className="w-5 h-5" />
            </button>
            <div className={`flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border ${isSystemHealthy ? 'border-emerald-500/20 text-emerald-400' : 'border-red-500/20 text-red-400'} text-[10px] font-mono transition-colors duration-1000`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isSystemHealthy ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'} animate-pulse`} />
              SYSTEM Status: {isSystemHealthy ? 'HEALTHY' : 'FAILOVER_ACTIVE'}
            </div>
          </div>

          <div className="flex-1 max-w-xl mx-8 relative group hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-oci-orange transition-colors" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Query system assets..." 
              className="w-full bg-console-bg/50 border border-console-border rounded-lg py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-oci-orange/50 focus:bg-console-bg transition-all placeholder:text-slate-600"
            />
          </div>

          <div className="flex items-center gap-3">
            <HeaderAction icon={Terminal} onClick={() => setIsTerminalOpen(!isTerminalOpen)} active={isTerminalOpen} />
            <HeaderAction icon={Bell} badge />
            <div className="h-6 w-px bg-console-border mx-1" />
            <HeaderAction icon={Menu} />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 relative scroll-smooth bg-grid-console">
          <AnimatePresence mode="wait">
            {!isSystemHealthy && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 pointer-events-none z-[100] border-[20px] border-red-500/20 animate-pulse overflow-hidden"
              >
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-10 py-2 font-black text-xs tracking-[10px] uppercase shadow-[0_0_50px_#ef4444]">System Critical: Failover In Progress</div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {currentView === 'dashboard' && <DashboardView isSystemHealthy={isSystemHealthy} onToggleHealth={toggleHealth} />}
              {currentView === 'compute' && <ComputeView searchTerm={searchTerm} />}
              {currentView === 'storage' && <StorageView searchTerm={searchTerm} />}
              {currentView === 'networking' && <NetworkingView searchTerm={searchTerm} />}
              {currentView === 'ai' && <AIView searchTerm={searchTerm} />}
              {currentView === 'security' && <SecurityView searchTerm={searchTerm} />}
            </motion.div>
          </AnimatePresence>
        </main>

        <TerminalComponent isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} history={terminalHistory} input={terminalInput} setInput={setTerminalInput} onSubmit={handleCommand} endRef={terminalEndRef} />
      </div>
    </div>
  );
}

const NavGroup = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-4">
    <h3 className="px-5 mb-2 text-[10px] font-bold text-slate-600 uppercase tracking-[2px]">{title}</h3>
    {children}
  </div>
);

const NavItem = ({ icon: Icon, label, active, onClick }: any) => (
  <div onClick={onClick} className={`sidebar-item group ${active ? 'sidebar-item-active' : ''}`}>
    <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
    <span className="truncate">{label}</span>
    {active && <motion.div layoutId="active-pill" className="ml-auto w-1 h-4 bg-oci-orange rounded-full" />}
  </div>
);

const HeaderAction = ({ icon: Icon, onClick, active, badge }: any) => (
  <button onClick={onClick} className={`p-2.5 rounded-xl transition-all relative ${active ? 'bg-oci-orange/10 text-oci-orange' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}>
    <Icon className="w-5 h-5" />
    {badge && <span className="absolute top-2 right-2 w-2 h-2 bg-oci-orange rounded-full border-2 border-console-header" />}
  </button>
);

const DashboardView = ({ isSystemHealthy, onToggleHealth }: { isSystemHealthy: boolean, onToggleHealth: () => void }) => {
  const [liveLog, setLiveLog] = useState<{t: string, msg: string, c: string}[]>([]);
  
  useEffect(() => {
    const messages = [
      { msg: 'AUTH: Token successfully rotated', c: 'text-emerald-400' },
      { msg: 'NETWORK: Latency check stable at 12ms', c: 'text-blue-400' },
      { msg: 'COMPUTE: Scaling group healthy', c: 'text-slate-400' },
      { msg: 'SECURITY: Firewall audit complete', c: 'text-emerald-400' },
      { msg: 'AI_AGENT: Inference endpoint responding', c: 'text-amber-400' },
      { msg: 'STORAGE: Snapshot created for Knowledge node', c: 'text-blue-400' },
    ];
    
    const interval = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      const t = new Date().toLocaleTimeString([], { hour12: false });
      setLiveLog(prev => [{ t, ...randomMsg }, ...prev].slice(0, 5));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-12">
      <div className={`relative p-12 console-card overflow-hidden bg-gradient-to-br from-console-sidebar to-black border-oci-orange/20 transition-all duration-1000 ${!isSystemHealthy && 'border-red-500/40 ring-1 ring-red-500/20'}`}>
        {!isSystemHealthy && <div className="absolute inset-0 bg-red-500/5 animate-[pulse_2s_infinite]" />}
        <div className="scanline" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-oci-orange/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${isSystemHealthy ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'} text-[11px] font-black tracking-[3px] mb-8 uppercase`}>
              <span className={`w-2 h-2 rounded-full ${isSystemHealthy ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'} animate-pulse`} />
              {isSystemHealthy ? 'Operational: Node Malaysia-KUL' : 'Failover: Secondary DC Active'}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-6xl md:text-7xl font-display font-black text-white mb-8 leading-[1.1] glow-text">
              Ong Shi Nee <br/> <span className="text-oci-orange">Cloud Consultant</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-slate-400 text-xl leading-relaxed max-w-xl mb-10 font-light">
              Spearheading enterprise migration and AI transformations on OCI. Building resilient, high-availability architecture for the modern web.
            </motion.p>
            <div className="flex flex-wrap gap-4">
              <button className="console-button bg-oci-orange text-white border-none px-8 py-4 text-sm hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(242,125,38,0.3)]">Deploy Portfolio</button>
              <button onClick={onToggleHealth} className={`console-button px-8 py-4 text-sm ${!isSystemHealthy ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'hover:border-oci-orange'}`}>
                <Zap className="w-4 h-4" /> {isSystemHealthy ? 'Trigger Failover' : 'Reset System'}
              </button>
            </div>
          </div>
          <ArchitectureVisual isSystemHealthy={isSystemHealthy} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Compute Capacity" value={EXPERIENCES.length} sub="Work History Nodes" icon={CpuIcon} color="text-blue-400" />
        <StatCard label="Network Throughput" value={PROJECTS.length} sub="Live Project Points" icon={Network} color="text-oci-orange" />
        <StatCard label="Volume Storage" value={EDUCATION.length} sub="Data Blocks (Edu)" icon={HardDrive} color="text-purple-400" />
        <StatCard label="Firewall Rules" value={SKILLS.certificates.length} sub="Security Policies" icon={ShieldCheck} color="text-emerald-400" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 console-card p-10">
          <div className="flex justify-between items-center mb-10">
             <h3 className="font-display font-black text-2xl text-white uppercase tracking-tighter">Cluster Live Monitoring</h3>
             <div className="flex gap-4 text-[10px] font-black">
                <span className="flex items-center gap-1.5 text-emerald-400"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> PROD</span>
                <span className="flex items-center gap-1.5 text-oci-orange"><span className="w-1.5 h-1.5 rounded-full bg-oci-orange" /> STAGING</span>
             </div>
          </div>
          
          <div className="space-y-4 font-mono text-[10px] mb-10 min-h-[120px]">
             <AnimatePresence initial={false}>
               {liveLog.map((l, i) => (
                 <motion.div 
                   key={`${l.t}-${l.msg}`} 
                   initial={{ opacity: 0, x: -10 }} 
                   animate={{ opacity: 1, x: 0 }} 
                   className="flex gap-4 p-2 border-b border-white/5"
                 >
                   <span className="text-slate-600 shrink-0">[{l.t}]</span>
                   <span className={l.c}>{l.msg}</span>
                 </motion.div>
               ))}
             </AnimatePresence>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
             {['Resource Utilization', 'Network Throughput', 'IOPS Density'].map((item, idx) => (
               <div key={item} className="space-y-4">
                 <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                   <span>{item}</span>
                   <span className={isSystemHealthy ? "text-oci-orange" : "text-red-500"}>{(90 + idx * 3)}%</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                   <motion.div initial={{ width: 0 }} animate={{ width: `${90 + idx * 3}%` }} transition={{ duration: 2, delay: 0.5 }} className={`h-full ${isSystemHealthy ? "bg-oci-orange" : "bg-red-500"}`} />
                 </div>
               </div>
             ))}
          </div>
          <div className="mt-12 h-32 w-full flex items-end gap-1.5 px-2">
             {[...Array(40)].map((_, i) => (
               <motion.div 
                 key={i} 
                 initial={{ height: 0 }} 
                 animate={{ height: `${Math.random() * 80 + 20}%` }} 
                 transition={{ repeat: Infinity, repeatType: 'mirror', duration: 1.5 + Math.random(), delay: i * 0.03 }}
                 className={`flex-1 ${isSystemHealthy ? "bg-oci-orange/20 hover:bg-oci-orange" : "bg-red-500/20 hover:bg-red-500"} rounded-t-lg transition-all cursor-crosshair`} 
               />
             ))}
          </div>
        </div>
        
        <div className="console-card p-10 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-black text-2xl text-white mb-8 border-b border-console-border pb-4">Auth Token</h3>
            <div className="p-6 rounded-2xl bg-black border border-white/5 mb-8 group relative overflow-hidden">
              <div className="absolute inset-0 bg-oci-orange/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-[10px] font-mono text-slate-600 mb-2 font-bold">SESSION_ID_VAULT</p>
              <p className="text-xs font-mono text-oci-orange break-all font-bold tracking-tighter leading-tight">
                {isSystemHealthy ? "ocid1.user.oc1..aaaaaaaax2mx3kq7z..." : "ERR_INVALID_SESSION_RETRY_POST_FAILOVER"}
              </p>
            </div>
            <div className="space-y-5">
               {[
                 { label: 'IAM Policy', value: 'Admin-FullAccess', status: 'ACTIVE' },
                 { label: 'MFA Status', value: 'Hardware-Token', status: 'VERIFIED' },
                 { label: 'Region Affinity', value: 'Kuala Lumpur', status: 'LOCKED' }
               ].map(row => (
                 <div key={row.label} className="flex justify-between items-center text-xs group cursor-default">
                    <span className="text-slate-500 font-bold group-hover:text-slate-300 transition-colors uppercase tracking-widest text-[9px]">{row.label}</span>
                    <span className="text-white font-mono font-bold flex items-center gap-2">
                      {row.value}
                      <span className="w-1 h-1 rounded-full bg-emerald-500" />
                    </span>
                 </div>
               ))}
            </div>
          </div>
          <button className="console-button w-full mt-10 hover:glow-orange transition-all duration-300">Rotate Identity Key</button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, sub, icon: Icon, color }: any) => (
  <motion.div whileHover={{ scale: 1.02 }} className="console-card p-6 border-transparent hover:border-oci-orange/30 group">
    <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:bg-oci-orange/10 transition-colors`}>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <div className="space-y-1">
      <p className="text-[10px] uppercase tracking-widest font-bold text-slate-600">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-display font-black text-white">{value}</span>
        <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Active</span>
      </div>
      <p className="text-[10px] text-slate-500 font-medium">{sub}</p>
    </div>
  </motion.div>
);

const ArchitectureVisual = ({ isSystemHealthy }: { isSystemHealthy: boolean }) => (
  <div className="relative h-80 w-full flex items-center justify-center">
    <div className="absolute inset-0 bg-grid-console opacity-10" />
    <motion.div 
      animate={{ 
        scale: isSystemHealthy ? [1, 1.05, 1] : [1, 0.9, 1.1, 1],
        rotate: isSystemHealthy ? [0, 5, 0] : [0, -5, 5, 0]
      }} 
      transition={{ duration: 6, repeat: Infinity }} 
      className={`relative z-10 w-40 h-40 rounded-[2.5rem] ${isSystemHealthy ? 'bg-oci-orange/10 border-oci-orange' : 'bg-red-500/10 border-red-500'} border-2 flex items-center justify-center shadow-[0_0_80px_-10px_rgba(242,125,38,0.4)] transition-colors duration-1000`}
    >
       <Cloud className={`w-20 h-20 ${isSystemHealthy ? 'text-oci-orange' : 'text-red-500'} transition-colors duration-1000`} />
       
       <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
          <motion.path 
            d="M 20 20 L 100 -60" 
            stroke={isSystemHealthy ? "#F27D26" : "#ef4444"} strokeWidth="1" fill="none" opacity="0.3" 
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }}
          />
       </svg>

       <SatelliteNode icon={Server} delay={0} x={140} y={-80} label="Core Compute" active={isSystemHealthy} />
       <SatelliteNode icon={Database} delay={1} x={160} y={60} label="Object Buckets" active={isSystemHealthy} />
       <SatelliteNode icon={Zap} delay={2} x={-150} y={80} label="GPU Clusters" active={isSystemHealthy} />
       <SatelliteNode icon={Network} delay={3} x={-120} y={-100} label="Load Balancer" active={isSystemHealthy} />
    </motion.div>
  </div>
);

const SatelliteNode = ({ icon: Icon, delay, x, y, label, active }: any) => (
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1, x, y }} transition={{ delay, duration: 1 }}
    className={`absolute w-16 h-16 rounded-2xl ${active ? 'bg-white/5 border-white/10' : 'bg-red-500/5 border-red-500/40'} border flex flex-col items-center justify-center group hover:border-oci-orange/50 cursor-pointer shadow-xl backdrop-blur-md transition-all duration-1000`}
  >
    <Icon className={`w-6 h-6 ${active ? 'text-slate-400' : 'text-red-500'} group-hover:text-oci-orange transition-colors`} />
    <span className={`absolute -bottom-8 whitespace-nowrap text-[9px] font-black uppercase tracking-[2px] ${active ? 'text-slate-600' : 'text-red-800'} group-hover:text-white transition-colors`}>{label}</span>
  </motion.div>
);

const TerminalComponent = ({ isOpen, onClose, history, input, setInput, onSubmit, endRef }: any) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ height: 0 }} animate={{ height: 300 }} exit={{ height: 0 }} className="bg-black border-t border-console-border overflow-hidden flex flex-col z-50">
        <div className="flex items-center justify-between px-6 py-2 bg-zinc-900/50 border-b border-white/5">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <Terminal className="w-3 h-3 text-oci-orange" /> Cloud Shell v2.4
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg"><X className="w-3 h-3" /></button>
        </div>
        <div className="flex-1 p-6 font-mono text-[11px] overflow-y-auto scrollbar-hide space-y-1">
          {history.map((line: any, i: number) => (
            <div key={line.id || i} className={`terminal-line ${
              line.type === 'error' ? 'text-red-400 border-l-red-500' : 
              line.type === 'system' ? 'text-oci-orange border-l-oci-orange' : 
              line.type === 'input' ? 'text-white' : 'text-slate-400'
            }`}>
              {line.text}
            </div>
          ))}
          <form onSubmit={onSubmit} className="flex items-center gap-2 border-l-2 border-oci-orange pl-2">
            <span className="text-white shrink-0">user@portfolio:~$</span>
            <input autoFocus type="text" value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 bg-transparent border-none outline-none text-oci-orange p-0 font-mono text-[11px] uppercase tracking-wider" placeholder="ENTER_COMMAND_ID..." />
          </form>
          <div ref={endRef} />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* Simplify sub-views for brevity while keeping impact */
function ComputeView({ searchTerm }: any) {
  const items = EXPERIENCES.filter(e => e.role.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div><h1 className="text-3xl font-black text-white font-display uppercase tracking-widest">Compute Instances</h1><p className="text-xs text-slate-500 font-mono mt-1">Found {items.length} nodes in cluster</p></div>
        <div className="flex gap-3"><button className="console-button">Sync Resources</button><button className="console-button bg-oci-orange text-white border-none">Provision Job</button></div>
      </div>
      <div className="grid gap-4">
        {items.map((exp, i) => (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={i} className="console-card group hover:scale-[1.02] border-white/5 hover:border-oci-orange/30">
            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-console-border">
              <div className="p-8 md:w-80 shrink-0 bg-white/[0.02] group-hover:bg-oci-orange/[0.03] transition-colors relative">
                <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity"><Activity className="w-4 h-4 text-emerald-500" /></div>
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600/80 to-blue-700/80 flex items-center justify-center text-white shadow-lg shadow-blue-900/20"><Monitor className="w-6 h-6" /></div>
                   <div><p className="text-[10px] font-black text-white uppercase tracking-[2px]">{exp.period}</p><p className="text-[9px] text-emerald-500 font-mono font-bold tracking-widest uppercase">Node: ACTIVE</p></div>
                </div>
                <h3 className="text-xl font-display font-black text-white leading-tight mb-2 group-hover:text-oci-orange transition-colors">{exp.role}</h3>
                <p className="text-sm text-slate-500 font-medium mb-6 uppercase tracking-wider">{exp.company}</p>
                <div className="status-pill status-active w-fit"><span className="status-pulse" /> COMPUTE_PROD</div>
              </div>
              <div className="p-10 flex-1 relative bg-black/20">
                <div className="absolute top-4 right-8 text-[9px] font-mono font-bold text-slate-800 uppercase group-hover:text-slate-700 transition-colors">Metadata Trace: 0x{Math.random().toString(16).slice(2, 10)}</div>
                <p className="text-[11px] font-black text-slate-700 uppercase tracking-[3px] mb-6">Service Deployment Logic</p>
                <ul className="grid md:grid-cols-2 gap-x-10 gap-y-5">
                  {exp.description.map((d, j) => (
                    <li key={j} className="flex gap-4 text-xs text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed">
                       <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-oci-orange/50 group-hover:bg-oci-orange group-hover:shadow-[0_0_8px_#F27D26] shrink-0 transition-all" />
                       <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StorageView({ searchTerm }: any) {
  const items = EDUCATION.filter(e => e.institution.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-black text-white font-display uppercase tracking-widest">Storage Blocks</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {items.map((edu, i) => (
           <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.1 }} key={i} className="console-card group p-8 bg-gradient-to-br from-black/50 to-transparent">
             <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-all">
                   <Database className="w-8 h-8 text-blue-500/50 group-hover:text-blue-400" />
                </div>
                <div className="text-right"><p className="text-xs font-bold text-white mb-1 uppercase tracking-widest">{edu.period}</p><p className="text-[10px] text-slate-500 font-mono">ENCRYPTION: AES-256</p></div>
             </div>
             <h3 className="text-2xl font-black text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">{edu.institution}</h3>
             <p className="text-sm text-slate-400 mb-6">{edu.degree}</p>
             <div className="flex gap-3"><span className="status-pill status-active">Verified</span><span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400 font-bold uppercase tracking-widest">{edu.details}</span></div>
           </motion.div>
        ))}
      </div>
    </div>
  );
}

function NetworkingView({ searchTerm }: any) {
  const items = PROJECTS.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white font-display uppercase tracking-widest leading-none">VCN Topology</h1>
          <p className="text-xs text-slate-500 font-mono mt-3 uppercase tracking-widest">Global Network Mesh | 100% Connectivity</p>
        </div>
        <div className="flex flex-col items-end gap-2">
           <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-3 bg-emerald-500/50" />)}
           </div>
           <span className="text-[10px] font-mono text-emerald-500 font-bold">UPLINK: 400Gbps</span>
        </div>
      </div>

      <div className="console-card p-12 bg-black/40 border-white/5 relative h-[500px] overflow-hidden group">
         <div className="scanline" />
         <div className="absolute inset-0 bg-grid-console opacity-10" />
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
               {/* Central Hub */}
               <motion.div 
                animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-oci-orange/30 flex items-center justify-center bg-oci-orange/5"
               >
                  <div className="w-32 h-32 rounded-full border-4 border-oci-orange/20 flex items-center justify-center animate-spin-slow">
                     <div className="w-24 h-24 rounded-full border border-oci-orange/50 flex items-center justify-center">
                        <Network className="w-10 h-10 text-oci-orange" />
                     </div>
                  </div>
               </motion.div>

               {/* Project Nodes */}
               {items.map((p, i) => {
                 const angle = (i / items.length) * (Math.PI * 2);
                 const r = 200;
                 const x = Math.cos(angle) * r;
                 const y = Math.sin(angle) * r;
                 return (
                   <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, x: `calc(50% + ${x}px)`, y: `calc(50% + ${y}px)` }}
                    transition={{ delay: i * 0.1 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group/node"
                   >
                     <div className="relative">
                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none -z-10 overflow-visible">
                           <motion.line 
                             x1={200 - x} y1={200 - y} x2="200" y2="200" 
                             stroke="currentColor" strokeWidth="1" 
                             className="text-white/10 group-hover/node:text-oci-orange transition-colors"
                             initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: i * 0.1 }}
                           />
                        </svg>
                        <motion.div 
                          whileHover={{ scale: 1.2, rotate: 180 }}
                          className="w-16 h-16 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center hover:border-oci-orange transition-all cursor-pointer shadow-2xl group-hover/node:shadow-oci-orange/20"
                        >
                           <Box className="w-7 h-7 text-slate-600 group-hover/node:text-oci-orange transition-colors" />
                        </motion.div>
                        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 px-4 py-2 rounded-xl border border-white/5 opacity-0 group-hover/node:opacity-100 transition-all transform group-hover/node:-translate-y-2">
                           <span className="text-[10px] font-black text-white uppercase tracking-[4px]">{p.title}</span>
                           <div className="text-[8px] text-emerald-500 font-mono mt-1">LATENCY: 4ms</div>
                        </div>
                     </div>
                   </motion.div>
                 );
               })}
            </div>
         </div>
         <div className="absolute bottom-8 left-8">
            <h3 className="text-xl font-display font-black text-white mb-2">Interactive Deployment Map</h3>
            <p className="text-xs text-slate-500 font-mono">Hover over nodes to inspect VCN endpoints and routing tables.</p>
         </div>
      </div>

      <div className="grid gap-6">
        {items.map((p, i) => (
          <motion.div key={i} whileHover={{ x: 10 }} className="console-card group overflow-hidden border-white/5 hover:border-oci-orange/20">
             <div className="flex flex-col md:flex-row">
                <div className="md:w-80 h-56 md:h-auto bg-zinc-950 relative overflow-hidden group-hover:scale-105 transition-transform duration-700 m-3 rounded-xl border border-white/5">
                   <img src={`https://picsum.photos/seed/${p.title}/600/400`} className="w-full h-full object-cover opacity-20 group-hover:opacity-60 transition-all duration-700 brightness-50" />
                   <div className="absolute inset-0 bg-gradient-to-t from-console-bg via-transparent to-transparent" />
                   <div className="absolute top-4 left-4"><span className="status-pill status-active bg-black/80 border-emerald-500/50">ROUTING_ACTIVE</span></div>
                </div>
                <div className="flex-1 p-10 flex flex-col justify-center">
                   <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-3xl font-black text-white group-hover:text-oci-orange transition-colors uppercase tracking-tighter mb-2">{p.title}</h3>
                        <div className="flex gap-4 text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">
                           <span className="flex items-center gap-1.5"><Globe className="w-3 h-3 text-oci-orange" /> PUBLIC_EDGE</span>
                           <span className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-blue-500" /> SECURE_SUBNET</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl hover:bg-oci-orange/10 transition-colors cursor-pointer"><ExternalLink className="w-6 h-6 text-slate-500 group-hover:text-white" /></div>
                   </div>
                   <p className="text-base text-slate-400 mb-8 leading-relaxed max-w-2xl font-light">{p.description}</p>
                   <div className="flex flex-wrap gap-2 mb-10">
                      {p.tags.map(t => <span key={t} className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-slate-500 group-hover:text-oci-orange transition-all uppercase tracking-[2px]">{t}</span>)}
                   </div>
                   <div className="flex items-center gap-8">
                      <button className="console-button bg-oci-orange text-white border-none px-8 py-4 shadow-lg hover:shadow-oci-orange/20">Launch Instance</button>
                      <button className="text-xs font-black text-slate-500 hover:text-white uppercase tracking-[3px] transition-all flex items-center gap-3">Network Logs <ChevronDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform" /></button>
                   </div>
                </div>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AIView({ searchTerm }: any) {
  const items = SKILLS.ai.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-black text-white font-display uppercase tracking-widest">Cognitive Clusters</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="console-card p-8">
          <div className="flex items-center gap-4 mb-8">
             <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"><Zap className="w-6 h-6 text-amber-500" /></div>
             <h3 className="text-xl font-bold text-white uppercase tracking-widest">AI & GenAI Kernels</h3>
          </div>
          <div className="space-y-3">
             {items.map((s, i) => (
                <motion.div key={i} whileHover={{ x: 10 }} className="p-4 rounded-xl border border-white/5 bg-white/5 flex items-center justify-between group">
                   <div className="flex items-center gap-3"><CpuIcon className="w-4 h-4 text-slate-600 group-hover:text-amber-500" /><span className="text-sm text-slate-300 group-hover:text-white">{s}</span></div>
                   <span className="text-[9px] font-mono font-black text-emerald-500 transition-opacity">MODEL_ONLINE</span>
                </motion.div>
             ))}
          </div>
        </div>
        <div className="console-card p-8 bg-gradient-to-br from-amber-500/5 to-transparent">
          <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-8">System Inference Logs</h3>
          <div className="space-y-4 font-mono text-[10px]">
             {logs_mock.map((l, i) => <div key={i} className="flex gap-4 p-2 border-b border-white/5 hover:bg-white/5 transition-colors"><span className="text-slate-600 shrink-0">{l.t}</span><span className={l.c}>{l.msg}</span></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

const logs_mock = [
  { t: '12:04:22', msg: 'RAG_PIPELINE: Indexed 104 documents into Vector DB', c: 'text-blue-400' },
  { t: '12:10:05', msg: 'LLM_INFERENCE: Responding to user query "OCI Setup"', c: 'text-emerald-400' },
  { t: '12:15:59', msg: 'MODEL_DEPLOY: XGBoost production deployment finalized', c: 'text-amber-400' },
  { t: '12:20:44', msg: 'DATA_STREAM: USA House Price pipeline health: 100%', c: 'text-emerald-400' },
];

function SecurityView({ searchTerm }: any) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return p + 1;
      });
    }, 50);
  };

  const filteredCerts = SKILLS.certificates.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center text-white">
        <div>
           <h1 className="text-4xl font-black font-display uppercase tracking-widest leading-none">Identity & Security</h1>
           <p className="text-xs text-slate-500 font-mono mt-3 uppercase tracking-widest">Active Firewall | Zero-Trust Protocol</p>
        </div>
        <button onClick={startScan} disabled={isScanning} className={`console-button ${isScanning ? 'opacity-50' : ''}`}>
           {isScanning ? 'Scanning Cluster...' : 'Trigger Security Audit'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="console-card p-10 relative overflow-hidden">
           {isScanning && <div className="absolute inset-0 bg-oci-orange/5 animate-pulse" />}
           <div className="flex justify-between items-center mb-10">
              <h3 className="font-display font-black text-2xl text-white uppercase tracking-tighter">Security Posture</h3>
              <div className="status-pill status-active"><span className="status-pulse" /> OPTIMIZED</div>
           </div>
           
           <div className="space-y-8 text-white">
              {[
                { label: 'Vulnerability Index', value: '0.00%', color: 'text-emerald-500' },
                { label: 'DDoS Protection', value: 'SHIELD_ACTIVE', color: 'text-blue-500' },
                { label: 'IAM Compliance', value: '100%', color: 'text-emerald-500' },
                { label: 'Encryption Mode', value: 'AES-256-GCM', color: 'text-purple-500' }
              ].map(stat => (
                <div key={stat.label} className="group cursor-default">
                   <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                      <span>{stat.label}</span>
                      <span className={stat.color}>{stat.value}</span>
                   </div>
                   <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: '100%' }} 
                        animate={{ width: isScanning ? '40%' : '100%' }} 
                        transition={{ duration: 1.5 }}
                        className={`h-full bg-current ${stat.color}`} 
                      />
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="console-card p-10 flex flex-col items-center justify-center text-center relative overflow-hidden text-white">
           <div className="scanline" />
           <motion.div 
            animate={{ 
              rotate: isScanning ? 360 : 0,
              scale: isScanning ? [1, 1.1, 1] : 1
            }} 
            transition={{ duration: 2, repeat: isScanning ? Infinity : 0 }}
            className={`w-40 h-40 rounded-full border-4 ${isScanning ? 'border-oci-orange shadow-[0_0_50px_rgba(242,125,38,0.5)]' : 'border-white/10'} flex items-center justify-center mb-8`}
           >
              <ShieldCheck className={`w-20 h-20 ${isScanning ? 'text-oci-orange' : 'text-slate-700'}`} />
           </motion.div>
           <h3 className="text-xl font-display font-black mb-2">{isScanning ? `RE-EVALUATING: ${scanProgress}%` : 'IDENTITY_VERIFIED'}</h3>
           <p className="text-xs text-slate-500 font-mono">Biometric & Token signatures confirmed.</p>
        </div>
      </div>

      <div className="console-card p-10 bg-black/50 text-white">
        <h3 className="font-display font-black text-2xl mb-8 uppercase tracking-tighter">Verified Credentials</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert, i) => (
            <motion.div 
              key={i} whileHover={{ y: -5, x: 5 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-oci-orange/50 transition-all cursor-crosshair group flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-oci-orange/10 flex items-center justify-center shrink-0"><Shield className="w-5 h-5 text-oci-orange" /></div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Oracle Cloud Infrastructure</p>
                <p className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{cert}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
