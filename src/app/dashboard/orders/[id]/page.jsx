'use client'

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bell, LogOut, Home, PlusCircle, ShoppingBag, List, Settings, 
  Menu, X, User, Calendar, Users, Phone, Mail, MapPin,
  Clock, CreditCard, CalendarCheck, Tag, CheckCircle, XCircle
} from 'lucide-react';

export default function CommandeDetail({ params }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const { id } = use(params);

  // Données fictives pour la démo (à remplacer par des vraies données de l'API)
  const commande = {
    id: id,
    status: 'confirmed', // 'confirmed', 'pending', 'cancelled'
    dateCreation: '15 Mai 2025',
    dateArrivee: '25 Mai 2025',
    dateDepart: '28 Mai 2025',
    duree: '3 nuits',
    montantTotal: '295 000 FCFA',
    methodePaiement: 'Carte bancaire',
    chambre: {
      id: 'C102',
      nom: 'Suite Royale',
      capacite: '2 adultes',
      prix: '98 400 FCFA/nuit'
    },
    client: {
      nom: 'Marie Dupont',
      email: 'marie.dupont@example.com',
      telephone: '+33 6 12 34 56 78',
      adresse: '123 Avenue des Lilas, 75020 Paris'
    },
    commentaires: 'Arrivée tardive prévue vers 21h30. Demande un lit bébé.'
  };

  // Fonction pour déterminer la couleur du statut
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle size={16} className="text-green-500" /> };
      case 'pending':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <Clock size={16} className="text-yellow-500" /> };
      case 'cancelled':
        return { bg: 'bg-red-100', text: 'text-red-800', icon: <XCircle size={16} className="text-red-500" /> };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', icon: <Tag size={16} className="text-gray-500" /> };
    }
  };

  const statusDisplay = getStatusColor(commande.status);
  const statusText = commande.status === 'confirmed' ? 'Confirmée' : 
                    commande.status === 'pending' ? 'En attente' : 'Annulée';

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
              <MobileSidebarItem icon={<Users size={20} />} text="Clients" href="/dashboard/clients" />
              <MobileSidebarItem icon={<ShoppingBag size={20} />} text="Commandes" href="/dashboard/orders" active={true} />
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
          <div className="flex flex-col h-0 flex-1 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 shadow-lg">
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
                <SidebarItem icon={<Users size={20} />} text="Clients" href="/dashboard/clients" />
                <SidebarItem icon={<ShoppingBag size={20} />} text="Commandes" href="/dashboard/orders" active={true} />
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
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-md">
          <button
            type="button"
            className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Détails de la Réservation</h1>
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
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/dashboard/orders')}
                className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <h2 className="text-xl font-bold text-gray-800">
                Réservation #{commande.id}
              </h2>
              <div className={`ml-4 ${statusDisplay.bg} ${statusDisplay.text} px-3 py-1 rounded-full text-sm font-medium flex items-center`}>
                {statusDisplay.icon}
                <span className="ml-1.5">{statusText}</span>
              </div>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
                              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Imprimer Facture
              </button>
              <button className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Modifier Réservation
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Informations de la commande */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Détails de la réservation</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center mb-4">
                        <CalendarCheck size={20} className="text-indigo-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Date de création</p>
                          <p className="font-medium">{commande.dateCreation}</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-4">
                        <Calendar size={20} className="text-indigo-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Date d'arrivée</p>
                          <p className="font-medium">{commande.dateArrivee}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={20} className="text-indigo-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Date de départ</p>
                          <p className="font-medium">{commande.dateDepart}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center mb-4">
                        <Clock size={20} className="text-indigo-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Durée du séjour</p>
                          <p className="font-medium">{commande.duree}</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-4">
                        <Tag size={20} className="text-indigo-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Montant total</p>
                          <p className="font-medium text-lg">{commande.montantTotal}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <CreditCard size={20} className="text-indigo-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Méthode de paiement</p>
                          <p className="font-medium">{commande.methodePaiement}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Détails de la chambre */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Détails de la chambre</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-16 w-16 bg-indigo-100 rounded-md flex items-center justify-center text-indigo-600">
                        <Home size={28} />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">{commande.chambre.nom}</h4>
                        <p className="text-sm text-gray-500">Chambre #{commande.chambre.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{commande.chambre.prix}</p>
                      <p className="text-xs text-gray-500 mt-1">Tarif par nuit</p>
                      <p className="text-sm text-gray-500">{commande.chambre.capacite}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commentaires */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Commentaires</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700">{commande.commentaires}</p>
                </div>
              </div>
            </div>

            {/* Informations du client */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Informations du client</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <User size={24} />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">{commande.client.nom}</h4>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail size={18} className="text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900">{commande.client.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone size={18} className="text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Téléphone</p>
                        <p className="font-medium text-gray-900">{commande.client.telephone}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin size={18} className="text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Adresse</p>
                        <p className="font-medium text-gray-900">{commande.client.adresse}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Actions</h3>
                </div>
                <div className="p-6 space-y-3">
                  <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Envoyer confirmation par email
                  </button>
                  <button className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Modifier la réservation
                  </button>
                  <button className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Générer reçu de paiement
                  </button>
                  <button className="w-full py-2 px-4 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Annuler la réservation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
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