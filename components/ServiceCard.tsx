
import React from 'react';
import type { Service } from '../types';
import { Star, Clock } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onBook: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  return (
    <div className="flex justify-between gap-4 py-6 border-b border-slate-50 last:border-0 group">
      <div className="flex-1">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Star size={12} className="text-green-600 fill-green-600" />
          <span className="text-[11px] font-extrabold text-slate-800">{service.rating} ({service.reviews} reviews)</span>
        </div>
        
        <h3 className="font-extrabold text-base text-slate-900 mb-1 group-active:text-accent transition-colors">{service.name}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-bold text-slate-900 font-mono">₹{service.price}</span>
          <span className="text-slate-300 text-[10px]">•</span>
          <span className="text-slate-500 text-[11px] flex items-center gap-1">
             <Clock size={12} /> {service.duration}
          </span>
        </div>

        <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 pr-4">
          {service.description}
        </p>
      </div>

      <div className="w-28 relative flex-shrink-0">
        <div className="w-28 h-28 rounded-uc overflow-hidden border border-slate-50">
          <img 
            src={service.image} 
            alt={service.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onBook(service); }}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border border-slate-200 text-accent font-extrabold text-xs px-6 py-2 rounded-lg shadow-md active:bg-slate-50 transition-colors"
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;