'use client'

import { useState, useEffect } from 'react';
import { 
  Bell, LogOut, Home, Calendar, ShoppingBag, 
  Menu, X, User, Heart, ChevronRight, PieChart, TrendingUp,
  Clock, Settings, Shield, Inbox, CreditCard
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  // Animation de chargement initiale
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Données factices pour le dashboard
  const stats = [
    { id: 1, name: 'Nuits réservées', value: '12', icon: <Clock className="h-5 w-5 text-blue-500" />, trend: '+8%', color: 'blue' },
    { id: 2, name: 'Dépenses totales', value: '840€', icon: <CreditCard className="h-5 w-5 text-emerald-500" />, trend: '+12%', color: 'emerald' },
    { id: 3, name: 'Programme fidélité', value: '340 pts', icon: <TrendingUp className="h-5 w-5 text-violet-500" />, trend: '+24%', color: 'violet' },
    { id: 4, name: 'Réservations', value: '3', icon: <Calendar className="h-5 w-5 text-amber-500" />, trend: 'Active', color: 'amber' },
  ];

  const upcomingBookings = [
    { id: 1, room: 'Chambre Supérieure', date: '24-26 Mai', price: '240€', status: 'Confirmée', img: '/api/placeholder/120/120' },
    { id: 2, room: 'Suite Deluxe', date: '14-17 Juin', price: '480€', status: 'En attente', img: '/api/placeholder/120/120' },
    { id: 3, room: 'Villa Privée', date: '21-28 Juillet', price: '1200€', status: 'Confirmée', img: '/api/placeholder/120/120' },
  ];

  const notifications = [
    { id: 1, title: 'Réservation confirmée', desc: 'Votre réservation pour la Chambre Supérieure est confirmée', time: '30 min' },
    { id: 2, title: 'Promotion spéciale', desc: 'Profitez de -20% sur votre prochaine réservation', time: '2h' },
    { id: 3, title: 'Points fidélité', desc: '+120 points ajoutés à votre compte', time: '1j' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Overlay mobile pour le sidebar */}
      <div 
        className={`fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm transition-opacity lg:hidden ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={() => setIsSidebarOpen(false)}
      />
      
      {/* Sidebar mobile */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-br from-indigo-900 via-violet-900 to-purple-800 overflow-y-auto transform transition-transform duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center">
              <Home size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Maison d'hôte</h1>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="text-white/70 hover:text-white p-1.5 rounded-full hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Marie Laurent</p>
                <p className="text-xs text-indigo-200">Client Premium</p>
              </div>
            </div>
          </div>
        </div>

        <nav className="px-3 py-4 space-y-1">
          {[
            { icon: <PieChart size={18} />, text: "Vue d'ensemble", id: 'overview' },
            { icon: <Home size={18} />, text: "Chambres", id: 'rooms' },
            { icon: <Calendar size={18} />, text: "Réservations", id: 'bookings' },
            { icon: <ShoppingBag size={18} />, text: "Services", id: 'services' },
            { icon: <Heart size={18} />, text: "Favoris", id: 'favorites' },
            { icon: <User size={18} />, text: "Profil", id: 'profile' },
            { icon: <Settings size={18} />, text: "Paramètres", id: 'settings' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-white/15 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className={`p-1.5 rounded-md ${activeTab === item.id ? 'bg-white/10' : ''}`}>
                {item.icon}
              </div>
              <span className="ml-3 text-sm">{item.text}</span>
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link href="/auth/login" >
          <button
            className="flex items-center w-full px-3 py-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <div className="p-1.5 rounded-md">
              <LogOut size={18} />
            </div>
            <span className="ml-3 text-sm">Déconnexion</span>
          </button>
          </Link>
        </div>
      </div>

      {/* Sidebar desktop */}
      <div className={`hidden lg:block w-72 bg-gradient-to-br from-indigo-900 via-violet-900 to-purple-800 shadow-xl transform transition-all duration-500 ${
        isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <div className="h-9 w-9 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center shadow-lg">
                <Home size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">Maison d'hôte</h1>
            </div>
          </div>
          
          <div className="p-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 shadow-lg">
              <div className="flex items-center">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/20">
                  <User size={20} className="text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Marie Laurent</p>
                  <div className="flex items-center">
                    <p className="text-xs text-indigo-200">Client Premium</p>
                    <div className="ml-2 h-2 w-2 rounded-full bg-emerald-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
            {[
              { icon: <PieChart size={20} />, text: "Vue d'ensemble", id: 'overview' },
              { icon: <Home size={20} />, text: "Chambres", id: 'rooms' },
              { icon: <Calendar size={20} />, text: "Réservations", id: 'bookings' },
              { icon: <ShoppingBag size={20} />, text: "Services", id: 'services' },
              { icon: <Heart size={20} />, text: "Favoris", id: 'favorites' },
              { icon: <User size={20} />, text: "Profil", id: 'profile' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-white/15 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className={`p-2 rounded-md ${activeTab === item.id ? 'bg-white/10' : ''}`}>
                  {item.icon}
                </div>
                <span className="ml-3">{item.text}</span>
                {activeTab === item.id && (
                  <ChevronRight size={16} className="ml-auto text-white/70" />
                )}
              </button>
            ))}
          </nav>
          
          <div className="p-4 border-t border-white/10">
            <Link href="/auth/login">
            <button
              className="flex items-center w-full px-3 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors group"
            >
              <div className="p-2 rounded-md group-hover:bg-white/10">
                <LogOut size={20} />
              </div>
              <span className="ml-3">Déconnexion</span>
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`relative z-10 flex h-16 bg-white shadow-sm transition-all duration-500 ${
          isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}>
          <div className="flex-1 flex items-center justify-between px-4">
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
              >
                <Menu size={22} />
              </button>
            </div>
            
            <div className="lg:flex-1 flex items-center">
              <h1 className="text-xl font-semibold text-gray-800 hidden lg:block">{
                {
                  'overview': "Vue d'ensemble",
                  'rooms': "Chambres disponibles",
                  'bookings': "Mes réservations",
                  'services': "Services et prestations",
                  'favorites': "Mes favoris",
                  'profile': "Mon profil",
                  'settings': "Paramètres"
                }[activeTab]
              }</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 transition-colors relative"
                >
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                
                {/* Popup notifications */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 border border-gray-100 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.map(notif => (
                        <div key={notif.id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-medium text-gray-800">{notif.title}</h4>
                            <span className="text-xs text-gray-500">{notif.time}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{notif.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100">
                      <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                        Voir toutes les notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="hidden md:flex items-center space-x-2 pl-3 pr-4 py-1.5 rounded-full bg-indigo-50 text-indigo-800 hover:bg-indigo-100 transition-colors">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
                  <Shield size={12} className="text-white" />
                </div>
                <span className="text-sm font-medium">Premium</span>
              </div>
            </div>
          </div>
        </header>

        {/* Contenu principal */}
        <main className={`flex-1 overflow-auto p-6 bg-gray-50 transition-all duration-500 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Statistiques */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map(stat => (
                  <div 
                    key={stat.id} 
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                        <p className="mt-1 text-2xl font-semibold text-gray-800">{stat.value}</p>
                      </div>
                      <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-${stat.color}-50 text-${stat.color}-700`}>
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Réservations à venir */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <h2 className="text-lg font-medium text-gray-800">Réservations à venir</h2>
                  <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    Voir tout
                  </button>
                </div>
                <div>
                  {upcomingBookings.map((booking, i) => (
                    <div key={booking.id} className={`flex items-center p-5 ${i !== upcomingBookings.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <img src={booking.img} alt={booking.room} className="h-16 w-16 rounded-lg object-cover" />
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-800">{booking.room}</h3>
                        <p className="text-xs text-gray-500 mt-1">{booking.date}</p>
                        <div className="flex items-center mt-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            booking.status === 'Confirmée' 
                              ? 'bg-green-50 text-green-700' 
                              : 'bg-amber-50 text-amber-700'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-800">{booking.price}</p>
                        <button className="mt-2 text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                          Détails
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Autres sections */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Services recommandés */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-medium text-gray-800">Services recommandés</h2>
                  </div>
                  <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Petit-déjeuner gourmet', price: '25€', desc: 'Servi en chambre', img: '/api/placeholder/80/80' },
                      { name: 'Massage relaxant', price: '80€', desc: '60 minutes', img: '/api/placeholder/80/80' },
                      { name: 'Cours de cuisine', price: '60€', desc: '90 minutes', img: '/api/placeholder/80/80' },
                      { name: 'Location vélos', price: '15€', desc: 'Par jour', img: '/api/placeholder/80/80' },
                    ].map((service, i) => (
                      <div key={i} className="flex items-center p-3 rounded-lg border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                        <img src={service.img} alt={service.name} className="h-12 w-12 rounded-lg object-cover" />
                        <div className="ml-3 flex-1">
                          <h3 className="text-sm font-medium text-gray-800">{service.name}</h3>
                          <p className="text-xs text-gray-500">{service.desc}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-800">{service.price}</p>
                          <button className="mt-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                            Réserver
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Messages */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-medium text-gray-800">Messages</h2>
                  </div>
                  <div className="p-5 space-y-4">
                    {[
                      { sender: 'Réception', msg: 'Votre chambre est prête pour votre arrivée demain.', time: '10:25', unread: true },
                      { sender: 'Service client', msg: 'Comment s\'est passé votre séjour?', time: 'Hier', unread: false },
                      { sender: 'Restaurant', msg: 'Votre réservation pour ce soir est confirmée.', time: 'Lun', unread: false },
                    ].map((msg, i) => (
                      <div key={i} className={`p-3 rounded-lg ${msg.unread ? 'bg-indigo-50' : 'hover:bg-gray-50'} transition-colors`}>
                        <div className="flex justify-between items-start">
                          <h3 className={`text-sm font-medium ${msg.unread ? 'text-indigo-700' : 'text-gray-800'}`}>{msg.sender}</h3>
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{msg.msg}</p>
                      </div>
                    ))}
                    <button className="w-full mt-2 py-2 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-lg hover:bg-indigo-100 transition-colors">
                      Voir tous les messages
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}