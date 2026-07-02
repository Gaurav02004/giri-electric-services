import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ClipboardCheck, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Tag, 
  AlertCircle,
  Truck,
  Sparkles
} from 'lucide-react';
import IconRenderer from './IconRenderer';
import { ServiceItem, Booking } from '../types';

interface BookTabProps {
  services: ServiceItem[];
  preSelectedServiceId: string;
  onClearPreSelectedService: () => void;
  onAddBooking: (booking: Booking) => void;
  onNavigateTab: (tabId: string) => void;
}

export default function BookTab({ 
  services, 
  preSelectedServiceId, 
  onClearPreSelectedService, 
  onAddBooking, 
  onNavigateTab 
}: BookTabProps) {
  
  // Step indicator: 1 = Service, 2 = Date/Time, 3 = Address/Details, 4 = Review & Place
  const [step, setStep] = useState(1);

  // Form States
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || '');
  const [bookingDate, setBookingDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('09:00 AM - 12:00 PM');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerLandmark, setCustomerLandmark] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Sync with preSelectedServiceId from other screens
  useEffect(() => {
    if (preSelectedServiceId) {
      setSelectedServiceId(preSelectedServiceId);
      setStep(1); // Ensure they see selection first or can skip directly to step 2!
    }
  }, [preSelectedServiceId]);

  // Set default tomorrow date on render
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    setBookingDate(dateString);
  }, []);

  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'GIRI10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid promo code. Try "GIRI10".');
      setCouponApplied(false);
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!bookingDate) {
        alert('Please pick a date for the electrician.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
        alert('Please fill out Name, Phone, and Address.');
        return;
      }
      // Simple Indian Phone validation (10 digits)
      const phoneDigits = customerPhone.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        alert('Please enter a valid 10-digit phone number.');
        return;
      }
      setStep(4);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const calculatePrices = () => {
    // Base cost calculations
    const priceStr = selectedService?.price || '₹199';
    const baseValue = parseInt(priceStr.replace(/\D/g, ''), 10) || 199;
    const safetySurcharge = 49;
    const discount = couponApplied ? Math.round(baseValue * 0.1) : 0;
    const total = baseValue + safetySurcharge - discount;

    return {
      base: baseValue,
      surcharge: safetySurcharge,
      discount,
      total
    };
  };

  const pricing = calculatePrices();

  const handleConfirmBooking = () => {
    const newBooking: Booking = {
      id: `giri-${Math.floor(100000 + Math.random() * 900000)}`,
      serviceId: selectedServiceId,
      serviceName: selectedService.name,
      servicePrice: `₹${pricing.total}`,
      date: bookingDate,
      timeSlot: selectedSlot,
      name: customerName,
      phone: customerPhone,
      address: `${customerAddress}${customerLandmark ? `, near ${customerLandmark}` : ''}`,
      status: 'Confirmed', // Starts straight with confirmation to simulate progress immediately!
      technicianName: 'Anil Kumar (Gold Certified)',
      technicianPhone: '+91 91100 22334',
      technicianRating: 4.9,
      etaMinutes: 8
    };

    onAddBooking(newBooking);
    onClearPreSelectedService();
    setBookingSuccess(true);

    setTimeout(() => {
      setBookingSuccess(false);
      setStep(1);
      // Reset form fields
      setCustomerName('');
      setCustomerPhone('');
      setCustomerAddress('');
      setCustomerLandmark('');
      setCouponCode('');
      setCouponApplied(false);
      
      // Redirect directly to Profile to watch tracking!
      onNavigateTab('profile');
    }, 2800);
  };

  // Quick helper to format date strings nicely
  const formatDateNicely = (dateStr: string) => {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 pb-8 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent flex flex-col relative">
      
      {/* Step Progress Header */}
      <div className="bg-slate-900 p-4 border-b border-slate-800/80 shadow-md sticky top-0 z-20">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-amber-500 rounded-sm"></span>
            Book Electrician
          </h2>
          <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
            Step {step} of 4
          </span>
        </div>

        {/* Step indicator progress bar */}
        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden flex gap-0.5">
          <div className={`h-full flex-1 transition-all ${step >= 1 ? 'bg-amber-400' : 'bg-slate-800'}`}></div>
          <div className={`h-full flex-1 transition-all ${step >= 2 ? 'bg-amber-400' : 'bg-slate-800'}`}></div>
          <div className={`h-full flex-1 transition-all ${step >= 3 ? 'bg-amber-400' : 'bg-slate-800'}`}></div>
          <div className={`h-full flex-1 transition-all ${step >= 4 ? 'bg-amber-400' : 'bg-slate-800'}`}></div>
        </div>
      </div>

      {/* Booking Success Overlay */}
      {bookingSuccess && (
        <div className="absolute inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-3xl shadow-lg shadow-emerald-500/20 mb-4 animate-bounce">
            ✓
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Booking Confirmed!</h3>
          <p className="text-xs text-amber-400 mt-2 font-mono">ID: {`GIRI-${Math.floor(100000 + Math.random() * 900000)}`}</p>
          
          <div className="mt-6 bg-slate-900 border border-slate-800 p-4 rounded-xl max-w-xs w-full text-left space-y-2.5">
            <p className="text-xs text-slate-300">
              ⚡ <strong>{selectedService.name}</strong> scheduled successfully.
            </p>
            <p className="text-xs text-slate-400">
              📅 {formatDateNicely(bookingDate)} @ {selectedSlot}
            </p>
            <div className="p-2.5 bg-slate-950 border border-amber-500/10 rounded-lg flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400 animate-pulse" />
              <div className="text-[10px] text-slate-300">
                Technician <strong>Anil Kumar</strong> is assigned and packing gear.
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 mt-6 animate-pulse">
            Redirecting to Live Tracker in 2 seconds...
          </p>
        </div>
      )}

      {/* Step Contents */}
      <div className="flex-1 p-4">
        
        {/* STEP 1: SELECT SERVICE */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <IconRenderer name="Wrench" className="w-4 h-4 text-amber-400" />
                Select Electrical service
              </h3>
              <p className="text-[11px] text-slate-400">Choose the primary work you require done today:</p>
            </div>

            <div className="space-y-2.5">
              {services.map((svc) => (
                <button
                  key={svc.id}
                  onClick={() => setSelectedServiceId(svc.id)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    selectedServiceId === svc.id
                      ? 'bg-amber-400/10 border-amber-400'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      selectedServiceId === svc.id ? 'bg-amber-400 text-slate-950' : 'bg-slate-950 text-slate-400'
                    }`}>
                      <IconRenderer name={svc.iconName} className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{svc.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{svc.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pl-2">
                    <span className="text-xs font-black text-amber-400 font-mono">
                      {svc.price.split(' ')[0]}
                    </span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedServiceId === svc.id ? 'bg-amber-400 border-amber-400' : 'border-slate-600'
                    }`}>
                      {selectedServiceId === svc.id && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: CHOOSE DATE & TIME */}
        {step === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <Calendar className="w-4 h-4 text-amber-400" />
                Select Schedule
              </h3>
              <p className="text-[11px] text-slate-400">When should our certified electrician arrive at your location?</p>
            </div>

            {/* Date input wrapper */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <label className="text-[10px] text-slate-400 font-black uppercase block mb-1.5">Select Service Date</label>
              <input
                type="date"
                value={bookingDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full bg-slate-950 text-xs text-white border border-slate-800 rounded-lg p-3 focus:outline-none focus:border-amber-400 font-mono"
              />
              <p className="text-[10px] text-slate-500 mt-2">Note: Same-day dispatches are subject to technician availability.</p>
            </div>

            {/* Time Slot Selector */}
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 font-black uppercase block">Available Time Slots</label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { time: '09:00 AM - 12:00 PM', desc: 'Morning Slot' },
                  { time: '12:00 PM - 03:00 PM', desc: 'Afternoon Slot' },
                  { time: '03:00 PM - 06:00 PM', desc: 'Evening Slot' },
                  { time: '06:00 PM - 09:00 PM', desc: 'Late Night Emergency Slot' },
                ].map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedSlot === slot.time
                        ? 'bg-amber-400/10 border-amber-400'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className={`w-4 h-4 ${selectedSlot === slot.time ? 'text-amber-400' : 'text-slate-500'}`} />
                      <div>
                        <span className="text-xs font-bold text-white block">{slot.time}</span>
                        <span className="text-[9px] text-slate-500">{slot.desc}</span>
                      </div>
                    </div>
                    {selectedSlot === slot.time && (
                      <span className="text-[9px] bg-amber-400 text-slate-950 font-extrabold px-1.5 py-0.5 rounded">
                        Selected
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: ADDRESS DETAILS */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                Contact & Address Details
              </h3>
              <p className="text-[11px] text-slate-400">Giri electricians use standard GPS navigation to route to you.</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3.5">
              <div>
                <label className="text-[10px] text-slate-400 font-bold block mb-1">Customer Full Name*</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gaurav Giri"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold block mb-1">Active Contact Number (WhatsApp)*</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-semibold font-mono">+91</span>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="9876543210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-12 pr-4 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold block mb-1">Full Service Address*</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Flat No, Wing, Society Name, Street Name, Sector, Pin Code"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold block mb-1">Nearest Landmark (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Near Hanuman Temple / Metro Station"
                  value={customerLandmark}
                  onChange={(e) => setCustomerLandmark(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMATION & BILL */}
        {step === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <ClipboardCheck className="w-4 h-4 text-amber-400" />
                Review & Confirm Booking
              </h3>
              <p className="text-[11px] text-slate-400">Please review your scheduled electrical service details.</p>
            </div>

            {/* Summary Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3.5">
              <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-lg border border-slate-900">
                <div className="p-2 bg-amber-400 text-slate-950 rounded-lg">
                  <IconRenderer name={selectedService.iconName} className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{selectedService.name}</h4>
                  <span className="text-[9px] text-slate-400 font-mono">{selectedService.category}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block">Scheduled Date</span>
                  <span className="text-xs font-semibold text-white">{formatDateNicely(bookingDate)}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block">Arrival Window</span>
                  <span className="text-xs font-semibold text-white">{selectedSlot}</span>
                </div>
              </div>

              <div className="text-xs border-t border-slate-800/80 pt-3">
                <span className="text-[9px] text-slate-500 uppercase block">Service Address</span>
                <span className="text-xs text-slate-300 block leading-relaxed mt-0.5">
                  {customerName} (+91 {customerPhone}) <br />
                  {customerAddress}
                  {customerLandmark && <span className="text-slate-400"> (Landmark: {customerLandmark})</span>}
                </span>
              </div>
            </div>

            {/* Coupon Code Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
              <label className="text-[10px] text-slate-400 font-bold block mb-1">Have a promo code?</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter GIRI10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponApplied}
                  className="flex-1 bg-slate-950 text-xs border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400 font-mono uppercase"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={couponApplied}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    couponApplied
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-400 text-slate-950 hover:bg-amber-500'
                  }`}
                >
                  {couponApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
              {couponError && <p className="text-[10px] text-rose-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {couponError}</p>}
              {couponApplied && <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> GIRI10 coupon applied! 10% off service rate.</p>}
            </div>

            {/* Pricing Receipt Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>{selectedService.name} Base Cost</span>
                <span>₹{pricing.base}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Safety & Dispatch Surcharge</span>
                <span>+₹{pricing.surcharge}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>10% Promo Discount</span>
                  <span>-₹{pricing.discount}</span>
                </div>
              )}
              <div className="border-t border-slate-800 my-2 pt-2 flex justify-between text-white font-bold text-sm">
                <span className="font-sans font-bold">Estimated Total</span>
                <span className="text-emerald-400">₹{pricing.total}</span>
              </div>
              <div className="text-[9px] text-slate-500 text-center pt-1 font-sans">
                ⚠️ Pay post-service only. Zero advance deposit required.
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Step Actions Bottom Nav */}
      <div className="sticky bottom-0 bg-slate-900 p-4 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
        {step > 1 ? (
          <button
            onClick={handlePrevStep}
            className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-800 transition-all flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        ) : (
          <div /> // Empty placeholder to keep layout spaced
        )}

        {step < 4 ? (
          <button
            onClick={handleNextStep}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-xl transition-all flex items-center gap-1"
          >
            Continue
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        ) : (
          <button
            onClick={handleConfirmBooking}
            className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-black rounded-xl transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-1.5"
            id="place-booking-confirm-btn"
          >
            ⚡ PLACE SERVICE ORDER
          </button>
        )}
      </div>

    </div>
  );
}
