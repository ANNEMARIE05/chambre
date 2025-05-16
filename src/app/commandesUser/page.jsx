import Link from 'next/link';

const reservations = [
  {
    titre: "Chambre Deluxe",
    image: "https://img.freepik.com/photos-premium/rendering-3d-magnifique-suite-chambre-luxe-contemporaine-dans-hotel-television_1029473-137979.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
    date: "15 Mai 2025",
    nuit: 2,
    prix: "90 000 FCFA",
  },
  {
    titre: "Suite Familiale",
    image: "https://img.freepik.com/photos-premium/rendering-3d-magnifique-suite-chambre-luxe-contemporaine-dans-hotel-television_1029473-137979.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
    date: "10 Avril 2025",
    nuit: 3,
    prix: "210 000 FCFA",
  },
  {
    titre: "Studio Confort",
    image: "https://img.freepik.com/photos-premium/rendering-3d-magnifique-suite-chambre-luxe-contemporaine-dans-hotel-television_1029473-137979.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
    date: "3 Mars 2025",
    nuit: 1,
    prix: "60 000 FCFA",
  },
];

export default function CommandesUser() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md py-4">
        <div className="mx-auto container max-w-7xl flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-purple-600">Reserve Chambre</h1>
          <nav className="space-x-6 text-gray-700 font-medium">
            <Link href="/userpage" className="hover:text-purple-600 transition">Accueil</Link>
            <Link href="/commandesUser" className="text-purple-600 font-semibold hover:text-purple-700">Mes commandes</Link>
          </nav>
          <div className='flex space-x-2'>
            <Link href="/login" className="text-red-500 mt-2">Déconnexion</Link>
            <Link href="/reserver">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 animate-pulse">
                    Commander
                </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto container max-w-7xl px-4 py-10">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">Mes réservations</h2>

          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-purple-600">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase">Image</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase">Chambre</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase">Nuits</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase">Prix total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
                {reservations.map((res, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={res.image}
                        alt={res.titre}
                        className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium">{res.titre}</td>
                    <td className="px-6 py-4">{res.date}</td>
                    <td className="px-6 py-4">{res.nuit}</td>
                    <td className="px-6 py-4 font-semibold text-purple-600">{res.prix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </main>
    </div>
  );
}
