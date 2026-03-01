import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, 
  Cpu, 
  Database, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Terminal, 
  Code2, 
  Server, 
  ChevronRight,
  Award,
  BookOpen,
  Briefcase,
  LayoutDashboard,
  Search,
  Bell,
  User,
  Menu,
  X,
  Settings,
  HelpCircle,
  Globe,
  RefreshCw,
  MoreVertical,
  ChevronDown,
  Activity,
  Box,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { EXPERIENCES, PROJECTS, EDUCATION, SKILLS } from './constants';

type View = 'dashboard' | 'compute' | 'storage' | 'networking' | 'ai' | 'identity';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>(['Initializing Cloud Console...', 'Authenticating user: Ong Shi Nee...', 'Fetching resource metadata...', 'Ready.']);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-10), `> ${msg}`]);
  };

  const SidebarItem = ({ id, icon: Icon, label }: { id: View, icon: any, label: string }) => (
    <div 
      onClick={() => {
        setCurrentView(id);
        addLog(`Navigating to ${label} services...`);
      }}
      className={`sidebar-item ${currentView === id ? 'sidebar-item-active' : ''}`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </div>
  );

  return (
    <div className="flex h-screen bg-console-bg text-slate-300 font-sans">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 240 : 0 }}
        className="bg-console-sidebar border-r border-console-border flex flex-col overflow-hidden"
      >
        <div className="p-4 flex items-center gap-3 border-b border-console-border h-14 shrink-0">
          <div className="w-7 h-7 bg-oci-orange rounded flex items-center justify-center shrink-0">
            <Cloud className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-white tracking-tight whitespace-nowrap">OCI Console</span>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Core Services</div>
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem id="compute" icon={Server} label="Experience (Compute)" />
          <SidebarItem id="storage" icon={Database} label="Education (Storage)" />
          <SidebarItem id="networking" icon={Globe} label="Projects (Networking)" />
          
          <div className="px-4 mt-6 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Advanced Services</div>
          <SidebarItem id="ai" icon={Cpu} label="AI & Data Science" />
          <SidebarItem id="identity" icon={ShieldCheck} label="Skills & Identity" />
        </div>

        <div className="p-4 border-t border-console-border">
          <div className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/5 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-oci-orange/20 flex items-center justify-center text-oci-orange font-bold text-xs">
              OS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">Ong Shi Nee</p>
              <p className="text-[10px] text-slate-500 truncate">Cloud Consultant</p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-console-header border-b border-console-border flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-white/5 rounded transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className="text-slate-500">Region:</span>
              <span className="text-white flex items-center gap-1">
                Malaysia South (KUL) <ChevronDown className="w-3 h-3" />
              </span>
            </div>
          </div>

          <div className="flex-1 max-w-xl px-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search resources, services, and documentation" 
                className="w-full bg-console-bg border border-console-border rounded py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-oci-orange transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsTerminalOpen(!isTerminalOpen)}
              className={`p-2 hover:bg-white/5 rounded transition-colors ${isTerminalOpen ? 'text-oci-orange' : ''}`}
            >
              <Terminal className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-oci-orange rounded-full border-2 border-console-header" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-console-border mx-2" />
            <button className="p-2 hover:bg-white/5 rounded transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* View Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-grid relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto"
            >
              {currentView === 'dashboard' && <DashboardView />}
              {currentView === 'compute' && <ComputeView />}
              {currentView === 'storage' && <StorageView />}
              {currentView === 'networking' && <NetworkingView />}
              {currentView === 'ai' && <AIView />}
              {currentView === 'identity' && <IdentityView />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Cloud Shell (Terminal) */}
        <AnimatePresence>
          {isTerminalOpen && (
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 200 }}
              exit={{ height: 0 }}
              className="bg-black border-t border-console-border overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-1.5 bg-zinc-900 border-b border-white/5">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <Terminal className="w-3 h-3" />
                  Cloud Shell
                </div>
                <button onClick={() => setIsTerminalOpen(false)} className="p-1 hover:bg-white/10 rounded">
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div className="flex-1 p-4 font-mono text-xs text-emerald-500 overflow-y-auto">
                {logs.map((log, i) => (
                  <div key={i} className="mb-1">{log}</div>
                ))}
                <div className="flex items-center gap-2">
                  <span className="text-white">ongshinee@oci-console:~$</span>
                  <span className="w-2 h-4 bg-emerald-500 animate-pulse" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function DashboardView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center gap-2">
          <button className="console-button flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button className="console-button bg-oci-orange text-white border-none">
            Quick Actions
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="console-card p-6 col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Resource Status
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">OCID: portfolio.dashboard.v1</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Experiences', count: EXPERIENCES.length, status: 'Active', color: 'status-active' },
              { label: 'Projects', count: PROJECTS.length, status: 'Running', color: 'status-active' },
              { label: 'Certificates', count: SKILLS.certificates.length, status: 'Verified', color: 'status-active' },
              { label: 'Uptime', count: '99.9%', status: 'Stable', color: 'status-active' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded bg-white/5 border border-white/5">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-white mb-2">{item.count}</p>
                <span className={`status-pill ${item.color}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="console-card p-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-400" />
            Recent Events
          </h3>
          <div className="space-y-4">
            {[
              { time: '2m ago', msg: 'Navigated to Compute services' },
              { time: '15m ago', msg: 'Resource "Resume" synchronized' },
              { time: '1h ago', msg: 'Cloud Shell session started' },
            ].map((event, i) => (
              <div key={i} className="flex gap-3 text-xs">
                <span className="text-slate-500 shrink-0">{event.time}</span>
                <span className="text-slate-300">{event.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="console-card">
          <div className="px-6 py-4 border-b border-console-border bg-white/5 flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">Quick Launch</h3>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            {[
              { label: 'View Projects', icon: Box },
              { label: 'Download Resume', icon: BookOpen },
              { label: 'Contact Me', icon: Mail },
              { label: 'LinkedIn Profile', icon: Linkedin },
            ].map((action, i) => (
              <button key={i} className="flex items-center gap-3 p-3 rounded border border-console-border hover:bg-white/5 transition-colors text-left">
                <action.icon className="w-4 h-4 text-oci-orange" />
                <span className="text-xs font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="console-card p-6">
          <h3 className="font-bold text-white mb-4">Cloud Consultant Profile</h3>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg bg-oci-orange/10 border border-oci-orange/20 flex items-center justify-center text-oci-orange">
              <User className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-300 leading-relaxed">
                Computer science graduate with experience in cloud-based and AI-driven systems on Oracle Cloud Infrastructure (OCI).
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="status-pill status-active">OCI Certified</span>
                <span className="status-pill status-active">AI Specialist</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComputeView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Compute Instances</h1>
          <p className="text-xs text-slate-500 mt-1">Manage your professional work experiences as compute resources.</p>
        </div>
        <button className="console-button bg-oci-orange text-white border-none">Create Experience</button>
      </div>

      <div className="console-card">
        <table className="w-full text-left text-xs">
          <thead className="bg-white/5 border-b border-console-border text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 font-bold">Role</th>
              <th className="px-6 py-3 font-bold">Company</th>
              <th className="px-6 py-3 font-bold">Status</th>
              <th className="px-6 py-3 font-bold">Period</th>
              <th className="px-6 py-3 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-console-border">
            {EXPERIENCES.map((exp, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{exp.role}</p>
                      <p className="text-[10px] text-slate-500 font-mono">ocid1.instance.v1.{i}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-300">{exp.company}</td>
                <td className="px-6 py-4">
                  <span className="status-pill status-active">Running</span>
                </td>
                <td className="px-6 py-4 text-slate-500">{exp.period}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 hover:bg-white/10 rounded"><MoreVertical className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EXPERIENCES.map((exp, i) => (
          <div key={i} className="console-card p-6">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-oci-orange" />
              Instance Details: {exp.role}
            </h3>
            <ul className="space-y-3">
              {exp.description.map((item, j) => (
                <li key={j} className="flex gap-3 text-xs text-slate-400">
                  <div className="mt-1 w-1 h-1 rounded-full bg-oci-orange shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function StorageView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Object Storage</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EDUCATION.map((edu, i) => (
          <div key={i} className="console-card">
            <div className="px-6 py-4 border-b border-console-border bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white">{edu.institution}</h3>
              </div>
              <span className="status-pill status-active">Standard</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-slate-500 mb-1">Degree</p>
                  <p className="text-white font-medium">{edu.degree}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Period</p>
                  <p className="text-white font-medium">{edu.period}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Performance</p>
                  <p className="text-white font-medium">{edu.details}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Namespace</p>
                  <p className="text-white font-mono">edu_records</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NetworkingView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Virtual Cloud Networks (Projects)</h1>
      <div className="grid grid-cols-1 gap-6">
        {PROJECTS.map((project, i) => (
          <div key={i} className="console-card flex flex-col md:flex-row">
            <div className="w-full md:w-64 aspect-video md:aspect-auto bg-zinc-900 overflow-hidden shrink-0">
              <img 
                src={`https://picsum.photos/seed/${project.title}/400/300`} 
                alt={project.title}
                className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <span className="status-pill status-active">Available</span>
              </div>
              <p className="text-sm text-slate-400 mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <button className="console-button flex items-center gap-2">
                  <ExternalLink className="w-3 h-3" /> View Deployment
                </button>
                <button className="text-xs text-slate-500 hover:text-white transition-colors">View Logs</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">AI Services & Data Science</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="console-card p-6">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Generative AI Capabilities
          </h3>
          <div className="space-y-4">
            {SKILLS.ai.map((skill, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5">
                <span className="text-sm text-slate-300">{skill}</span>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-emerald-500 font-bold">READY</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="console-card p-6">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
            <Box className="w-4 h-4 text-blue-400" />
            Model Deployments
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded border border-console-border">
              <p className="text-xs font-bold text-white mb-1">House Price Predictor</p>
              <p className="text-[10px] text-slate-500 mb-3">Endpoint: ml.house-price.v1</p>
              <div className="flex items-center gap-4">
                <span className="status-pill status-active">Active</span>
                <span className="text-[10px] text-slate-500">Latency: 42ms</span>
              </div>
            </div>
            <div className="p-4 rounded border border-console-border">
              <p className="text-xs font-bold text-white mb-1">OCI GenAI Chatbot</p>
              <p className="text-[10px] text-slate-500 mb-3">Endpoint: ai.chatbot.rag.v2</p>
              <div className="flex items-center gap-4">
                <span className="status-pill status-active">Active</span>
                <span className="text-[10px] text-slate-500">Latency: 120ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IdentityView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Identity & Access Management (Skills)</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="console-card p-6">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Verified Skills
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {SKILLS.languages.map((skill, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded bg-white/5 border border-white/5 text-xs">
                <Code2 className="w-3 h-3 text-oci-orange" />
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="console-card p-6">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Certifications
          </h3>
          <div className="space-y-4">
            {SKILLS.certificates.map((cert, i) => (
              <div key={i} className="p-3 rounded border border-console-border flex items-center justify-between">
                <span className="text-xs text-slate-300">{cert}</span>
                <Award className="w-4 h-4 text-oci-orange" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="console-card p-6">
        <h3 className="font-bold text-white mb-4">Cloud Platform Proficiency</h3>
        <div className="space-y-4">
          {SKILLS.cloud.slice(0, 5).map((platform, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-[10px] uppercase tracking-wider">
                <span className="text-slate-400">{platform}</span>
                <span className="text-white">Expert</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '90%' }}
                  className="h-full bg-oci-orange" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
