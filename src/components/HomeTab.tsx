import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Calendar, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  User, 
  Plus, 
  CheckCircle2,
  Wrench
} from 'lucide-react';
import Logo from './Logo';
import IconRenderer from './IconRenderer';
import { ServiceItem, ReviewItem } from '../types';

interface HomeTabProps {
  services: ServiceItem[];
  reviews: ReviewItem[];
  onAddReview: (review: Omit<ReviewItem, 'id' | 'date'>) => void;
  onNavigateTab: (tabId: string) => void;
  onSelectServiceToBook: (serviceId: string) => void;
  onShowModal: (modalConfig: { title: string; content: string; type: 'phone' | 'whatsapp' }) => void;
}

export default function HomeTab({ 
  services, 
  reviews, 
  onAddReview, 
  onNavigateTab, 
  onSelectServiceToBook,
  onShowModal 
}: HomeTabProps) {
  
  // Review form states
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [serviceUsed, setServiceUsed] = useState(services[0]?.name || 'General Repair');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    onAddReview({
      author,
      rating,
      comment,
      serviceUsed,
      verified: true
    });

    setAuthor('');
    setRating(5);
    setComment('');
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setShowReviewForm(false);
    }, 2500);
  };

  const handleQuickBook = (serviceId: string) => {
    onSelectServiceToBook(serviceId);
    onNavigateTab('book');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 pb-8 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
      
      {/* 1. Header & Brand Section */}
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 px-5 pt-6 pb-6 border-b border-slate-800/60 shadow-md">
        {/* Abstract wiring graphics background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
          <svg width="100%" height="100%">
            <path d="M10,20 Q50,60 100,20 T200,80 T300,10 T400,90" fill="none" stroke="yellow" strokeWidth="2" />
            <path d="M30,100 Q80,150 150,110 T280,180 T350,120" fill="none" stroke="cyan" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="flex items-center justify-between relative z-10">
          <Logo light={true} />
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-mono text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700/50">
              Online 24/7
            </span>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="mt-6 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase leading-tight">
            Giri Electric Services
          </h2>
          <p className="text-amber-400 font-medium text-xs mt-1 font-sans tracking-wide">
            ⚡ Fast, Reliable & Professional Electrical Solutions
          </p>
        </div>

        {/* High-Voltage Emergency Bar */}
        <div className="mt-5 bg-gradient-to-r from-amber-500/20 to-amber-600/5 border border-amber-500/30 rounded-xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black shrink-0 animate-pulse">
            ⚡
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-amber-300">Urgent Spark or MCB Outage?</h4>
            <p className="text-[10px] text-slate-300">Certified electrician dispatched within 20 mins of booking.</p>
          </div>
        </div>
      </div>

      {/* 2. Main High-Priority Action Buttons */}
      <div className="px-4 -mt-3 relative z-10">
        <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-2xl shadow-xl flex flex-col gap-3">
          
          {/* Main Book Button */}
          <button
            onClick={() => onNavigateTab('book')}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-[0.98] text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/10 transition-all flex items-center justify-center gap-2"
            id="book-service-main-btn"
          >
            <Calendar className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            BOOK AN ELECTRICIAN NOW
            <ChevronRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          </button>

          {/* Quick Contacts Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Call Now Button */}
            <button
              onClick={() => onShowModal({
                title: 'Simulated Outbound Phone Call',
                content: 'Calling Giri Electric Services dispatch Helpline at +91 98765 43210. Anil from customer support is answering...',
                type: 'phone'
              })}
              className="flex items-center justify-center gap-2 py-3 px-3 bg-slate-800 hover:bg-slate-700/80 active:scale-95 border border-slate-700/60 rounded-xl text-xs font-bold text-white transition-all shadow-sm"
              id="call-now-btn"
            >
              <Phone className="w-4 h-4 text-emerald-400 fill-emerald-400/10" />
              Call Support
            </button>

            {/* WhatsApp Button */}
            <button
              onClick={() => onShowModal({
                title: 'Simulated WhatsApp Chat',
                content: 'Opening direct chat with Giri Electric Services. Auto-sending: "Hello Giri Electric, I need to book an urgent service..."',
                type: 'whatsapp'
              })}
              className="flex items-center justify-center gap-2 py-3 px-3 bg-emerald-950/25 hover:bg-emerald-950/40 active:scale-95 border border-emerald-500/20 rounded-xl text-xs font-bold text-emerald-400 transition-all shadow-sm"
              id="whatsapp-btn"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              WhatsApp Help
            </button>
          </div>

        </div>
      </div>

      {/* 3. Service Categories Grid */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-amber-500 rounded-sm"></span>
              Core Electric Services
            </h3>
            <p className="text-[10px] text-slate-400">Professional rates, transparent quotes</p>
          </div>
          <button 
            onClick={() => onNavigateTab('services')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-0.5"
          >
            See All ({services.length})
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {services.map((svc) => (
            <div 
              key={svc.id}
              className="bg-slate-900 border border-slate-800/80 p-3.5 rounded-xl flex flex-col justify-between hover:border-amber-400/30 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-slate-950 text-amber-400 border border-slate-800 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all">
                    <IconRenderer name={svc.iconName} className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/30 px-1.5 py-0.5 rounded-md border border-emerald-500/10">
                    {svc.price.split(' ')[0]}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mt-3 group-hover:text-amber-400 transition-colors">
                  {svc.name}
                </h4>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {svc.description}
                </p>
              </div>
              
              <button
                onClick={() => handleQuickBook(svc.id)}
                className="w-full mt-3.5 py-1.5 px-2 bg-slate-950 hover:bg-amber-400 hover:text-slate-950 border border-slate-800/80 hover:border-amber-400 text-slate-300 text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1"
              >
                Book Now
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Verified Service Guarantees Card */}
      <div className="mx-4 mt-6 p-4 bg-slate-900 border border-slate-800/80 rounded-2xl">
        <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          THE GIRI SERVICE GUARANTEE
        </h4>
        <ul className="mt-3 space-y-2 text-[11px] text-slate-300">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <strong>30-Day Free Warranty</strong> on all repairs & fittings.
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <strong>Background-verified</strong> & background-checked experts only.
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <strong>No hidden charges</strong>. Pre-approved quotes before we drill.
          </li>
        </ul>
      </div>

      {/* 5. Customer Reviews Section */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-amber-500 rounded-sm"></span>
              Customer Reviews
            </h3>
            <p className="text-[10px] text-slate-400">Hear from our verified clients</p>
          </div>
          
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="text-xs font-bold text-amber-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg hover:border-amber-400/40 transition-all flex items-center gap-1"
            id="review-form-trigger"
          >
            {showReviewForm ? 'Cancel' : 'Write Review'}
            {!showReviewForm && <Plus className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Real-time Review Add Form */}
        {showReviewForm && (
          <form 
            onSubmit={handleSubmitReview}
            className="mb-4 bg-slate-900 border border-amber-400/20 p-4 rounded-xl flex flex-col gap-3 animate-fadeIn"
          >
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Share Your Experience</h4>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 font-semibold block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gaurav Giri"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400/60"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-semibold block mb-1">Service Used</label>
                <select
                  value={serviceUsed}
                  onChange={(e) => setServiceUsed(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400/60"
                >
                  {services.map((svc) => (
                    <option key={svc.id} value={svc.name}>{svc.name}</option>
                  ))}
                  <option value="General Maintenance">General Maintenance</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 font-semibold block mb-1">Rating</label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 focus:outline-none transition-transform active:scale-125"
                  >
                    <Star className={`w-5 h-5 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 font-semibold block mb-1">Review Description</label>
              <textarea
                required
                rows={3}
                placeholder="How was our service quality and speed?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400/60 resize-none"
              />
            </div>

            {reviewSubmitted ? (
              <div className="text-xs text-green-400 font-bold flex items-center justify-center gap-1.5 py-1.5 bg-green-950/20 rounded-lg border border-green-500/20">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                Thank you! Review posted instantly.
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-2 bg-amber-400 text-slate-950 hover:bg-amber-500 font-bold text-xs rounded-lg transition-all"
              >
                Submit Review
              </button>
            )}
          </form>
        )}

        {/* List of Reviews */}
        <div className="space-y-3">
          {reviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-slate-900 border border-slate-800/80 p-3.5 rounded-xl flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold text-xs">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{rev.author}</h5>
                    <span className="text-[9px] text-slate-500">{rev.date}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                  {rev.verified && (
                    <span className="text-[8px] bg-emerald-950/35 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded ml-1 uppercase font-bold">
                      Verified User
                    </span>
                  )}
                </div>
              </div>

              <span className="text-[9px] text-amber-400 font-bold font-mono">
                Used: {rev.serviceUsed}
              </span>
              
              <p className="text-[11px] text-slate-300 italic leading-relaxed">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
