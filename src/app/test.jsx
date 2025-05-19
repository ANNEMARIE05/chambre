'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bell, LogOut, Home, PlusCircle, ShoppingBag, List, Settings, Menu, X,Search,
  User, Calendar, Users
} from 'lucide-react';
import ClientLists from './clients/page';
import SettingsPage from './settings/page';
import RoomsList from './rooms/page';
import RoomsAdd from './rooms/add/page';
import DashboardHome from './dashboardHome/page';
import ReservationsCreate from './orders/create/page';
import ReservationsList from './orders/page';

export default function Dashboard() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderMainContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardHome />;
      case 'rooms': return <RoomsList />;
      case 'rooms-add': return <RoomsAdd />;
      case 'clients': return <ClientLists />;
      case 'orders': return <ReservationsList />;
      case 'orders-create': return <ReservationsCreate />;
      case 'settings': return <SettingsPage />;
      default: return <DashboardHome />;
    }
  };

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { key: 'rooms', label: 'Mes Chambres', icon: <List size={20} /> },
    { key: 'rooms-add', label: 'Ajouter Chambre', icon: <PlusCircle size={20} /> },
    { key: 'clients', label: 'Clients', icon: <Users size={20} /> },
    { key: 'orders', label: 'Réservations', icon: <ShoppingBag size={20} /> },
    { key: 'orders-create', label: 'Nouvelle Commande', icon: <Calendar size={20} /> },
    { key: 'settings', label: 'Paramètres', icon: <Settings size={20} /> }
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar (mobile) */}
      <div className={`fixed inset-0 z-40 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
        <div className="absolute left-0 top-0 w-64 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 p-4 shadow-xl h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-white font-bold">Maison d'hôte</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="text-white">
              <X />
            </button>
          </div>
          <ul>
            {menuItems.map(item => (
              <li key={item.key}>
                <button
                  onClick={() => { setActiveTab(item.key); setIsSidebarOpen(false); }}
                  className={`flex items-center w-full px-3 py-2 text-sm rounded-md text-white hover:bg-white/10 ${activeTab === item.key ? 'bg-white/10' : ''}`}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => router.push('/auth/login')}
            className="mt-6 flex items-center w-full text-white hover:bg-white/10 px-3 py-2 rounded-md"
          >
            <LogOut size={18} className="mr-2" /> Déconnexion
          </button>
        </div>
      </div>

      {/* Sidebar (desktop) */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 text-white shadow-lg">
        <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-slate-700">
          Maison d'hôte
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li key={item.key}>
                <button
                  onClick={() => setActiveTab(item.key)}
                  className={`flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-white/10 ${activeTab === item.key ? 'bg-white/10' : ''}`}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={() => router.push('/auth/login')}
            className="flex items-center w-full px-3 py-2 text-sm hover:bg-white/10 rounded-md"
          >
            <LogOut size={18} className="mr-2" /> Déconnexion
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-white shadow lg:hidden">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu />
          </button>
          <h2 className="text-lg font-bold">{menuItems.find(item => item.key === activeTab)?.label}</h2>
          <div />
        </div>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}



