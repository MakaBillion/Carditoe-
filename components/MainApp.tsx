
import React, { useState } from 'react';
import { User, Transaction, Store, AppTab } from '../types';
import Dashboard from './Dashboard';
import WalletCard from './WalletCard';
import { Wallet, Home, Bell, Search, ArrowLeft, Settings, Github, Rocket, Sparkles } from 'lucide-react';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [showBalance, setShowBalance] = useState(true);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const [user] = useState<User>({
    id: 'u1',
    name: 'Thabo Mbeki',
    memberId: '8842 1102 9938',
    totalSaved: 1450.50,
    miCoinBalance: 342.25,
    roundUpTarget: 1.00,
    isAutoSaveEnabled: true
  });

  const [stores] = useState<Store[]>([
    {
      id: 's1',
      name: 'Pick n Pay',
      logo: '🅿️',
      color: '#003f7f',
      tagline: 'Inspired by you',
      category: 'Groceries',
      isLinked: true,
      points: 4500,
      pointsExpiring: 1200,
      tabAlerts: { 'LOYALTY': true }
    },
    {
      id: 's2',
      name: 'Shoprite',
      logo: '🛒',
      color: '#00857b',
      tagline: 'Lower prices you can trust',
      category: 'Groceries',
      isLinked: true,
      points: 8200
    },
    {
      id: 's3',
      name: 'Clicks',
      logo: '💊',
      color: '#005ca8',
      tagline: 'Feel good, pay less',
      category: 'Pharmacy',
      isLinked: false
    }
  ]);

  const [recentTransactions] = useState<Transaction[]>([
    {
      id: 't1',
      store: 'Pick n Pay',
      date: 'Today, 14:20',
      amount: 452.30,
      savings: 7.70,
      category: 'Groceries',
      type: 'RoundUp'
    },
    {
      id: 't2',
      store: 'Shoprite',
      date: 'Yesterday, 10:15',
      amount: 112.50,
      savings: 25.00,
      category: 'Groceries',
      type: 'Cashback'
    }
  ]);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return (
          <Dashboard 
            user={user}
            recentTransactions={recentTransactions}
            stores={stores}
            showBalance={showBalance}
            onToggleBalance={() => setShowBalance(!showBalance)}
            onStoreClick={(store) => {
                setSelectedStore(store);
                setActiveTab(AppTab.STORE_DETAIL);
            }}
            onViewReceipt={(tx) => {
                console.log('View receipt', tx);
            }}
          />
        );
      case AppTab.WALLET:
        return (
          <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">My Bank</h2>
            <WalletCard user={user} />
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <h3 className="font-bold mb-4">Digital Services</h3>
                <div className="grid grid-cols-3 gap-4">
                    {['Airtime', 'Data', 'Electricity'].map(s => (
                        <div key={s} className="flex flex-col items-center space-y-2">
                            <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center text-xl shadow-sm">
                                ⚡
                            </div>
                            <span className="text-[10px] font-black uppercase text-slate-500">{s}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        );
      case AppTab.STORE_DETAIL:
        return (
            <div className="p-6">
                <button onClick={() => setActiveTab(AppTab.DASHBOARD)} className="mb-4 text-brand-600 font-bold flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </button>
                <h2 className="text-3xl font-black">{selectedStore?.name}</h2>
                <p className="text-slate-500 mt-4">Detailed view for {selectedStore?.name} is coming soon.</p>
            </div>
        )
      case AppTab.PROFILE:
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight">Account & Dev</h2>
            <div className="bg-brand-600 rounded-[2rem] p-6 text-white">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Identity Status</p>
                <p className="text-xl font-black mt-1">Verified Member</p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700">
                <div className="flex items-center space-x-3 mb-4">
                    <Rocket className="w-5 h-5 text-brand-500" />
                    <h3 className="font-black uppercase text-sm">Deployment Guides</h3>
                </div>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase mb-2 flex items-center">
                            <Github className="w-3 h-3 mr-2" /> GitHub Pages
                        </h4>
                        <p className="text-xs text-slate-500 font-bold mb-3">1. Export to GitHub via AI Studio Settings.<br/>2. Enable GitHub Actions in repo settings.</p>
                        <a 
                            href="https://github.com/new" 
                            target="_blank" 
                            rel="noreferrer"
                            className="w-full py-3 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center space-x-2"
                        >
                            <span>Open GitHub</span>
                        </a>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase mb-2 flex items-center">
                            <Sparkles className="w-3 h-3 mr-2 text-brand-500" /> Vercel (Recommended)
                        </h4>
                        <p className="text-xs text-slate-500 font-bold mb-3">1. Export to GitHub.<br/>2. Import to Vercel for a searchable .vercel.app link.</p>
                        <a 
                            href="https://vercel.com/new" 
                            target="_blank" 
                            rel="noreferrer"
                            className="w-full py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center space-x-2"
                        >
                            <span>Deploy to Vercel</span>
                        </a>
                    </div>
                </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
            <p className="font-black uppercase tracking-widest">Feature Coming Soon</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 h-16 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-3">
              <div className="flex items-baseline">
                <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Cardit</span>
                <span className="text-xl font-black text-brand-500 tracking-tighter">Oe'</span>
              </div>
          </div>
          <div className="flex items-center space-x-3">
              <button className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl relative">
                  <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></div>
              </button>
          </div>
      </header>

      <main className="pt-20 pb-32">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 px-4 md:px-6 py-4 pb-8">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <NavButton 
            active={activeTab === AppTab.DASHBOARD} 
            icon={<Home className="w-6 h-6" />} 
            label="Home"
            onClick={() => setActiveTab(AppTab.DASHBOARD)} 
          />
          <NavButton 
            active={activeTab === AppTab.WALLET} 
            icon={<Wallet className="w-6 h-6" />} 
            label="Wallet"
            onClick={() => setActiveTab(AppTab.WALLET)} 
          />
          <NavButton 
            active={activeTab === AppTab.STORES} 
            icon={<Search className="w-6 h-6" />} 
            label="Discover"
            onClick={() => setActiveTab(AppTab.STORES)} 
          />
          <NavButton 
            active={activeTab === AppTab.PROFILE} 
            icon={<Settings className="w-6 h-6" />} 
            label="Settings"
            onClick={() => setActiveTab(AppTab.PROFILE)} 
          />
        </div>
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center space-y-1 transition-all ${active ? 'text-brand-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}
  >
    {icon}
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default MainApp;
