import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Info, Wifi, Battery, Volume2, ShieldCheck } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  activeTabName: string;
  onTabChange: (tabId: string) => void;
}

export default function AndroidFrame({ children, activeTabName, onTabChange }: AndroidFrameProps) {
  const [time, setTime] = useState('12:00 PM');
  const [batteryLevel, setBatteryLevel] = useState(94);
  const [isSimulatorMode, setIsSimulatorMode] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-2 md:p-6 select-none font-sans overflow-x-hidden">
      
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Top Banner / Simulator Toggle Control */}
      <div className="w-full max-w-6xl mb-6 flex flex-col md:flex-row items-center justify-between gap-4 z-20 px-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-800 border border-slate-700 rounded-xl shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              GIRI ELECTRIC SERVICES
              <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded-md uppercase">Android UI Simulator</span>
            </h1>
            <p className="text-xs text-slate-400">Experience a high-fidelity mock Android/Flutter app wrapper with live interactive workflows.</p>
          </div>
        </div>

        {/* Display Mode Selector */}
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 shadow-inner">
          <button
            onClick={() => setIsSimulatorMode(true)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isSimulatorMode
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            Android Frame
          </button>
          <button
            onClick={() => setIsSimulatorMode(false)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              !isSimulatorMode
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
            Full Screen
          </button>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className={`w-full max-w-6xl grid grid-cols-1 ${isSimulatorMode ? 'lg:grid-cols-12' : 'grid-cols-1'} gap-8 items-start justify-center z-10 px-2 md:px-4`}>
        
        {/* Left/Main Frame Section: The Phone Simulator */}
        <div className={`${isSimulatorMode ? 'lg:col-span-6 xl:col-span-5' : 'w-full'} flex justify-center items-center`}>
          {isSimulatorMode ? (
            /* Android Smartphone Bezel Wrapper */
            <div className="relative w-[385px] h-[780px] bg-slate-950 rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[6px] border-slate-800 flex flex-col overflow-hidden ring-1 ring-slate-700/50">
              
              {/* Screen Reflection Highlights */}
              <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.04] pointer-events-none rounded-[40px] z-30"></div>
              
              {/* Dynamic Camera Notch (Hole Punch) */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-950 rounded-full border-2 border-slate-900/80 z-40 flex items-center justify-center">
                <span className="w-1 h-1 bg-blue-900/50 rounded-full"></span>
              </div>

              {/* Status Bar */}
              <div className="h-7 w-full flex items-center justify-between px-6 text-white text-[11px] font-bold z-40 bg-slate-900 select-none">
                <span>{time}</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5 items-end h-3">
                    <span className="w-0.75 h-1 bg-white rounded-2xs"></span>
                    <span className="w-0.75 h-1.5 bg-white rounded-2xs"></span>
                    <span className="w-0.75 h-2 bg-white rounded-2xs"></span>
                    <span className="w-0.75 h-2.5 bg-white rounded-2xs"></span>
                    <span className="w-0.75 h-3 bg-white rounded-2xs"></span>
                  </div>
                  <Wifi className="w-3.5 h-3.5 text-white" />
                  <span className="text-[10px] text-slate-300">5G</span>
                  <div className="flex items-center gap-1 bg-white/10 px-1 py-0.5 rounded-sm">
                    <Battery className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{batteryLevel}%</span>
                  </div>
                </div>
              </div>

              {/* App Display Canvas */}
              <div className="flex-1 w-full bg-slate-900 flex flex-col overflow-hidden relative rounded-b-[24px]">
                {children}
              </div>

              {/* Android Soft Virtual Keys */}
              <div className="h-10 w-full bg-slate-950 flex items-center justify-around px-8 z-40 border-t border-slate-900 select-none rounded-b-[38px]">
                {/* Back button */}
                <button 
                  onClick={() => onTabChange('home')}
                  className="p-1 text-slate-400 hover:text-white transition-all active:scale-75"
                  title="Back to Home"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {/* Home button */}
                <button 
                  onClick={() => onTabChange('home')}
                  className="p-1 text-slate-400 hover:text-white transition-all active:scale-75"
                  title="Home"
                >
                  <div className="w-4 h-4 rounded-full border-2 border-slate-400 hover:border-white transition-all"></div>
                </button>
                {/* App Switcher button */}
                <button 
                  onClick={() => onTabChange('profile')}
                  className="p-1 text-slate-400 hover:text-white transition-all active:scale-75"
                  title="My Profile & History"
                >
                  <div className="w-3.5 h-3.5 rounded-sm border-2 border-slate-400 hover:border-white transition-all"></div>
                </button>
              </div>

            </div>
          ) : (
            /* Full Width Responsive Viewport */
            <div className="w-full bg-slate-950 rounded-3xl p-1 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-slate-800 flex flex-col overflow-hidden min-h-[680px]">
              {children}
            </div>
          )}
        </div>

        {/* Right Section: Spec & Controller Panel (Only visible in Android Frame Simulator Mode) */}
        {isSimulatorMode && (
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-5 text-slate-300">
            
            {/* Quick Feature highlights */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700/70 p-5 rounded-2xl shadow-xl flex flex-col gap-4">
              <div className="flex items-center gap-2 text-amber-400">
                <ShieldCheck className="w-5 h-5" />
                <h2 className="text-base font-bold uppercase tracking-wider">Business Architecture Specification</h2>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight -mt-1">Giri Electric Services Mobile App UI</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                This simulated Android application is built adhering to Google’s <strong>Material 3</strong> design guidelines. Designed specifically for professional on-demand electrician deployment.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800 flex flex-col">
                  <span className="text-[10px] text-amber-400 font-black uppercase">Color Palette</span>
                  <span className="text-xs font-bold text-white mt-1">Dark Blue & Electric Yellow</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">High-contrast, professional, industrial vibe.</p>
                </div>
                <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800 flex flex-col">
                  <span className="text-[10px] text-amber-400 font-black uppercase">Interactive State</span>
                  <span className="text-xs font-bold text-white mt-1">Local Booking Engine</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Place real-time bookings stored via local persistence.</p>
                </div>
                <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800 flex flex-col">
                  <span className="text-[10px] text-amber-400 font-black uppercase">Technician Tracker</span>
                  <span className="text-xs font-bold text-white mt-1">Mock SVG GPS Map Simulator</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Tracks technician movement in real-time on screen.</p>
                </div>
                <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800 flex flex-col">
                  <span className="text-[10px] text-amber-400 font-black uppercase">Service Variety</span>
                  <span className="text-xs font-bold text-white mt-1">6 Direct Service Options</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">With interactive rate calculations and scheduling.</p>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-slate-800/80 border border-slate-700/50 p-5 rounded-2xl shadow-xl flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                Simulator Quick Testing Controls
              </h3>
              <p className="text-xs text-slate-400">Interact with these buttons to instantly trigger states inside the simulated app!</p>
              
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => onTabChange('book')}
                  className="px-3.5 py-2 bg-blue-600/20 hover:bg-blue-600/35 border border-blue-500/30 rounded-xl text-xs font-semibold text-blue-300 transition-all flex items-center gap-1.5"
                >
                  ⚡ Start Booking Flow
                </button>
                <button 
                  onClick={() => {
                    onTabChange('profile');
                    // We'll set a custom state event
                    const event = new CustomEvent('trigger_mock_tracking');
                    window.dispatchEvent(event);
                  }}
                  className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl text-xs font-semibold text-amber-300 transition-all flex items-center gap-1.5"
                >
                  🗺️ Simulate Live GPS Tracker
                </button>
                <button 
                  onClick={() => {
                    onTabChange('home');
                    const el = document.getElementById('review-form-trigger');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3.5 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-xl text-xs font-semibold text-purple-300 transition-all flex items-center gap-1.5"
                >
                  ⭐️ Submit a Verified Review
                </button>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs flex flex-col gap-2">
                <div className="font-semibold text-white flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-blue-400" />
                  How to verify the work
                </div>
                <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
                  <li>Navigate using the App's **bottom nav bar** (Home, Services, Book, Profile).</li>
                  <li>Click **"Book a Service"** from Home to pick categories, input scheduling, and confirm.</li>
                  <li>After booking, visit the **Profile** tab to view your active service status.</li>
                  <li>Witness the interactive **Technician Location Live Tracker** with responsive ETA changes.</li>
                  <li>Call or WhatsApp shortcuts will show simulated prompt triggers instantly!</li>
                </ul>
              </div>
            </div>

            {/* Android Device Metadata Specs */}
            <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono px-2">
              <span>Android API Level 34 (Upside Down Cake)</span>
              <span>Host IP: 127.0.0.1</span>
              <span>Port: 3000 (Internal Node)</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
