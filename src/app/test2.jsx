'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LogOut, Home, PlusCircle, ShoppingBag, List, Settings, 
  Menu, X, User, Mail, Phone, Save, Shield, Key
} from 'lucide-react';

// Simplified sidebar item components
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

export default function SettingAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  
  // Informations administrateur
  const [adminInfo, setAdminInfo] = useState({
    firstName: 'Michel',
    lastName: 'Dupont',
    email: 'michel.dupont@maison-hote.fr',
    phone: '+33 6 12 34 56 78',
    role: 'Propriétaire',
    avatar: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Effet pour animer le chargement initial
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Gestion des changements dans les champs de formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdminInfo({
      ...adminInfo,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Gestion de la sauvegarde
  const handleSave = () => {
    setIsEditing(false);
    setShowSaveNotification(true);
    
    // Cacher la notification après 3 secondes
    setTimeout(() => {
      setShowSaveNotification(false);
    }, 3000);

    // Réinitialiser les champs de mot de passe
    setAdminInfo({
      ...adminInfo,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar pour mobile (hidden par défaut) */}
      <div className={`fixed inset-0 z-40 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-slate-900 bg-opacity-60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 w-64 max-w-xs bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 shadow-xl">
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700/50">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center">
                <Home size={15} className="text-white" />
              </div>
              <h1 className="text-xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
                Maison d'hôte
              </h1>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="text-white p-1 rounded-full hover:bg-white/10"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="pt-5 pb-4">
            <div className="px-3 space-y-1">
              <MobileSidebarItem icon={<Home size={20} />} text="Dashboard" href="/dashboard" />
              <MobileSidebarItem icon={<List size={20} />} text="Mes Chambres" href="/dashboard/rooms" />
              <MobileSidebarItem icon={<PlusCircle size={20} />} text="Ajouter Chambre" href="/dashboard/rooms/add" />
              <MobileSidebarItem icon={<ShoppingBag size={20} />} text="Commandes" href="/dashboard/orders" />
              <MobileSidebarItem icon={<Settings size={20} />} text="Paramètres" href="/dashboard/settings" active={true} />
            </div>
          </nav>
          <div className="flex border-t border-indigo-800/30 p-4">
            <button
              onClick={() => router.push('/login')}
              className="flex items-center text-white w-full rounded-lg hover:bg-white/5 p-2"
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
          <div className="flex flex-col h-full bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 shadow-lg">
            <div className="flex items-center h-16 px-6 border-b border-slate-700/50">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Home size={15} className="text-white" />
                </div>
                <h1 className="text-xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
                  Maison d'hôte
                </h1>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="p-4">
                <div className="flex items-center bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">{`${adminInfo.firstName} ${adminInfo.lastName}`}</p>
                    <p className="text-xs text-slate-300">{adminInfo.role}</p>
                  </div>
                </div>
              </div>
              <nav className="flex-1 px-3 py-4 space-y-1">
                <SidebarItem icon={<Home size={20} />} text="Dashboard" href="/dashboard" />
                <SidebarItem icon={<List size={20} />} text="Mes Chambres" href="/dashboard/rooms" />
                <SidebarItem icon={<PlusCircle size={20} />} text="Ajouter Chambre" href="/dashboard/rooms/add" />
                <SidebarItem icon={<ShoppingBag size={20} />} text="Commandes" href="/dashboard/orders" />
                <SidebarItem icon={<Settings size={20} />} text="Paramètres" href="/dashboard/settings" active={true} />
              </nav>
            </div>
            <div className="flex border-t border-slate-700/30 p-4">
              <button
                onClick={() => router.push('/login')}
                className="flex items-center text-white w-full rounded-lg hover:bg-white/5 p-2"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-full h-screen overflow-auto">
        {/* Top navigation */}
        <div className="flex-shrink-0 flex h-16 bg-white shadow-md">
          <button
            type="button"
            className="px-4 text-gray-500 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Paramètres</h1>
            </div>
            <div className="ml-4 flex items-center space-x-4">
              <div className="bg-gradient-to-r from-teal-100 to-teal-50 text-teal-800 pl-3 pr-4 py-1.5 rounded-full flex items-center shadow-sm border border-teal-200">
                <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center mr-2">
                  <User size={14} />
                </div>
                <span className="text-sm font-medium">{adminInfo.role}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Save notification */}
        {showSaveNotification && (
          <div className="fixed top-20 right-6 z-50 flex items-center p-4 bg-green-100 border border-green-200 rounded-lg shadow-lg">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Save size={18} className="text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Modifications enregistrées avec succès!
              </p>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-white shadow-md rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Paramètres du compte</h2>
                  <p className="text-gray-500 mt-1">Consultez et modifiez vos informations personnelles</p>
                </div>
                <button 
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={`px-6 py-2 rounded-lg shadow-md flex items-center space-x-2 ${
                    isEditing 
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {isEditing ? (
                    <>
                      <Save size={18} />
                      <span>Enregistrer</span>
                    </>
                  ) : (
                    <>
                      <Settings size={18} />
                      <span>Modifier</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white shadow-md rounded-xl mb-6 overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`py-4 px-6 font-medium text-sm border-b-2 ${
                      activeTab === 'profile'
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <User size={18} />
                      <span>Profil</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`py-4 px-6 font-medium text-sm border-b-2 ${
                      activeTab === 'security'
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Shield size={18} />
                      <span>Mot de passe</span>
                    </div>
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Photo de profil */}
                      <div className="md:w-1/3">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col items-center">
                          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-4xl font-bold">
                            {adminInfo.firstName.charAt(0)}{adminInfo.lastName.charAt(0)}
                          </div>
                          <h3 className="mt-4 font-medium text-lg">{`${adminInfo.firstName} ${adminInfo.lastName}`}</h3>
                          <p className="text-gray-500">{adminInfo.role}</p>
                        </div>
                      </div>

                      {/* Informations personnelles */}
                      <div className="md:w-2/3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                            <input
                              type="text"
                              name="firstName"
                              value={adminInfo.firstName}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className={`w-full px-4 py-2 rounded-lg border ${
                                isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                              }`}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                            <input
                              type="text"
                              name="lastName"
                              value={adminInfo.lastName}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className={`w-full px-4 py-2 rounded-lg border ${
                                isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                              }`}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className={`flex rounded-lg border ${
                              isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                            }`}>
                              <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 border-r border-gray-300">
                                <Mail size={16} />
                              </span>
                              <input
                                type="email"
                                name="email"
                                value={adminInfo.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`flex-1 p-2 ${
                                  !isEditing && 'bg-gray-50'
                                }`}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                            <div className={`flex rounded-lg border ${
                              isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                            }`}>
                              <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 border-r border-gray-300">
                                <Phone size={16} />
                              </span>
                              <input
                                type="text"
                                name="phone"
                                value={adminInfo.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`flex-1 p-2 ${
                                  !isEditing && 'bg-gray-50'
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Shield className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">Sécurité du compte</h3>
                          <p className="text-sm text-yellow-700 mt-1">
                            Pour protéger votre compte, nous vous recommandons d'utiliser un mot de passe fort 
                            et de le changer régulièrement.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
                        <div className={`flex rounded-lg border ${
                          isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}>
                          <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 border-r border-gray-300">
                            <Key size={16} />
                          </span>
                          <input
                            type="password"
                            name="currentPassword"
                            value={adminInfo.currentPassword}
                            onChange={handleChange}
                            disabled={!isEditing}
                            placeholder={isEditing ? "" : "••••••••"}
                            className={`flex-1 p-2 ${
                              !isEditing && 'bg-gray-50'
                            }`}
                          />
                        </div>
                      </div>

                      {isEditing && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                            <div className="flex rounded-lg border border-gray-300">
                              <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 border-r border-gray-300">
                                <Key size={16} />
                              </span>
                              <input
                                type="password"
                                name="newPassword"
                                value={adminInfo.newPassword}
                                onChange={handleChange}
                                className="flex-1 p-2"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le nouveau mot de passe</label>
                            <div className="flex rounded-lg border border-gray-300">
                              <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 border-r border-gray-300">
                                <Key size={16} />
                              </span>
                              <input
                                type="password"
                                name="confirmPassword"
                                value={adminInfo.confirmPassword}
                                onChange={handleChange}
                                className="flex-1 p-2"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <p className="text-sm text-gray-500">
                  © 2025 Maison d'hôte. Tous droits réservés.
                </p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Confidentialité</a>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Conditions</a>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Aide</a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}