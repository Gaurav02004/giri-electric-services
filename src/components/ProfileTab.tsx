import React, { useState, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Compass, 
  Clock, 
  CheckCircle2, 
  Star, 
  AlertCircle, 
  Navigation,
  Sparkles,
  ChevronRight,
  RefreshCw,
  Play,
  Pause
} from 'lucide-react';
import { Booking } from '../types';

interface ProfileTabProps {
  bookings: Booking[];
  onShowModal: (modalConfig: { title: string; content: string; type: 'phone' | 'whatsapp' }) => void;
}

export default function ProfileTab({ bookings, onShowModal }: ProfileTabProps) {
  
  // Simulation states
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [simProgress, setSimProgress] = useState(0.15); // Percentage progress of electrician 0.0 to 1.0
  const [isSimRunning, setIsSimRunning] = useState(true);

  // Sync active booking: find the first non-completed booking, or default to the most recent booking
  useEffect(() => {
    const uncompleted = bookings.find(b => b.status !== 'Completed');
    if (uncompleted) {
      setActiveBooking(uncompleted);
    } else if (bookings.length > 0) {
      setActiveBooking(bookings[0]);
    } else {
      setActiveBooking(null);
    }
  }, [bookings]);

  // Listener to instantly trigger or reset simulator from parent controls
  useEffect(() => {
    const handleTriggerSim = () => {
      setSimProgress(0.15);
      setIsSimRunning(true);
      if (bookings.length > 0) {
        const first = bookings[0];
        setActiveBooking(first);
      }
    };

    window.addEventListener('trigger_mock_tracking', handleTriggerSim);
    return () => window.removeEventListener('trigger_mock_tracking', handleTriggerSim);
  }, [bookings]);

  // Handle the interval for simulating technician progress
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimRunning && activeBooking && activeBooking.status !== 'Completed' && simProgress < 1) {
      timer = setInterval(() => {
        setSimProgress(prev => {
          const next = prev + 0.05;
          if (next >= 1) {
            setIsSimRunning(false);
            return 1;
          }
          return next;
        });
      }, 3500); // Progress updates every 3.5 seconds
    }
    return () => clearInterval(timer);
  }, [isSimRunning, activeBooking, simProgress]);

  const handleResetSimulation = () => {
    setSimProgress(0.15);
    setIsSimRunning(true);
  };

  // Derive simulated route coordinates based on progress
  // SVG coordinates: Map size is 350w x 180h
  // Electrician starts at Office (40, 140) and ends at User House (280, 40)
  // Let's make an interesting L-shaped path with some turns!
  // Segment 1: (40, 140) -> (180, 140) [0.0 to 0.4]
  // Segment 2: (180, 140) -> (180, 40) [0.4 to 0.7]
  // Segment 3: (180, 40) -> (280, 40) [0.7 to 1.0]
  const getTechnicianXY = (prog: number) => {
    const startX = 40, startY = 140;
    const corner1X = 180, corner1Y = 140;
    const corner2X = 180, corner2Y = 40;
    const endX = 280, endY = 40;

    if (prog <= 0.4) {
      const t = prog / 0.4;
      return {
        x: startX + (corner1X - startX) * t,
        y: startY + (corner1Y - startY) * t
      };
    } else if (prog <= 0.7) {
      const t = (prog - 0.4) / 0.3;
      return {
        x: corner1X + (corner2X - corner1X) * t,
        y: corner1Y + (corner2Y - corner1Y) * t
      };
    } else {
      const t = (prog - 0.7) / 0.3;
      return {
        x: corner2X + (endX - corner2X) * t,
        y: corner2Y + (endY - corner2Y) * t
      };
    }
  };

  const techPos = getTechnicianXY(simProgress);
  const currentEta = Math.max(0, Math.ceil(8 * (1 - simProgress)));
  
  // Determine display status based on progress
  let displayStatus = 'Technician Assigned';
  if (simProgress > 0.85) {
    displayStatus = 'Arriving Now';
  } else if (simProgress > 0.15) {
    displayStatus = 'On the Way';
  }

  // Fallback default bookings list to show history if empty
  const defaultBookings: Booking[] = [
    {
      id: 'giri-past-1',
      serviceId: 'srv-switch-repair',
      serviceName: 'Switch & Socket Repair',
      servicePrice: '₹148',
      date: '2026-06-25',
      timeSlot: '12:00 PM - 03:00 PM',
      name: 'Gaurav Giri',
      phone: '9876543210',
      address: 'Flat 402, Shiv Shakti Tower, Vashi',
      status: 'Completed',
      technicianName: 'Suresh Kumar'
    },
    {
      id: 'giri-past-2',
      serviceId: 'srv-led-light',
      serviceName: 'LED Light Installation',
      servicePrice: '₹480',
      date: '2026-05-12',
      timeSlot: '09:00 AM - 12:00 PM',
      name: 'Gaurav Giri',
      phone: '9876543210',
      address: 'Flat 402, Shiv Shakti Tower, Vashi',
      status: 'Completed',
      technicianName: 'Anil Kumar'
    }
  ];

  const displayBookingsList = bookings.length > 0 ? bookings : defaultBookings;

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 pb-8 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
      
      {/* 1. Profile Dashboard Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-5 border-b border-slate-800/80 flex items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center text-slate-950 text-lg font-black shadow-lg">
            G
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
        </div>
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-wider">Welcome Back!</h3>
          <p className="text-xs text-amber-400 font-mono font-medium">gauravgiri123344@gmail.com</p>
          <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400">
            <span>Verified Customer</span>
            <span>•</span>
            <span className="text-amber-400 font-semibold">{displayBookingsList.length} Bookings</span>
          </div>
        </div>
      </div>

      {/* 2. LIVE TECHNICIAN TRACKER SECTION */}
      {activeBooking && activeBooking.status !== 'Completed' ? (
        <div className="p-4 space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-3 bg-amber-500 rounded-sm"></span>
                Live Technician Tracking
              </h3>
              <p className="text-[10px] text-slate-400">Real-time status of your electrical engineer</p>
            </div>

            {/* Sim Control Actions */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button 
                onClick={() => setIsSimRunning(!isSimRunning)}
                className={`p-1.5 rounded transition-all ${isSimRunning ? 'text-amber-400' : 'text-slate-500'}`}
                title={isSimRunning ? 'Pause GPS' : 'Resume GPS'}
              >
                {isSimRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button 
                onClick={handleResetSimulation}
                className="p-1.5 text-slate-400 hover:text-white transition-all"
                title="Reset GPS Route"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Dynamic Map Window */}
          <div className="relative bg-slate-900 rounded-2xl border border-slate-800 h-[190px] overflow-hidden shadow-inner">
            
            {/* Dark Stylized Vector Map Background (pure SVG grid) */}
            <svg className="absolute inset-0 w-full h-full text-slate-850" xmlns="http://www.w3.org/2000/svg">
              {/* Background grid */}
              <defs>
                <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(51, 65, 85, 0.15)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#map-grid)" />

              {/* Streets / Roads representation */}
              {/* Main Road */}
              <line x1="10" y1="140" x2="340" y2="140" stroke="rgba(100, 116, 139, 0.3)" strokeWidth="12" strokeLinecap="round" />
              <line x1="10" y1="140" x2="340" y2="140" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="4 4" strokeLinecap="round" />
              
              {/* Sector Link Street */}
              <line x1="180" y1="30" x2="180" y2="160" stroke="rgba(100, 116, 139, 0.3)" strokeWidth="12" strokeLinecap="round" />
              <line x1="180" y1="30" x2="180" y2="160" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="4 4" strokeLinecap="round" />

              {/* Home Alley */}
              <line x1="170" y1="40" x2="320" y2="40" stroke="rgba(100, 116, 139, 0.3)" strokeWidth="12" strokeLinecap="round" />
              <line x1="170" y1="40" x2="320" y2="40" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="4 4" strokeLinecap="round" />

              {/* Labels on Map */}
              <text x="50" y="152" fill="rgba(148, 163, 184, 0.7)" fontSize="8" fontFamily="monospace" fontWeight="bold">GIRI DEPLOY OFFICE</text>
              <text x="190" y="90" fill="rgba(148, 163, 184, 0.7)" fontSize="8" fontFamily="monospace" fontWeight="bold">VASHI LINK ST.</text>
              <text x="215" y="28" fill="rgba(148, 163, 184, 0.7)" fontSize="8" fontFamily="monospace" fontWeight="bold">SHIV SHAKTI APTS</text>

              {/* Dotted path of electrician */}
              <path 
                d="M 40 140 L 180 140 L 180 40 L 280 40" 
                fill="none" 
                stroke="#F5A623" 
                strokeWidth="2.5" 
                strokeDasharray="5 5" 
                strokeLinecap="round" 
              />
              
              {/* Starting Hub node */}
              <circle cx="40" cy="140" r="5" fill="#3B82F6" />
              <circle cx="40" cy="140" r="10" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.4" />
            </svg>

            {/* Pulsing Target User House (Destination) */}
            <div 
              className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
              style={{ left: '280px', top: '40px' }}
            >
              <span className="absolute w-5 h-5 bg-blue-500 rounded-full animate-ping opacity-60"></span>
              <div className="relative w-7 h-7 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center shadow-lg">
                <span className="text-[10px]">🏠</span>
              </div>
            </div>

            {/* Electrician Scooter / Vehicle Pin (Live Coordinate) */}
            <div 
              className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out z-10"
              style={{ left: `${techPos.x}px`, top: `${techPos.y}px` }}
            >
              <span className="absolute w-6 h-6 bg-amber-400 rounded-full animate-ping opacity-50"></span>
              <div className="relative w-8 h-8 rounded-full bg-amber-400 border-2 border-slate-950 flex items-center justify-center shadow-lg hover:scale-110 cursor-pointer">
                <span className="text-slate-950 text-xs font-black">🛵</span>
              </div>
              
              {/* Floating Name Label */}
              <span className="absolute -bottom-5 whitespace-nowrap bg-slate-950 text-[8px] font-bold text-white px-1 rounded shadow-md border border-slate-800">
                Anil (Giri Expert)
              </span>
            </div>

            {/* Bottom Overlay Status Hud inside Map */}
            <div className="absolute bottom-2 left-2 right-2 bg-slate-950/90 border border-slate-800 px-3 py-2 rounded-xl flex items-center justify-between backdrop-blur-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></div>
                <div>
                  <span className="text-[8px] uppercase text-slate-500 font-mono block">Current Status</span>
                  <span className="text-xs font-bold text-white block">{displayStatus}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[8px] uppercase text-slate-500 font-mono block">Estimated Arrival</span>
                <span className="text-xs font-black text-amber-400 block font-mono">
                  {simProgress >= 1 ? 'Arrived at destination' : `${currentEta} Minutes`}
                </span>
              </div>
            </div>
          </div>

          {/* Technician Profile Card */}
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-lg shadow-sm">
                👨🏽‍🔧
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  Anil Kumar
                  <span className="text-[9px] bg-amber-400/10 text-amber-400 font-bold px-1 rounded">Giri Gold</span>
                </h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] font-bold text-slate-200">4.9</span>
                  <span className="text-[9px] text-slate-500">(1,240 completed jobs)</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => onShowModal({
                  title: 'Simulated Outbound Phone Call',
                  content: 'Dialing Giri deployed electrician Anil Kumar at +91 91100 22334. Active location coordinate is being transmitted directly.',
                  type: 'phone'
                })}
                className="p-2 bg-slate-950 border border-slate-800 hover:border-amber-400 text-slate-300 hover:text-amber-400 rounded-lg transition-all"
                title="Call Electrician"
              >
                <Phone className="w-3.5 h-3.5 fill-slate-300/10" />
              </button>
            </div>
          </div>

          {/* Active Job detail summary */}
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1.5 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Active Job ID:</span>
              <span className="text-white">{activeBooking.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Service:</span>
              <span className="text-white font-sans font-bold text-amber-400">{activeBooking.serviceName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Time Slot:</span>
              <span className="text-white">{activeBooking.timeSlot}</span>
            </div>
          </div>

        </div>
      ) : (
        /* If no active booking, friendly empty states */
        <div className="mx-4 mt-4 p-5 bg-slate-900 border border-slate-800/80 rounded-2xl text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center text-slate-500 text-lg mx-auto">
            ⚡
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase">No active dispatches</h4>
            <p className="text-[10px] text-slate-400 mt-1">Book an electrical service category and track our certified technician instantly here.</p>
          </div>
          <button
            onClick={() => {
              // Smooth trigger dispatch from general tabs
              const event = new CustomEvent('trigger_mock_tracking');
              window.dispatchEvent(event);
            }}
            className="px-3.5 py-1.5 bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-all mx-auto block"
          >
            Launch Live GPS Demo
          </button>
        </div>
      )}

      {/* 3. BOOKING HISTORY LIST */}
      <div className="px-4 mt-5">
        <h3 className="text-xs font-black text-white uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
          <span className="w-1.5 h-3 bg-amber-500 rounded-sm"></span>
          Electrical Booking History
        </h3>

        <div className="space-y-3">
          {displayBookingsList.map((bk) => (
            <div 
              key={bk.id}
              className="bg-slate-900 border border-slate-800/80 p-3.5 rounded-xl flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-slate-500">ID: {bk.id}</span>
                <h4 className="text-xs font-bold text-white">{bk.serviceName}</h4>
                <p className="text-[10px] text-slate-400 font-mono">
                  {bk.date} | {bk.timeSlot.split(' - ')[0]}
                </p>
                {bk.technicianName && (
                  <span className="text-[9px] text-slate-500 block">
                    Assigned: <strong>{bk.technicianName.split(' ')[0]}</strong>
                  </span>
                )}
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-emerald-400 block font-mono">{bk.servicePrice}</span>
                <span className={`inline-block text-[8px] font-bold px-1.5 py-0.5 rounded uppercase mt-1.5 border ${
                  bk.status === 'Completed'
                    ? 'bg-emerald-950/30 text-emerald-400 border-emerald-500/20'
                    : 'bg-amber-400/10 text-amber-400 border-amber-500/20'
                }`}>
                  {bk.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
