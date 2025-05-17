"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, Users, Calendar, Check } from "lucide-react"

const chambres = [
  {
    id: 1,
    titre: "Chambre Deluxe",
    description: "Élégance et confort dans un espace moderne avec vue pittoresque.",
    commodites: ["Climatisation", "TV écran plat", "WiFi gratuit", "Petit-déjeuner inclus"],
    image: "https://img.freepik.com/photos-premium/chambres-hotel-modernes-elegantes_1417-8488.jpg",
    prix: "45 000 FCFA",
    duree: "nuit",
    capacite: 2,
    notation: 4.8,
    disponible: true,
  },
]

export default function ChambreDetail({ params }) {
  const [chambre, setChambre] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = parseInt(params.id)
    const chambreTrouvee = chambres.find((c) => c.id === id)

    const timer = setTimeout(() => {
      setChambre(chambreTrouvee || null)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!chambre) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Chambre non trouvée</h1>
        <p className="text-gray-600 mb-6">La chambre que vous recherchez n'existe pas.</p>
        <Link
          href="/"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-lg transition duration-300"
        >
          Retour à l'accueil
        </Link>
      </div>
    )
  }

  // Générer les étoiles
  const renderStars = (notation) => {
    const stars = []
    const fullStars = Math.floor(notation)
    const hasHalfStar = notation % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-5 h-5 text-yellow-400" />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      )
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />)
    }

    return stars
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Retour aux chambres</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Image */}
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={chambre.image || "/placeholder.svg"}
              alt={chambre.titre}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            {!chambre.disponible && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <span className="text-white text-2xl font-bold px-6 py-3 bg-red-600 rounded-lg">Non disponible</span>
              </div>
            )}
          </div>

          {/* Infos principales */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{chambre.titre}</h1>

            <div className="flex items-center mb-4">
              <div className="flex mr-3">{renderStars(chambre.notation)}</div>
              <span className="text-gray-600">
                {chambre.notation.toFixed(1)} ({Math.floor(chambre.notation * 10)} avis)
              </span>
            </div>

            <p className="text-gray-600 text-lg mb-6">{chambre.description}</p>

            <div className="flex items-center mb-4">
              <Users className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700">
                Capacité: {chambre.capacite} personne{chambre.capacite > 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex items-center mb-6">
              <Calendar className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700">Durée: Par {chambre.duree}</span>
            </div>

            <div className="mt-auto">
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-bold text-purple-600">{chambre.prix}</span>
                <span className="text-gray-500 ml-2">/ {chambre.duree}</span>
              </div>

              <button
                className={`${
                  chambre.disponible ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-400 cursor-not-allowed"
                } w-full text-white font-semibold py-3 px-6 rounded-lg transition duration-300 text-lg`}
                disabled={!chambre.disponible}
              >
                {chambre.disponible ? "Réserver maintenant" : "Non disponible"}
              </button>
            </div>
          </div>
        </div>

        {/* Commodités */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Commodités</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chambre.commodites.map((item, idx) => (
              <div key={idx} className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Politique */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Politique de réservation</h2>
          <div className="space-y-4 text-gray-700">
            <p>• Check-in à partir de 14h00</p>
            <p>• Check-out avant 12h00</p>
            <p>• Annulation gratuite jusqu'à 24 heures avant l'arrivée</p>
            <p>• Une pièce d'identité valide sera demandée à l'arrivée</p>
            <p>• Les animaux de compagnie ne sont pas autorisés</p>
          </div>
        </div>
      </div>
    </div>
  )
}
