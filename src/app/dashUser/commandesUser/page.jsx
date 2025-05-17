"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronDown, ChevronUp, Search, Filter, Download, Eye } from 'lucide-react';

// Données factices pour les commandes
const commandesUtilisateur = [
  {
    id: "CMD-2025-001",
    chambre: "Chambre Deluxe",
    dateArrivee: "2025-05-10",
    dateDepart: "2025-05-12",
    nbPersonnes: 2,
    prix: "90 000 FCFA",
    statut: "Confirmée",
    methodePaiement: "Carte bancaire",
    dateCommande: "2025-05-01"
  },
  {
    id: "CMD-2025-002",
    chambre: "Suite Familiale",
    dateArrivee: "2025-06-15",
    dateDepart: "2025-06-20",
    nbPersonnes: 4,
    prix: "350 000 FCFA",
    statut: "En attente",
    methodePaiement: "Mobile Money",
    dateCommande: "2025-05-05"
  },
  {
    id: "CMD-2025-003",
    chambre: "Chambre Économique",
    dateArrivee: "2025-04-20",
    dateDepart: "2025-04-21",
    nbPersonnes: 1,
    prix: "30 000 FCFA",
    statut: "Terminée",
    methodePaiement: "Carte bancaire",
    dateCommande: "2025-04-10"
  },
  {
    id: "CMD-2025-004",
    chambre: "Chambre Deluxe",
    dateArrivee: "2025-05-25",
    dateDepart: "2025-05-28",
    nbPersonnes: 2,
    prix: "135 000 FCFA",
    statut: "Confirmée",
    methodePaiement: "Virement bancaire",
    dateCommande: "2025-05-12"
  },
  {
    id: "CMD-2025-005",
    chambre: "Suite Familiale",
    dateArrivee: "2025-07-01",
    dateDepart: "2025-07-07",
    nbPersonnes: 3,
    prix: "420 000 FCFA",
    statut: "En attente",
    methodePaiement: "Mobile Money",
    dateCommande: "2025-05-15"
  },
  {
    id: "CMD-2025-006",
    chambre: "Chambre Économique",
    dateArrivee: "2025-03-15",
    dateDepart: "2025-03-16",
    nbPersonnes: 2,
    prix: "30 000 FCFA",
    statut: "Annulée",
    methodePaiement: "Carte bancaire",
    dateCommande: "2025-03-01"
  },
  {
    id: "CMD-2025-007",
    chambre: "Chambre Deluxe",
    dateArrivee: "2025-08-10",
    dateDepart: "2025-08-15",
    nbPersonnes: 2,
    prix: "225 000 FCFA",
    statut: "Confirmée",
    methodePaiement: "Carte bancaire",
    dateCommande: "2025-05-16"
  }
];

