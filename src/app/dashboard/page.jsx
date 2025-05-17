'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, LogOut, Home, PlusCircle, ShoppingBag, List, Settings, Menu, X } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar pour mobile (hidden par défaut) */}
      <div className={`fixed inset-0 z-40 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-purple-800 shadow-xl">
          <div className="flex items-center justify-between h-16 px-6 bg-purple-900">
            <span className="font-bold text-xl text-white">Maison d'hôte</span>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto pt-5 pb-4">
            <div className="px-2 space-y-1">
              <MobileSidebarItem icon={<Home size={20} />} text="Dashboard" href="/dashboard" active={true} />
              <MobileSidebarItem icon={<List size={20} />} text="Mes Chambres" href="/dashboard/rooms" />
              <MobileSidebarItem icon={<PlusCircle size={20} />} text="Ajouter Chambre" href="/dashboard/rooms/add" />
              <MobileSidebarItem icon={<ShoppingBag size={20} />} text="Commandes" href="/dashboard/orders" />
              <MobileSidebarItem icon={<ShoppingBag size={20} />} text="Nouvelle Commande" href="/dashboard/orders/create" />
              <MobileSidebarItem icon={<Settings size={20} />} text="Paramètres" href="/dashboard/settings" />
            </div>
          </nav>
          <div className="flex-shrink-0 flex border-t border-purple-700 p-4">
            <button
              onClick={() => router.push('/')}
              className="flex items-center text-white hover:text-gray-200"
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
          <div className="flex flex-col h-0 flex-1 bg-purple-800">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-purple-900">
              <span className="font-bold text-xl text-white">Maison d'hôte</span>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-2">
                <SidebarItem icon={<Home size={20} />} text="Dashboard" href="/dashboard" active={true} />
                <SidebarItem icon={<List size={20} />} text="Mes Chambres" href="/dashboard/rooms" />
                <SidebarItem icon={<PlusCircle size={20} />} text="Ajouter Chambre" href="/dashboard/rooms/add" />
                <SidebarItem icon={<ShoppingBag size={20} />} text="Commandes" href="/dashboard/orders" />
                <SidebarItem icon={<ShoppingBag size={20} />} text="Nouvelle Commande" href="/dashboard/orders/create" />
                <SidebarItem icon={<Settings size={20} />} text="Paramètres" href="/dashboard/settings" />
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-purple-700 p-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center text-white hover:text-gray-200"
              >
                <LogOut className="mr-3 h-5 w-5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 h-screen overflow-auto">
        {/* Top navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm">
          <button
            type="button"
            className="px-4 text-gray-500 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                <Bell size={20} />
              </button>
              <div className="ml-3">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  Propriétaire
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard 
              title="Mes chambres" 
              description="Gérez vos chambres existantes. Modifiez ou supprimez-les selon vos besoins."
              buttonText="Voir mes chambres"
              href="/dashboard/rooms"
              bgColor="bg-gradient-to-br from-purple-500 to-purple-700"
              icon={<Home size={24} className="text-white" />}
            />
            
            <DashboardCard 
              title="Ajouter une chambre" 
              description="Créez une nouvelle chambre en renseignant ses caractéristiques."
              buttonText="Ajouter une chambre"
              href="/dashboard/rooms/add"
              bgColor="bg-gradient-to-br from-green-500 to-green-700"
              icon={<PlusCircle size={24} className="text-white" />}
            />
            
            <DashboardCard 
              title="Voir les commandes" 
              description="Consultez et gérez les commandes et réservations en cours."
              buttonText="Voir les commandes"
              href="/dashboard/orders"
              bgColor="bg-gradient-to-br from-blue-500 to-blue-700"
              icon={<List size={24} className="text-white" />}
            />
            
            <DashboardCard 
              title="Faire une commande" 
              description="Créez une nouvelle commande pour un client."
              buttonText="Nouvelle commande"
              href="/dashboard/orders/create"
              bgColor="bg-gradient-to-br from-amber-500 to-amber-700"
              icon={<ShoppingBag size={24} className="text-white" />}
            />
          </div>
          
          {/* Recent activity section */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Activité récente</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                <ActivityItem 
                  title="Nouvelle réservation" 
                  description="Chambre Deluxe #103 pour Jean Dupont"
                  timestamp="Il y a 2 heures"
                />
                <ActivityItem 
                  title="Paiement reçu" 
                  description="280€ - Chambre Standard #101"
                  timestamp="Il y a 5 heures"
                />
                <ActivityItem 
                  title="Modification chambre" 
                  description="La description de la chambre #102 a été mise à jour"
                  timestamp="Hier, 14:30"
                />
                <ActivityItem 
                  title="Nouvelle commande" 
                  description="Petit-déjeuner en chambre - Room #205"
                  timestamp="Hier, 08:12"
                />
              </ul>
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
      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
        active 
          ? 'bg-purple-900 text-white' 
          : 'text-purple-100 hover:bg-purple-700 hover:text-white'
      }`}
    >
      <div className="mr-3">{icon}</div>
      {text}
    </Link>
  );
}

function MobileSidebarItem({ icon, text, href, active = false }) {
  return (
    <Link
      href={href}
      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
        active 
          ? 'bg-purple-900 text-white' 
          : 'text-purple-100 hover:bg-purple-700 hover:text-white'
      }`}
    >
      <div className="mr-4">{icon}</div>
      {text}
    </Link>
  );
}

function DashboardCard({ title, description, buttonText, href, bgColor, icon }) {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg">
      <div className={`${bgColor} px-4 py-5 sm:p-6`}>
        <div className="flex items-center">
          <div className="flex-shrink-0 rounded-md p-3 bg-white bg-opacity-30">
            {icon}
          </div>
          <div className="ml-5">
            <h3 className="text-lg font-medium text-white">{title}</h3>
          </div>
        </div>
        <p className="mt-2 text-sm text-white text-opacity-90">
          {description}
        </p>
        <div className="mt-5">
          <Link
            href={href}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-900 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-white"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ title, description, timestamp }) {
  return (
    <li>
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-purple-700 truncate">
            {title}
          </p>
          <div className="ml-2 flex-shrink-0 flex">
            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
              {timestamp}
            </p>
          </div>
        </div>
        <div className="mt-2 sm:flex sm:justify-between">
          <div className="sm:flex">
            <p className="flex items-center text-sm text-gray-500">
              {description}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
