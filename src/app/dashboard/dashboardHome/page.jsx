'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
    Bell, LogOut, Home, PlusCircle, ShoppingBag, List, Settings, 
    Menu, X, User, Calendar, DollarSign, TrendingUp, Star, Eye, 
    Users
  } from 'lucide-react';
  

export default function DashboardHome() {
      const router = useRouter();
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
      const [isLoaded, setIsLoaded] = useState(false);
    
        // Effet pour animer le chargement initial
        useEffect(() => {
          setIsLoaded(true);
        }, []);
    return(
        <div className="flex h-screen bg-gray-50">
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
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">
          {/* Stats section */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard 
              title="Chambres disponibles" 
              value="12" 
              icon={<Home className="text-teal-600" />} 
              trend="↑ 2 depuis hier"
              trendColor="text-teal-500"
            />
            <StatCard 
              title="Réservations aujourd'hui" 
              value="8" 
              icon={<Calendar className="text-cyan-600" />} 
              trend="↑ 3 depuis hier"
              trendColor="text-teal-500"
            />
            <StatCard 
              title="Clients du mois" 
              value="12" 
              icon={<Users className="text-slate-600" />} 
              trend="↑ 15% ce mois"
              trendColor="text-teal-500"
            />
            <StatCard 
              title="Taux d'occupation" 
              value="78%" 
              icon={<TrendingUp className="text-cyan-600" />} 
              trend="↑ 5% depuis la semaine dernière"
              trendColor="text-teal-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard 
              title="Mes chambres" 
              description="Gérez vos chambres existantes. Modifiez ou supprimez-les selon vos besoins."
              buttonText="Voir mes chambres"
              href="/dashboard/rooms"
              bgGradient="from-teal-600 to-cyan-700"
              icon={<Home size={24} className="text-white" />}
            />
            
            <DashboardCard 
              title="Ajouter une chambre" 
              description="Créez une nouvelle chambre en renseignant ses caractéristiques."
              buttonText="Ajouter une chambre"
              href="/dashboard/rooms/add"
              bgGradient="from-cyan-500 to-teal-700"
              icon={<PlusCircle size={24} className="text-white" />}
            />
            
            <DashboardCard 
              title="Voir les commandes" 
              description="Consultez et gérez les commandes et réservations en cours."
              buttonText="Voir les commandes"
              href="/dashboard/orders"
              bgGradient="from-slate-600 to-slate-800"
              icon={<List size={24} className="text-white" />}
            />
            
            <DashboardCard 
              title="Faire une commande" 
              description="Créez une nouvelle commande pour un client en tant qu'administrateur."
              buttonText="Nouvelle commande"
              href="/dashboard/orders/create"
              bgGradient="from-cyan-600 to-sky-700"
              icon={<ShoppingBag size={24} className="text-white" />}
            />
            
            <DashboardCard 
              title="Gérer les clients" 
              description="Consultez et gérez votre base de clients, voir tous les clients."
              buttonText="Voir les clients"
              href="/dashboard/clients"
              bgGradient="from-indigo-600 to-purple-700"
              icon={<Users size={24} className="text-white" />}
            />
          </div>
          
          {/* Recent activity section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Activité récente</h2>
              <button className="text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors">
                Voir tout
              </button>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
              <ul className="divide-y divide-gray-200">
                <ActivityItem 
                  title="Nouvelle réservation" 
                  description="Chambre Deluxe #103 pour Jean Dupont"
                  timestamp="Il y a 2 heures"
                  icon={<Calendar size={16} className="text-teal-500" />}
                />

                <ActivityItem 
                  title="Modification chambre" 
                  description="La description de la chambre #102 a été mise à jour"
                  timestamp="Hier, 14:30"
                  icon={<Home size={16} className="text-slate-500" />}
                />
                <ActivityItem 
                  title="Nouvelle commande" 
                  description="Petit-déjeuner en chambre - Room #205"
                  timestamp="Hier, 08:12"
                  icon={<ShoppingBag size={16} className="text-teal-500" />}
                />
                <ActivityItem 
                  title="Nouveau client" 
                  description="Marie Lambert a été ajoutée à la base de clients"
                  timestamp="Hier, 07:25"
                  icon={<User size={16} className="text-indigo-500" />}
                />
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
    )
}
function StatCard({ title, value, icon, trend, trendColor }) {
    return (
      <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-100">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-2 bg-teal-50">
              {icon}
            </div>
            <div className="ml-5 w-0 flex-1">
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                <div className={`ml-2 text-sm ${trendColor}`}>{trend}</div>
              </dd>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  function DashboardCard({ title, description, buttonText, href, bgGradient, icon }) {
    return (
      <div className="overflow-hidden rounded-lg shadow-md transition-all duration-200 hover:shadow-lg border border-gray-100">
        <div className={`bg-gradient-to-br ${bgGradient} px-5 py-6 sm:p-6`}>
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-lg p-3 bg-white bg-opacity-20 shadow-inner">
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
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-600 focus:ring-white transition-colors"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  function ActivityItem({ title, description, timestamp, icon }) {
    return (
      <li className="hover:bg-gray-50 transition-colors">
        <div className="px-6 py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <div className="p-2 rounded-full bg-gray-50">
                {icon}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-teal-700 truncate">
                  {title}
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full bg-gray-100 text-gray-800">
                    {timestamp}
                  </p>
                </div>
              </div>
              <div className="mt-1">
                <p className="flex items-center text-sm text-gray-500">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }