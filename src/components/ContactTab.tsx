import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  CheckCircle, 
  Send, 
  AlertOctagon,
  ShieldCheck
} from 'lucide-react';

interface ContactTabProps {
  onShowModal: (modalConfig: { title: string; content: string; type: 'phone' | 'whatsapp' }) => void;
}

export default function ContactTab({ onShowModal }: ContactTabProps) {
  const [ticketSubject, setTicketSubject] = useState('MCB tripping issue');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketMessage.trim()) return;

    setTicketSent(true);
    setTimeout(() => {
      setTicketSent(false);
      setTicketMessage('');
    }, 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 pb-8 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
      
      {/* Contact Banner Header */}
      <div className="bg-slate-900 p-5 border-b border-slate-800/80 shadow-md">
        <h2 className="text-sm font-black text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <span className="w-1.5 h-3 bg-amber-500 rounded-sm"></span>
          Emergency Support Hub
        </h2>
        <p className="text-[11px] text-slate-400">Available 24 hours a day, 7 days a week for hazardous circuit failure.</p>
      </div>

      {/* Quick Helpline Cards */}
      <div className="p-4 space-y-3">
        
        {/* Hotlines Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900 p-3.5 rounded-xl border border-rose-500/10 flex flex-col justify-between">
            <div>
              <span className="text-[8px] bg-rose-950 text-rose-400 font-bold px-1.5 py-0.5 rounded border border-rose-500/20 uppercase tracking-widest block w-fit">
                Emergency 24/7
              </span>
              <h4 className="text-xs font-bold text-white mt-2">Hazard Helpline</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Dispatches in 15 mins</p>
            </div>
            
            <button
              onClick={() => onShowModal({
                title: 'Simulated Outbound Phone Call',
                content: 'Dialing GIRI EMERGENCY HOTLINE at +91 99999 88888. The dispatch operator is routing an engineer near you immediately...',
                type: 'phone'
              })}
              className="mt-3 py-1.5 px-2 bg-rose-500 hover:bg-rose-600 text-white text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1"
            >
              <Phone className="w-3 h-3 fill-white" />
              Call Emergency
            </button>
          </div>

          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800/80 flex flex-col justify-between">
            <div>
              <span className="text-[8px] bg-slate-800 text-slate-400 font-bold px-1.5 py-0.5 rounded border border-slate-700/50 uppercase tracking-widest block w-fit">
                Support Hours
              </span>
              <h4 className="text-xs font-bold text-white mt-2">WhatsApp Desk</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Instant quotes & chat</p>
            </div>

            <button
              onClick={() => onShowModal({
                title: 'Simulated WhatsApp Chat',
                content: 'Opening secure customer desk with Giri Support. Chat started: "Hi, I have a quick electrical query..."',
                type: 'whatsapp'
              })}
              className="mt-3 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              WhatsApp Now
            </button>
          </div>
        </div>

        {/* Corporate Details */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 space-y-3.5">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Corporate Headquarters</h3>
          
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-sans">Giri Electric Services Pvt. Ltd.</strong>
                <span className="text-slate-400">Shop No 4, Giri Industrial Complex, Sector 15, Vashi, Navi Mumbai, Maharashtra - 400703</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Standard Hours: <strong className="text-white">08:00 AM - 10:00 PM (Daily)</strong></span>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>General Email: <strong className="text-white">contact@girielectric.com</strong></span>
            </div>
          </div>
        </div>

        {/* Contact Request Ticket Form */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-1.5">Leave a Message</h3>
          <p className="text-[10px] text-slate-400 mb-3.5">Need custom wiring layouts or building quotes? Describe it below and our estimator will email you within 2 hours.</p>

          <form onSubmit={handleSubmitTicket} className="space-y-3">
            <div>
              <label className="text-[9px] text-slate-400 font-bold block mb-1">Select Subject</label>
              <select
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Commercial Wiring Quote">Commercial Wiring Quote</option>
                <option value="MCB tripping issue">MCB tripping issue</option>
                <option value="Home Inverter Sizing">Home Inverter Sizing</option>
                <option value="Billing & Invoicing Query">Billing & Invoicing Query</option>
                <option value="Corporate Partnership">Corporate Partnership</option>
              </select>
            </div>

            <div>
              <label className="text-[9px] text-slate-400 font-bold block mb-1">Your Detailed Requirements</label>
              <textarea
                required
                rows={4}
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                placeholder="Specify dimensions, appliance details, or preferred brand materials (e.g. Havells, Polycab, Finolex)..."
                className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400 resize-none leading-relaxed"
              />
            </div>

            {ticketSent ? (
              <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 font-bold flex items-center justify-center gap-1.5 animate-pulse">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Message Sent! Ticket ID: #{Math.floor(1000 + Math.random() * 9000)}
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-950 hover:bg-amber-400 hover:text-slate-950 text-amber-400 hover:border-amber-400 border border-slate-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Requirements Message
              </button>
            )}
          </form>
        </div>

        {/* Safety Warning Card */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 flex items-start gap-2.5">
          <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[10px] text-slate-400 leading-relaxed">
            <strong className="text-amber-400">Hazard Safety Warning:</strong> Never attempt to repair short circuits, sparking lines, or high-voltage lines yourself. Turn off the main electrical switch and wait for a licensed Giri expert.
          </p>
        </div>

      </div>

    </div>
  );
}
