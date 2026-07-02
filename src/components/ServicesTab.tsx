import React, { useState } from 'react';
import { Search, Clock, ShieldCheck, ChevronRight, Filter } from 'lucide-react';
import IconRenderer from './IconRenderer';
import { ServiceItem } from '../types';

interface ServicesTabProps {
  services: ServiceItem[];
  onSelectServiceToBook: (serviceId: string) => void;
  onNavigateTab: (tabId: string) => void;
}

export default function ServicesTab({ services, onSelectServiceToBook, onNavigateTab }: ServicesTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Derive list of unique categories
  const categories = ['All', 'Installation & Renovation', 'Appliance Fitting', 'Repairs & Fixes', 'Safety & Surge', 'Power Backup'];

  // Filter services based on category and search query
  const filteredServices = services.filter((svc) => {
    const matchesCategory = selectedCategory === 'All' || svc.category === selectedCategory;
    const matchesSearch = svc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          svc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          svc.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookService = (serviceId: string) => {
    onSelectServiceToBook(serviceId);
    onNavigateTab('book');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 pb-8 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent flex flex-col">
      
      {/* Search Header */}
      <div className="bg-slate-900 p-4 border-b border-slate-800/80 shadow-md sticky top-0 z-20">
        <h2 className="text-sm font-black text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <span className="w-1.5 h-3 bg-amber-500 rounded-sm"></span>
          Explore Electrical Services
        </h2>

        {/* Input box */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search house wiring, switch, MCB..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20"
          />
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
        </div>
      </div>

      {/* Category Pills (Horizontal Scrollable) */}
      <div className="px-4 py-3 bg-slate-950 flex gap-2 overflow-x-auto scrollbar-none shrink-0 border-b border-slate-900">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-[10px] font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/10'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800/80'
            }`}
          >
            {cat === 'All' ? '📌 All Services' : cat}
          </button>
        ))}
      </div>

      {/* Services List Grid */}
      <div className="flex-1 px-4 py-4 space-y-4">
        {filteredServices.length > 0 ? (
          filteredServices.map((svc) => (
            <div 
              key={svc.id}
              className="bg-slate-900 border border-slate-800/90 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-400/40 transition-all group"
            >
              <div>
                {/* Header of service */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 text-amber-400 border border-slate-800 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all">
                      <IconRenderer name={svc.iconName} className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono font-bold text-amber-500 uppercase tracking-widest block">
                        {svc.category}
                      </span>
                      <h3 className="text-sm font-black text-white group-hover:text-amber-400 transition-colors mt-0.5">
                        {svc.name}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-emerald-400 block font-mono">
                      {svc.price}
                    </span>
                    <span className="text-[9px] text-slate-500 block font-mono">
                      Estimated Cost
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 mt-3.5 leading-relaxed">
                  {svc.description}
                </p>

                {/* Specs */}
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-400 bg-slate-950/40 p-2.5 rounded-xl border border-slate-900">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Duration: <strong className="text-slate-200">{svc.duration}</strong></span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>Includes: <strong className="text-slate-200">30-Day Guarantee</strong></span>
                  </div>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">
                  No advance payment required
                </span>
                <button
                  onClick={() => handleBookService(svc.id)}
                  className="px-4 py-2 bg-slate-950 hover:bg-amber-400 hover:text-slate-950 text-amber-400 text-xs font-extrabold rounded-xl border border-slate-800 hover:border-amber-400 transition-all flex items-center gap-1 active:scale-95"
                >
                  Configure & Book
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))
        ) : (
          <div className="text-center py-12 px-4 flex flex-col items-center justify-center bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-3xl">🔌</span>
            <h4 className="text-sm font-bold text-white mt-3">No services match your search</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-[200px] mx-auto">
              Try searching "wiring", "socket", "inverter" or tap the categories above.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 px-3 py-1.5 bg-slate-950 border border-slate-800 hover:border-amber-400 text-xs text-amber-400 rounded-lg transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