export default function CommandesUser() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [commandes, setCommandes] = useState(commandesUtilisateur);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'dateCommande', direction: 'desc' });
  const [filtreStatut, setFiltreStatut] = useState('Tous');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [commandeSelectionnee, setCommandeSelectionnee] = useState(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gérer le tri des colonnes
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Appliquer le tri
  const sortedCommandes = [...commandes].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filtrer les commandes selon le terme de recherche et le statut
  const filteredCommandes = sortedCommandes.filter(commande => {
    const matchSearch = 
      commande.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commande.chambre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commande.dateArrivee.includes(searchTerm) ||
      commande.prix.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatut = filtreStatut === 'Tous' || commande.statut === filtreStatut;
    
    return matchSearch && matchStatut;
  });
  
  // Formatter la date en format lisible
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Définir la couleur du badge selon le statut
  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmée':
        return 'bg-green-100 text-green-800';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Terminée':
        return 'bg-blue-100 text-blue-800';
      case 'Annulée':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className={`fixed w-full z-10 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-6'
      }`}>
        <div className="mx-auto container max-w-7xl flex justify-between items-center px-6">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Maison d'hôte</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <Link href="/userpage" className="hover:text-purple-600 transition relative group">
              Accueil
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/commandesUser" className="text-purple-600 font-semibold hover:text-purple-700 relative group">
              Mes commandes
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transition-all duration-300"></span>
            </Link>
            <Link href="/favoris" className="hover:text-purple-600 transition relative group">
              Favoris
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>
          
          <div className='flex items-center space-x-4'>
            <Link href="/auth/login" className="text-red-500 hover:text-red-600 transition font-medium hidden md:block">
              Déconnexion
            </Link>
            <Link href="/reserver">
              <button className={`${
                isScrolled 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-white text-purple-600 hover:bg-purple-600 hover:text-white'
              } font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md`}>
                Commander
              </button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Contenu principal */}
      <main className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          
          {/* En-tête de la section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Mes Commandes</h2>
            <p className="text-gray-600">Consultez et gérez toutes vos réservations en un seul endroit.</p>
          </div>

          {/* Barre d'outils de recherche et filtrage */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              {/* Barre de recherche */}
              <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Rechercher une commande..." 
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filtres */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-auto">
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center justify-between w-full sm:w-auto space-x-2 bg-gray-100 hover:bg-gray-200 transition px-4 py-2 rounded-lg"
                  >
                    <Filter size={18} className="text-gray-600" />
                    <span>Filtrer</span>
                    {isFilterOpen ? 
                      <ChevronUp size={18} className="text-gray-600" /> : 
                      <ChevronDown size={18} className="text-gray-600" />
                    }
                  </button>
                  
                  {isFilterOpen && (
                    <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg z-10 p-2">
                      <div className="p-2">
                        <p className="font-medium text-sm text-gray-700 mb-2">Statut</p>
                        <div className="space-y-1">
                          {['Tous', 'Confirmée', 'En attente', 'Terminée', 'Annulée'].map((statut) => (
                            <div key={statut} className="flex items-center">
                              <input 
                                type="radio" 
                                id={statut} 
                                name="statut" 
                                value={statut}
                                checked={filtreStatut === statut}
                                onChange={() => setFiltreStatut(statut)}
                                className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                              />
                              <label htmlFor={statut} className="ml-2 text-sm text-gray-700">
                                {statut}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button className="flex items-center space-x-2 bg-purple-50 text-purple-600 hover:bg-purple-100 transition px-4 py-2 rounded-lg w-full sm:w-auto justify-center">
                  <Download size={18} />
                  <span>Exporter</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tableau des commandes */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                      onClick={() => requestSort('id')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Référence</span>
                        {sortConfig.key === 'id' && (
                          sortConfig.direction === 'asc' ? 
                            <ChevronUp size={14} /> : <ChevronDown size={14} />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                      onClick={() => requestSort('chambre')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Chambre</span>
                        {sortConfig.key === 'chambre' && (
                          sortConfig.direction === 'asc' ? 
                            <ChevronUp size={14} /> : <ChevronDown size={14} />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                      onClick={() => requestSort('dateArrivee')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Date d'arrivée</span>
                        {sortConfig.key === 'dateArrivee' && (
                          sortConfig.direction === 'asc' ? 
                            <ChevronUp size={14} /> : <ChevronDown size={14} />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    >
                      Durée
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                      onClick={() => requestSort('prix')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Prix</span>
                        {sortConfig.key === 'prix' && (
                          sortConfig.direction === 'asc' ? 
                            <ChevronUp size={14} /> : <ChevronDown size={14} />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                      onClick={() => requestSort('statut')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Statut</span>
                        {sortConfig.key === 'statut' && (
                          sortConfig.direction === 'asc' ? 
                            <ChevronUp size={14} /> : <ChevronDown size={14} />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCommandes.length > 0 ? (
                    filteredCommandes.map((commande) => {
                      // Calculer la durée du séjour
                      const dateArrivee = new Date(commande.dateArrivee);
                      const dateDepart = new Date(commande.dateDepart);
                      const dureeEnJours = Math.round((dateDepart - dateArrivee) / (1000 * 60 * 60 * 24));
                    
                      return (
                        <tr 
                          key={commande.id} 
                          className="hover:bg-gray-50 transition-colors"
                          onClick={() => setCommandeSelectionnee(commande)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {commande.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {commande.chambre}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar size={16} className="mr-2 text-gray-400" />
                              {formatDate(commande.dateArrivee)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock size={16} className="mr-2 text-gray-400" />
                              {dureeEnJours} {dureeEnJours > 1 ? 'nuits' : 'nuit'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {commande.prix}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(commande.statut)}`}>
                              {commande.statut}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button 
                                className="p-1 text-purple-600 hover:text-purple-800 transition"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCommandeSelectionnee(commande);
                                }}
                              >
                                <Eye size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <Search size={40} className="text-gray-300 mb-2" />
                          <p className="font-medium">Aucune commande trouvée</p>
                          <p className="text-sm">Essayez de modifier vos critères de recherche</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Pagination simplifiée */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Affichage de <span className="font-medium">{filteredCommandes.length}</span> commandes
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Précédent
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Suivant
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Modal de détails de commande */}
      {commandeSelectionnee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Détails de la réservation</h3>
                <button 
                  onClick={() => setCommandeSelectionnee(null)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Référence</span>
                <span className="font-medium">{commandeSelectionnee.id}</span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Information sur la chambre</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type</span>
                    <span>{commandeSelectionnee.chambre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date d'arrivée</span>
                    <span>{formatDate(commandeSelectionnee.dateArrivee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date de départ</span>
                    <span>{formatDate(commandeSelectionnee.dateDepart)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nombre de personnes</span>
                    <span>{commandeSelectionnee.nbPersonnes}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Information de paiement</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prix total</span>
                    <span className="font-medium">{commandeSelectionnee.prix}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Méthode de paiement</span>
                    <span>{commandeSelectionnee.methodePaiement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date de commande</span>
                    <span>{formatDate(commandeSelectionnee.dateCommande)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Statut</span>
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(commandeSelectionnee.statut)}`}>
                  {commandeSelectionnee.statut}
                </span>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              {commandeSelectionnee.statut === 'En attente' && (
                <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium">
                  Annuler
                </button>
              )}
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">
                Télécharger la facture
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="mx-auto container max-w-7xl px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-3">Maison d'hôte</h3>
              <p className="text-gray-400 max-w-xs">Votre oasis de confort et d'élégance au cœur de la ville.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <div>
                <h4 className="font-semibold mb-3">Navigation</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/dashUser" className="hover:text-white transition">Accueil</Link></li>
                  <li><Link href="/commandesUser" className="hover:text-white transition">Mes commandes</Link></li>
                  <li><Link href="/favoris" className="hover:text-white transition">Favoris</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Informations</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/services" className="hover:text-white transition">Services</Link></li>
                  <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                  <li><Link href="/about" className="hover:text-white transition">À propos</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Légal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/conditions" className="hover:text-white transition">Conditions</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition">Confidentialité</Link></li>
                  <li><Link href="/cookies" className="hover:text-white transition">Cookies</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Maison d'hôte. Tous droits réservés.</p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}