
import React from 'react';
import { Store } from '../types';
import { Shield, Smartphone, Zap } from 'lucide-react';

interface StoreCardProps {
  store: Store;
  onClick: (store: Store) => void;
}

const StoreCard: React.FC<StoreCardProps> = ({ store, onClick }) => {
  return (
    <button 
      onClick={() => onClick(store)}
      className="relative w-full h-44 md:h-48 bg-white dark:bg-slate-800 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-5 border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden group text-left transition-all hover:shadow-xl active:scale-95"
    >
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl group-hover:opacity-20 transition-opacity"
        style={{ backgroundColor: store.color }}
      />
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="text-3xl bg-slate-50 dark:bg-slate-700/50 p-2.5 rounded-2xl group-hover:scale-110 transition-transform">{store.logo}</div>
          {store.tabAlerts?.LOYALTY && (
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
          )}
        </div>

        <div>
          <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight text-sm leading-tight mb-1">{store.name}</h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest line-clamp-1">{store.tagline}</p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-700/50 pt-3">
          {store.isLinked ? (
            <div className="flex items-center space-x-1.5 bg-brand-50 dark:bg-brand-900/20 px-2 py-1 rounded-lg">
              <Shield className="w-3 h-3 text-brand-600 dark:text-brand-400" />
              <span className="text-[9px] font-black text-brand-600 dark:text-brand-400 uppercase tracking-tighter">Linked</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
              <Zap className="w-3 h-3 text-slate-400" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Link Now</span>
            </div>
          )}
          {store.points && (
             <span className="text-[10px] font-mono font-bold text-slate-900 dark:text-white">{store.points} pts</span>
          )}
        </div>
      </div>
    </button>
  );
};

export default StoreCard;
