"use client"

import { useState, useEffect } from "react";
import { Calendar, Home, User, Search, Hotel, Check, X, PlusCircle, Clock, MapPin, Star, Filter, ChevronLeft, ChevronRight } from "lucide-react";
// Données des chambres
const initialRooms = [
  {
    id: 1,
    titre: "Chambre Deluxe",
    description: "Élégance et confort dans un espace moderne avec vue pittoresque.",
    commodites: ["Climatisation", "TV écran plat", "WiFi gratuit", "Petit-déjeuner inclus"],
    image: "/api/placeholder/400/250",
    prix: "45 000 FCFA",
    duree: "nuit",
    capacite: 2,
    notation: 4.8,
    disponible: true
  },
  {
    id: 2,
    titre: "Suite Familiale",
    description: "Spacieuse et conviviale, idéale pour les séjours en famille.",
    commodites: ["2 lits doubles", "Climatisation", "TV écran plat", "Mini-bar", "WiFi gratuit"],
    image: "/api/placeholder/400/250",
    prix: "70 000 FCFA",
    duree: "jour",
    capacite: 4,
    notation: 4.9,
    disponible: true
  },
  {
    id: 3,
    titre: "Studio Confort",
    description: "Ambiance chaleureuse avec des finitions modernes et fonctionnelles.",
    commodites: ["Grand lit", "Climatisation", "TV écran plat", "WiFi gratuit"],
    image: "/api/placeholder/400/250",
    prix: "60 000 FCFA",
    duree: "nuit",
    capacite: 2,
    notation: 4.7,
    disponible: false
  }
];
// Exemple de réservations
const initialReservations = [
  {
    id: 1,
    roomId: 2,
    clientName: "Marie Faye",
    startDate: "2025-05-20",
    endDate: "2025-05-23",
    status: "confirmée"
  },
  {
    id: 2,
    roomId: 1,
    clientName: "Amadou Diop",
    startDate: "2025-05-18",
    endDate: "2025-05-19",
    status: "en cours"
  }
];
export default function HotelDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [rooms, setRooms] = useState(initialRooms);
  const [reservations, setReservations] = useState(initialReservations);
  const [searchTerm, setSearchTerm] = useState("");
  const [newReservation, setNewReservation] = useState({
    roomId: "",
    clientName: "",
    startDate: "",
    endDate: "",
    status: "en attente"
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedReservation, setSelectedReservation] = useState(null);
  // Fonction pour ajouter une nouvelle réservation
  const handleAddReservation = () => {
    if (!newReservation.roomId || !newReservation.clientName || !newReservation.startDate || !newReservation.endDate) {
      return;
    }
    
    const nextId = reservations.length > 0 ? Math.max(...reservations.map(r => r.id)) + 1 : 1;
    
    const reservation = {
      ...newReservation,
      id: nextId
    };
    
    setReservations([...reservations, reservation]);
    setNewReservation({
      roomId: "",
      clientName: "",
      startDate: "",
      endDate: "",
      status: "en attente"
    });
    setShowModal(false);
  };
  // Filtrer les réservations en fonction du terme de recherche
  const filteredReservations = reservations.filter(reservation => 
    reservation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getRoomById(reservation.roomId)?.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Obtenir les détails d'une chambre par son ID
  const getRoomById = (id) => {
    return rooms.find(room => room.id === parseInt(id));
  };
  // Fonction pour ouvrir le modal de création de réservation
  const openCreateModal = () => {
    setModalMode("create");
    setNewReservation({
      roomId: "",
      clientName: "",
      startDate: "",
      endDate: "",
      status: "en attente"
    });
    setShowModal(true);
  };

  // Fonction pour ouvrir le modal d'édition de réservation
  const openEditModal = (reservation) => {
    setModalMode("edit");
    setSelectedReservation(reservation);
    setNewReservation({
      roomId: reservation.roomId,
      clientName: reservation.clientName,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      status: reservation.status
    });
    setShowModal(true);
  };

  // Fonction pour mettre à jour une réservation
  const handleUpdateReservation = () => {
    if (!newReservation.roomId || !newReservation.clientName || !newReservation.startDate || !newReservation.endDate) {
      return;
    }

    const updatedReservations = reservations.map(res => 
      res.id === selectedReservation.id ? { ...newReservation, id: selectedReservation.id } : res
    );
    
    setReservations(updatedReservations);
    setShowModal(false);
  };

  // Fonction pour supprimer une réservation
  const handleDeleteReservation = (id) => {
    const updatedReservations = reservations.filter(res => res.id !== id);
    setReservations(updatedReservations);
  };

  // Fonction pour changer le statut d'une réservation
  const toggleReservationStatus = (id, newStatus) => {
    const updatedReservations = reservations.map(res => 
      res.id === id ? { ...res, status: newStatus } : res
    );
    setReservations(updatedReservations);
  };

  // Fonction pour formater les dates en format français
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Statistiques pour le tableau de bord
  const stats = {
    totalRooms: rooms.length,
    availableRooms: rooms.filter(room => room.disponible).length,
    activeReservations: reservations.filter(res => res.status === "en cours").length,
    upcomingReservations: reservations.filter(res => 
      new Date(res.startDate) > new Date() && res.status === "confirmée"
    ).length
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* En-tête */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Hotel className="mr-2" />
            Hôtel Teranga Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
              <PlusCircle className="mr-2 h-5 w-5" />
              Nouvelle chambre
            </button>
            <div className="bg-gray-200 rounded-full p-2">
              <User className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8 border-b border-gray-200 mt-6">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`pb-4 px-1 ${
              activeTab === "dashboard"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            } flex items-center`}
          >
            <Home className="mr-2 h-5 w-5" />
            Tableau de bord
          </button>
          <button
            onClick={() => setActiveTab("rooms")}
            className={`pb-4 px-1 ${
              activeTab === "rooms"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            } flex items-center`}
          >
            <Hotel className="mr-2 h-5 w-5" />
            Chambres
          </button>
          <button
            onClick={() => setActiveTab("reservations")}
            className={`pb-4 px-1 ${
              activeTab === "reservations"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            } flex items-center`}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Réservations
          </button>
        </nav>

        {/* Contenu principal */}
        <main className="py-6">
          {/* Tableau de bord */}
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Vue d'ensemble</h2>
              
              {/* Statistiques */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 text-sm font-medium">Total des chambres</h3>
                    <div className="bg-blue-100 p-2 rounded-md">
                      <Hotel className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mt-2">{stats.totalRooms}</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 text-sm font-medium">Chambres disponibles</h3>
                    <div className="bg-green-100 p-2 rounded-md">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mt-2">{stats.availableRooms}</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 text-sm font-medium">Réservations en cours</h3>
                    <div className="bg-yellow-100 p-2 rounded-md">
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mt-2">{stats.activeReservations}</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 text-sm font-medium">Réservations à venir</h3>
                    <div className="bg-purple-100 p-2 rounded-md">
                      <Calendar className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mt-2">{stats.upcomingReservations}</p>
                </div>
              </div>
              
              {/* Réservations récentes */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Réservations récentes</h3>
                  <button
                    onClick={() => setActiveTab("reservations")}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Voir tout
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Chambre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Période
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reservations.slice(0, 5).map((reservation) => (
                        <tr key={reservation.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{reservation.clientName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">
                              {getRoomById(reservation.roomId)?.titre || "Chambre inconnue"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">
                              {formatDate(reservation.startDate)} - {formatDate(reservation.endDate)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                reservation.status === "confirmée"
                                  ? "bg-green-100 text-green-800"
                                  : reservation.status === "en cours"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {reservation.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Liste des chambres */}
          {activeTab === "rooms" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Chambres</h2>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md">
                    <Filter className="h-4 w-4" /> 
                    Filtrer
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Ajouter une chambre
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <div key={room.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="relative">
                      <img src={room.image} alt={room.titre} className="w-full h-48 object-cover" />
                      <div className="absolute top-2 right-2">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            room.disponible
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {room.disponible ? "Disponible" : "Occupée"}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">{room.titre}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-gray-700">{room.notation}</span>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-600">{room.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {room.commodites.slice(0, 3).map((commodite, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                          >
                            {commodite}
                          </span>
                        ))}
                        {room.commodites.length > 3 && (
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            +{room.commodites.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="mt-4 flex items-center">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="ml-1 text-gray-700">{room.capacite} personnes</span>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="font-bold text-gray-900">
                          {room.prix}
                          <span className="text-sm font-normal text-gray-500">/{room.duree}</span>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                          Détails
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Réservations */}
          {activeTab === "reservations" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Réservations</h2>
                <button 
                  onClick={openCreateModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Nouvelle réservation
                </button>
              </div>
              
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Rechercher une réservation..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md">
                    <Filter className="h-4 w-4" /> 
                    Filtrer
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Chambre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Arrivée
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Départ
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredReservations.map((reservation) => (
                        <tr key={reservation.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{reservation.clientName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">
                              {getRoomById(reservation.roomId)?.titre || "Chambre inconnue"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">{formatDate(reservation.startDate)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">{formatDate(reservation.endDate)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                reservation.status === "confirmée"
                                  ? "bg-green-100 text-green-800"
                                  : reservation.status === "en cours"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {reservation.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              {reservation.status === "en attente" && (
                                <button
                                  onClick={() => toggleReservationStatus(reservation.id, "confirmée")}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  <Check className="h-5 w-5" />
                                </button>
                              )}
                              <button
                                onClick={() => openEditModal(reservation)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Modifier
                              </button>
                              <button
                                onClick={() => handleDeleteReservation(reservation.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredReservations.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-500">Aucune réservation trouvée</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal pour créer/éditer une réservation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">
                {modalMode === "create" ? "Nouvelle réservation" : "Modifier la réservation"}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chambre
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newReservation.roomId}
                    onChange={(e) => setNewReservation({...newReservation, roomId: e.target.value})}
                  >
                    <option value="">Sélectionner une chambre</option>
                    {rooms.filter(room => room.disponible || (modalMode === "edit" && room.id === parseInt(newReservation.roomId))).map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.titre} - {room.prix}/{room.duree}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du client
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newReservation.clientName}
                    onChange={(e) => setNewReservation({...newReservation, clientName: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date d'arrivée
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newReservation.startDate}
                      onChange={(e) => setNewReservation({...newReservation, startDate: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date de départ
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newReservation.endDate}
                      onChange={(e) => setNewReservation({...newReservation, endDate: e.target.value})}
                    />
                  </div>
                </div>
                
                {modalMode === "edit" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Statut
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newReservation.status}
                      onChange={(e) => setNewReservation({...newReservation, status: e.target.value})}
                    >
                      <option value="en attente">En attente</option>
                      <option value="confirmée">Confirmée</option>
                      <option value="en cours">En cours</option>
                      <option value="terminée">Terminée</option>
                      <option value="annulée">Annulée</option>
                    </select>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-800"
                >
                  Annuler
                </button>
                <button
                  onClick={modalMode === "create" ? handleAddReservation : handleUpdateReservation}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
                >
                  {modalMode === "create" ? "Créer" : "Mettre à jour"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pagination (exemple simple) */}
      {(activeTab === "rooms" || activeTab === "reservations") && (
        <div className="flex justify-center items-center mt-6">
          <button className="p-2 rounded-md hover:bg-gray-100">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <span className="mx-4 text-gray-700">Page 1 sur 1</span>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      )}

      {/* Pied de page */}
      <footer className="bg-white shadow-inner mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Hôtel Teranga - Tous droits réservés
          </p>
        </div>
      </footer>
    </div>
  );
}