'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bell, LogOut, Home, PlusCircle, ShoppingBag, List, Settings, 
  Menu, X, User, Calendar,  Eye, Search, Filter, ArrowUpDown 
  
} from 'lucide-react';

export default function AddRoom() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc'
  });

  // Effet pour animer le chargement initial
  useEffect(() => {
    setIsLoaded(true);
  }, []);

    // Simuler le chargement des données depuis une API
    useEffect(() => {
      // Simuler un appel API
      setTimeout(() => {
        const mockOrders = [
          {
            id: '1',
            customerName: 'Jean Dupont',
            roomName: 'Chambre Deluxe',
            date: '2025-05-15',
            checkIn: '2025-05-20',
            checkOut: '2025-05-22',
            guests: 2,
            totalPrice: 45000,
            status: 'confirmé'
          },
          {
            id: '2',
            customerName: 'Marie Leclerc',
            roomName: 'Suite Royale',
            date: '2025-05-14',
            checkIn: '2025-05-16',
            checkOut: '2025-05-19',
            guests: 3,
            totalPrice: 125000,
            status: 'en attente'
          },
          {
            id: '3',
            customerName: 'André Martin',
            roomName: 'Chambre Standard',
            date: '2025-05-10',
            checkIn: '2025-05-12',
            checkOut: '2025-05-13',
            guests: 1,
            totalPrice: 25000,
            status: 'annulé'
          },
          {
            id: '4',
            customerName: 'Sophie Traoré',
            roomName: 'Chambre Familiale',
            date: '2025-05-16',
            checkIn: '2025-06-01',
            checkOut: '2025-06-05',
            guests: 4,
            totalPrice: 180000,
            status: 'confirmé'
          },
          {
            id: '5',
            customerName: 'Moussa Diallo',
            roomName: 'Chambre Deluxe',
            date: '2025-05-12',
            checkIn: '2025-05-25',
            checkOut: '2025-05-27',
            guests: 2,
            totalPrice: 45000,
            status: 'confirmé'
          }
        ];
        setOrders(mockOrders);
        setLoading(false);
      }, 1000);
    }, []);
  
    // Logique de filtrage
    const filteredOrders = orders.filter(order => {
      const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           order.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.id.includes(searchTerm);
      
      const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  
    // Logique de tri
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  
    // Fonction de tri
    const requestSort = (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
    };
  
    // Fonction pour obtenir la classe CSS du statut
    const getStatusClass = (status) => {
      switch (status) {
        case 'confirmé':
          return 'bg-green-100 text-green-800';
        case 'en attente':
          return 'bg-yellow-100 text-yellow-800';
        case 'annulé':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };
  
    // Formater le prix en FCFA
    const formatPrice = (price) => {
      return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
    };
  

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
              <MobileSidebarItem icon={<ShoppingBag size={20} />} text="Commandes" href="/dashboard/orders" active={true} />
              <MobileSidebarItem icon={<Calendar size={20} />} text="Nouvelle Commande" href="/dashboard/orders/create" />
              <MobileSidebarItem icon={<Settings size={20} />} text="Paramètres" href="/dashboard/settings" />
            </div>
          </nav>
          <div className="flex-shrink-0 flex border-t border-indigo-800/30 p-4">
            <button
              onClick={() => router.push('/login')}
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
                <SidebarItem icon={<ShoppingBag size={20} />} text="Commandes" href="/dashboard/orders" active={true} />
                <SidebarItem icon={<Calendar size={20} />} text="Nouvelle Commande" href="/dashboard/orders/create" />
                <SidebarItem icon={<Settings size={20} />} text="Paramètres" href="/dashboard/settings" />
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-slate-700/30 p-4">
              <button
                onClick={() => router.push('/login')}
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
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
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
        <div className="sm:px-0">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-white">
                <div className="flex flex-wrap items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Liste des commandes</h2>
                  <Link
                    href="/dashboard/orders/create"
                    className="px-4 py-2 mt-2 sm:mt-0 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    + Nouvelle commande
                  </Link>
                </div>
              </div>

              {/* Filtres et recherche */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                  <div className="flex-1 flex relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Rechercher une commande..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex items-center">
                      <Filter size={18} className="text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">Statut:</span>
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="all">Tous</option>
                      <option value="confirmé">Confirmé</option>
                      <option value="en attente">En attente</option>
                      <option value="annulé">Annulé</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tableau des commandes */}
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="px-6 py-4 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent align-[-0.125em]"></div>
                    <p className="mt-2 text-gray-600">Chargement des commandes...</p>
                  </div>
                ) : sortedOrders.length === 0 ? (
                  <div className="px-6 py-12 text-center">
                    <ShoppingBag size={48} className="mx-auto text-gray-400" />
                    <p className="mt-2 text-lg font-medium text-gray-900">Aucune commande trouvée</p>
                    <p className="mt-1 text-gray-500">Aucune commande ne correspond à vos critères de recherche.</p>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => requestSort('id')}
                        >
                          <div className="flex items-center">
                            ID
                            <ArrowUpDown size={14} className="ml-1" />
                          </div>
                        </th>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => requestSort('customerName')}
                        >
                          <div className="flex items-center">
                            Client
                            <ArrowUpDown size={14} className="ml-1" />
                          </div>
                        </th>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => requestSort('roomName')}
                        >
                          <div className="flex items-center">
                            Chambre
                            <ArrowUpDown size={14} className="ml-1" />
                          </div>
                        </th>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => requestSort('checkIn')}
                        >
                          <div className="flex items-center">
                            Arrivée
                            <ArrowUpDown size={14} className="ml-1" />
                          </div>
                        </th>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => requestSort('checkOut')}
                        >
                          <div className="flex items-center">
                            Départ
                            <ArrowUpDown size={14} className="ml-1" />
                          </div>
                        </th>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => requestSort('totalPrice')}
                        >
                          <div className="flex items-center">
                            Prix total
                            <ArrowUpDown size={14} className="ml-1" />
                          </div>
                        </th>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => requestSort('status')}
                        >
                          <div className="flex items-center">
                            Statut
                            <ArrowUpDown size={14} className="ml-1" />
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sortedOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.customerName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.roomName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(order.checkIn).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(order.checkOut).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatPrice(order.totalPrice)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              href={`/dashboard/orders/${order.id}`}
                              className="text-indigo-600 hover:text-indigo-900 flex items-center justify-end"
                            >
                              <Eye size={16} className="mr-1" />
                              <span>Détails</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Footer avec pagination */}
              <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                <nav className="flex items-center justify-between">
                  <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                      Affichage de <span className="font-medium">{sortedOrders.length}</span> commandes
                    </p>
                  </div>
                  <div className="flex-1 flex justify-center sm:justify-end">
                    <div className="flex items-center">
                      <button
                        disabled
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 opacity-50 cursor-not-allowed"
                      >
                        Précédent
                      </button>
                      <button
                        disabled
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 opacity-50 cursor-not-allowed"
                      >
                        Suivant
                      </button>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Components
function SidebarItem({ icon, text, href, active = false }) {
  return (
    <Link
      href={href}
      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
        active 
          ? 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-md' 
          : 'text-slate-200 hover:bg-white/10 hover:text-white'
      }`}
    >
      <div className={`mr-3 p-1 rounded-md transition-colors ${active ? 'bg-white/20' : 'group-hover:bg-white/10 bg-transparent'}`}>
        {icon}
      </div>
      {text}
    </Link>
  );
}

function MobileSidebarItem({ icon, text, href, active = false }) {
  return (
    <Link
      href={href}
      className={`group flex items-center px-3 py-2 text-base font-medium rounded-lg transition-all duration-150 ${
        active 
          ? 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-md' 
          : 'text-slate-200 hover:bg-white/10 hover:text-white'
      }`}
    >
      <div className={`mr-3 p-1 rounded-md transition-colors ${active ? 'bg-white/20' : 'group-hover:bg-white/10 bg-transparent'}`}>
        {icon}
      </div>
      {text}
    </Link>
  );
}