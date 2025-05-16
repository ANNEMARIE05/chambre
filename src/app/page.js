export default function Home() {
  return (
    <div className="min-h-screen w-full">
    <section className="pt-24 pb-12 px-4 md:pt-32">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-500 mb-6">
              Reserve Chambre
            </h1>
            <p className="text-accent text-lg mb-8 max-w-lg">
              Trouvez facilement la chambre idéale pour vos séjours, que ce soit pour une nuit ou pour plusieurs jours. Confort, sécurité et simplicité sont au rendez-vous. Réservez en quelques clics et profitez d’un hébergement adapté à vos besoins
            </p>
            <p className="text-accent text-lg mb-8 max-w-lg">
            Votre confort, notre priorité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href='/register' className="bg-purple-600 text-white px-8 py-3 rounded-md hover:bg-purple-600 transition-colors duration-200 font-semibold animate-pulse">Reserver un chambre maintenant</a>
            </div>
          </div>
          <div className="flex-1">
            <img src='https://img.freepik.com/photos-gratuite/rendu-3d-belle-suite-luxe-dans-hotel-television_105762-2301.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740' alt="Hero" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  </div>
  );
}
