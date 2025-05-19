'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bell, LogOut, Home, Calendar, User, 
  Menu, X,  Heart
} from 'lucide-react';
import Booking from './bookings/page';
import Rooms from './rooms/page';
import Profile from './profile/page';
import Favoris from './favoris/page';
import Commandes from './commande/page';

export default function UserDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('rooms');
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Animation initiale
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Rendu du contenu principal en fonction de l'onglet actif
  const renderMainContent = () => {
    switch(activeTab) {
      case 'rooms':
        return (
          <Rooms />
        );
      case 'bookings':
        return (
          <Booking />
        );
      case 'commande':
        return (
          <Commandes />
        );
      case 'favorites':
        return (
          <Favoris />
        );
        case 'profile':
          return (
            <Profile />
          );
      default:
        return null;
    }
  };

  // Composant pour l'élément de la sidebar
  const SidebarItem = ({ icon, text, tab }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
        activeTab === tab
          ? 'bg-indigo-600 text-white'
          : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
      }`}
    >
      <div className={`p-2 rounded-md ${activeTab === tab ? 'bg-indigo-700' : ''}`}>
        {icon}
      </div>
      <span className="ml-3">{text}</span>
    </button>
  );

  // Composant pour l'élément de la sidebar mobile
  const MobileSidebarItem = ({ icon, text, tab }) => (
    <button
      onClick={() => {
        setActiveTab(tab);
        setIsSidebarOpen(false);
      }}
      className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
        activeTab === tab
          ? 'bg-indigo-600 text-white'
          : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
      }`}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar pour mobile (hidden par défaut) */}
      <div className={`fixed inset-0 z-40 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" onClick={() => setIsSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-white shadow-xl transform transition-all ease-in-out duration-300">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center transform hover:scale-105 transition-transform duration-300 shadow-lg shadow-indigo-600/20">
                <Home size={15} className="text-white" />
              </div>
              <h1 className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
                Maison d'hôte
              </h1>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center bg-gray-50 rounded-xl p-3 border border-gray-200 shadow-sm">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <User size={20} className="text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Jean Dupont</p>
                <p className="text-xs text-gray-500">Client fidèle</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto pt-5 pb-4">
            <div className="px-3 space-y-1">
              <MobileSidebarItem icon={<Home size={20} />} text="Chambres" tab="rooms" />
              <MobileSidebarItem icon={<Calendar size={20} />} text="Mes réservations" tab="bookings" />
              <MobileSidebarItem icon={<Calendar size={20} />} text="Commandes" tab="commande" />
              <MobileSidebarItem icon={<Heart size={20} />} text="Favoris" tab="favorites" />
              <MobileSidebarItem icon={<User size={20} />} text="Mon profil" tab="profile" />
            </div>
          </nav>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <button
              onClick={() => router.push('/auth/login')}
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors w-full rounded-lg hover:bg-gray-100 p-2"
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className={`flex flex-col h-0 flex-1 bg-white border-r border-gray-200 shadow-sm transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center h-16 flex-shrink-0 px-6 border-b border-gray-200">
              <div className="flex items-center justify-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center transform hover:scale-105 transition-transform duration-300 shadow-lg shadow-indigo-600/20">
                  <Home size={15} className="text-white" />
                </div>
                <h1 className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
                  Maison d'hôte
                </h1>
              </div>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center bg-gray-50 rounded-xl p-3 border border-gray-200 shadow-sm">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                    <User size={20} className="text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Jean Dupont</p>
                    <p className="text-xs text-gray-500">Client fidèle</p>
                  </div>
                </div>
              </div>
              <nav className="flex-1 px-3 py-4 space-y-1">
                <SidebarItem icon={<Home size={20} />} text="Chambres" tab="rooms" />
                <SidebarItem icon={<Calendar size={20} />} text="Mes réservations" tab="bookings" />
                <SidebarItem icon={<Calendar size={20} />} text="Commandes" tab="commande" />
                <SidebarItem icon={<Heart size={20} />} text="Favoris" tab="favorites" />
                <SidebarItem icon={<User size={20} />} text="Mon profil" tab="profile" />
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <button
                onClick={() => router.push('/auth/login')}
                className="flex items-center text-gray-700 hover:text-gray-900 transition-colors group w-full rounded-lg hover:bg-gray-100 p-2"
              >
                <div className="p-2 rounded-md group-hover:bg-gray-200 transition-colors">
                  <LogOut className="h-5 w-5" />
                </div>
                <span className="ml-3">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 h-screen overflow-auto">
        {/* Top navigation */}
        <div className={`relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <button
            type="button"
            className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                {activeTab === 'rooms' && 'Chambres disponibles'}
                {activeTab === 'bookings' && 'Mes réservations'}
                {activeTab === 'commande' && 'Nouvelle reservation'}
                {activeTab === 'favorites' && 'Mes favoris'}
                {activeTab === 'profile' && 'Mon profil'}
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1 -translate-y-1"></span>
              </button>
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 pl-3 pr-4 py-1.5 rounded-full flex items-center shadow-sm border border-indigo-200 hover:from-indigo-50 hover:to-purple-50 transition-colors">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-2 shadow-sm">
                  <User size={14} />
                </div>
                <span className="text-sm font-medium">Jean D.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className={`flex-1 relative overflow-y-auto focus:outline-none p-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}