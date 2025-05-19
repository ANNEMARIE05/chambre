'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bell, LogOut, Home, PlusCircle, ShoppingBag, List, Settings, 
  Menu, X, User, Calendar, DollarSign, TrendingUp, 
  Users, Search, Filter, ChevronDown, UserCheck, Crown
} from 'lucide-react';

export default function ClientLists() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  // Mock data for clients
  const [clients, setClients] = useState([
    { 
      id: 1, 
      name: 'Sophie Martin', 
      email: 'sophie.martin@email.com', 
      totalSpent: 2132750, 
      visits: 7, 
      favoriteRoom: 'Suite Royale', 
      lastVisit: '15/04/2025',
      photo: '/api/placeholder/32/32' 
    },
    { 
      id: 2, 
      name: 'Thomas Bernard', 
      email: 'thomas.bernard@email.com', 
      totalSpent: 3136780, 
      visits: 9, 
      favoriteRoom: 'Suite Deluxe', 
      lastVisit: '02/05/2025',
      photo: '/api/placeholder/32/32' 
    },
    { 
      id: 3, 
      name: 'Emma Dubois', 
      email: 'emma.dubois@email.com', 
      totalSpent: 1935250, 
      visits: 5, 
      favoriteRoom: 'Chambre Vue Mer', 
      lastVisit: '22/03/2025',
      photo: '/api/placeholder/32/32' 
    },
    { 
      id: 4, 
      name: 'Lucas Moreau', 
      email: 'lucas.moreau@email.com', 
      totalSpent: 1213850, 
      visits: 3, 
      favoriteRoom: 'Chambre Standard', 
      lastVisit: '10/02/2025',
      photo: '/api/placeholder/32/32' 
    },
    { 
      id: 5, 
      name: 'Chloé Petit', 
      email: 'chloe.petit@email.com', 
      totalSpent: 3674600, 
      visits: 12, 
      favoriteRoom: 'Suite Royale', 
      lastVisit: '05/05/2025',
      photo: '/api/placeholder/32/32' 
    },
    { 
      id: 6, 
      name: 'Louis Leroy', 
      email: 'louis.leroy@email.com', 
      totalSpent: 1607450, 
      visits: 4, 
      favoriteRoom: 'Chambre Vue Jardin', 
      lastVisit: '28/03/2025',
      photo: '/api/placeholder/32/32' 
    },
  ]);

  // Effet pour animer le chargement initial
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filtrer les clients selon le terme de recherche
  const filteredClients = clients.filter(client => {
    return client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           client.favoriteRoom.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Obtenir les 3 meilleurs clients
  const topClients = [...clients].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 3);
  
  // Statistiques des clients
  const totalClients = clients.length;
  const totalRevenue = clients.reduce((sum, client) => sum + client.totalSpent, 0);
  const totalVisits = clients.reduce((sum, client) => sum + client.visits, 0);
  const averageSpendPerVisit = totalVisits > 0 ? (totalRevenue / totalVisits).toFixed(2) : 0;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar pour mobile (hidden par défaut) */}
      <div className={`fixed inset-0 z-40 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-slate-900 bg-opacity-60 backdrop-blur-sm transition-opacity" onClick={() => setIsSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 shadow-xl transform transition-all ease-in-out duration-300">
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700/50">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center transform hover:scale-105 transition-transform duration-300 shadow-lg shadow-violet-600/20">
                <Home size={15} className="text-white" />
              </div>
              <h1 className="text-xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
                Maison d'hôte
              </h1>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto pt-5 pb-4">
            <div className="px-3 space-y-1">
              <MobileSidebarItem icon={<Home size={20} />} text="Dashboard" href="/dashboard" />
              <MobileSidebarItem icon={<List size={20} />} text="Mes Chambres" href="/dashboard/rooms" />
              <MobileSidebarItem icon={<PlusCircle size={20} />} text="Ajouter Chambre" href="/dashboard/rooms/add" />
              <MobileSidebarItem icon={<Users size={20} />} text="Clients" href="/dashboard/clients" active={true} />
              <MobileSidebarItem icon={<ShoppingBag size={20} />} text="Reservations" href="/dashboard/orders" />
              <MobileSidebarItem icon={<Calendar size={20} />} text="Nouvelle Commande" href="/dashboard/orders/create" />
              <MobileSidebarItem icon={<Settings size={20} />} text="Paramètres" href="/dashboard/settings" />
            </div>
          </nav>
          <div className="flex-shrink-0 flex border-t border-indigo-800/30 p-4">
            <button
              onClick={() => router.push('/auth/login')}
              className="flex items-center text-white hover:text-gray-200 transition-colors w-full rounded-lg hover:bg-white/5 p-2"
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-72">
          <div className={`flex flex-col h-0 flex-1 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 shadow-lg transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center h-16 flex-shrink-0 px-6 border-b border-slate-700/50">
              <div className="flex items-center justify-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center transform hover:scale-105 transition-transform duration-300 shadow-lg shadow-violet-600/20">
                  <Home size={15} className="text-white" />
                </div>
                <h1 className="text-xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
                  Maison d'hôte
                </h1>
              </div>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 shadow-xl">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/20">
                    <User size={20} className="text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Admin</p>
                    <p className="text-xs text-slate-300">Propriétaire</p>
                  </div>
                </div>
              </div>
              <nav className="flex-1 px-3 py-4 space-y-1">
                <SidebarItem icon={<Home size={20} />} text="Dashboard" href="/dashboard" />
                <SidebarItem icon={<List size={20} />} text="Mes Chambres" href="/dashboard/rooms" />
                <SidebarItem icon={<PlusCircle size={20} />} text="Ajouter Chambre" href="/dashboard/rooms/add" />
                <SidebarItem icon={<Users size={20} />} text="Clients" href="/dashboard/clients" active={true} />
                <SidebarItem icon={<ShoppingBag size={20} />} text="Reservations" href="/dashboard/orders" />
                <SidebarItem icon={<Calendar size={20} />} text="Nouvelle Commande" href="/dashboard/orders/create" />
                <SidebarItem icon={<Settings size={20} />} text="Paramètres" href="/dashboard/settings" />
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-slate-700/30 p-4">
              <button
                onClick={() => router.push('/auth/login')}
                className="flex items-center text-white hover:text-gray-200 transition-colors group w-full rounded-lg hover:bg-white/5 p-2"
              >
                <div className="p-2 rounded-md group-hover:bg-white/10 transition-colors">
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
        <div className={`relative z-10 flex-shrink-0 flex h-16 bg-white shadow-md transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <button
            type="button"
            className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Mes Clients</h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1 -translate-y-1"></span>
              </button>
              <div className="bg-gradient-to-r from-teal-100 to-teal-50 text-teal-800 pl-3 pr-4 py-1.5 rounded-full flex items-center shadow-sm border border-teal-200 hover:from-teal-50 hover:to-teal-100 transition-colors">
                <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center mr-2 shadow-sm">
                  <User size={14} />
                </div>
                <span className="text-sm font-medium">Propriétaire</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className={`flex-1 relative overflow-y-auto focus:outline-none p-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard 
              icon={<Users size={20} />} 
              title="Total Clients" 
              value={totalClients} 
              color="bg-gradient-to-br from-blue-500 to-indigo-600"
              trend={"+12% ce mois"}
            />
            <StatsCard 
              icon={<DollarSign size={20} />} 
              title="Revenu Total" 
              value={`${totalRevenue.toLocaleString()} FCFA`} 
              color="bg-gradient-to-br from-emerald-500 to-teal-600"
              trend={"+5% ce mois"}
            />
            <StatsCard 
              icon={<Calendar size={20} />} 
              title="Total Visites" 
              value={totalVisits} 
              color="bg-gradient-to-br from-amber-500 to-orange-600"
              trend={"+8% ce mois"}
            />
            <StatsCard 
              icon={<TrendingUp size={20} />} 
              title="Dépense Moyenne" 
              value={`${parseInt(averageSpendPerVisit).toLocaleString()} FCFA`} 
              color="bg-gradient-to-br from-violet-500 to-purple-600"
              trend={"+3% ce mois"}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Clients */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 lg:col-span-1">
              <div className="p-5 bg-gradient-to-r from-indigo-500 to-violet-600">
                <h2 className="text-lg font-semibold text-white flex items-center">
                  <Crown size={18} className="mr-2" />
                  Meilleurs Clients
                </h2>
                <p className="text-indigo-100 text-sm mt-1">Classement par dépenses totales</p>
              </div>
              <div className="p-4">
                {topClients.map((client, index) => (
                  <div key={client.id} className="flex items-center p-3 border-b border-gray-100 last:border-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white ${
                      index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-700'
                    }`}>
                      {index + 1}
                    </div>
                    <img src={client.photo} alt={client.name} className="w-8 h-8 rounded-full mr-3" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{client.name}</h3>
                      <p className="text-sm text-gray-500">{client.favoriteRoom}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{client.totalSpent.toLocaleString()} FCFA</p>
                      <p className="text-xs text-gray-500">{client.visits} visites</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Table */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 lg:col-span-2">
              <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <UserCheck size={18} className="mr-2 text-indigo-600" />
                  Liste des Clients
                </h2>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 md:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Rechercher un client..."
                      className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <button 
                      className="flex items-center px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setFilterOpen(!filterOpen)}
                    >
                      <Filter size={16} className="mr-1 text-gray-500" />
                      <span className="text-sm text-gray-600">Filtrer</span>
                      <ChevronDown size={14} className="ml-1 text-gray-500" />
                    </button>
                    {filterOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                        <div className="p-2">
                          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm">Dépenses (haut-bas)</button>
                          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm">Dépenses (bas-haut)</button>
                          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm">Visites (haut-bas)</button>
                          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm">Plus récents</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chambre Préférée</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visites</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dépenses</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière Visite</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredClients.map((client) => (
                      <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden">
                              <img src={client.photo} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{client.name}</div>
                              <div className="text-sm text-gray-500">{client.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700">
                            {client.favoriteRoom}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {client.visits}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">{client.totalSpent.toLocaleString()} FCFA</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {client.lastVisit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Précédent
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Suivant
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Affichage de <span className="font-medium">1</span> à <span className="font-medium">{filteredClients.length}</span> sur <span className="font-medium">{clients.length}</span> résultats
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Précédent</span>
                        {/* Chevron left icon */}
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-indigo-100">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        2
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Suivant</span>
                        {/* Chevron right icon */}
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Component pour les cartes de statistiques
function StatsCard({ icon, title, value, color, trend }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className={`p-3 rounded-lg ${color} text-white shadow-lg`}>
            {icon}
          </div>
        </div>
        <div className="flex items-baseline">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <span className="ml-2 text-xs font-medium text-green-500 bg-green-50 rounded-full px-2 py-0.5">
            {trend}
          </span>
        </div>
      </div>
    </div>
  );
}

const SidebarItem = ({ icon, text, href, active }) => (
  <a
    href={href}
    className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
      active
        ? 'bg-white/10 text-white'
        : 'text-gray-300 hover:bg-white/5 hover:text-white'
    }`}
  >
    <div className={`p-2 rounded-md ${active ? 'bg-white/10' : ''}`}>
      {icon}
    </div>
    <span className="ml-3">{text}</span>
  </a>
);

const MobileSidebarItem = ({ icon, text, href, active }) => (
  <a
    href={href}
    className={`flex items-center px-3 py-2 text-white rounded-lg transition-colors ${
      active
        ? 'bg-white/10'
        : 'hover:bg-white/5'
    }`}
  >
    {icon}
    <span className="ml-3">{text}</span>
  </a>
);