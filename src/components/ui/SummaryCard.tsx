import React from 'react';
import { Edit2 } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}

export const SummaryCard = ({ title, onEdit, children }: SummaryCardProps) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-white/20 transition-colors">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
        <h4 className="font-['Urbanist'] text-lg font-bold text-white/80">{title}</h4>
        <button 
          onClick={onEdit}
          type="button"
          className="text-white/40 hover:text-[#A068FF] transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <span>Edit</span>
          <Edit2 size={14} />
        </button>
      </div>
      <div className="text-white/90 font-['Inter'] text-sm space-y-3">
        {children}
      </div>
    </div>
  );
};
