"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, Mail, User, CalendarIcon, CheckCircle, Home, ChevronRight } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [formFilled, setFormFilled] = useState(0);

  // Animation d'entrée
  useEffect(() => {
    setVisible(true);
  }, []);

  // Calculer le pourcentage de remplissage du formulaire
  useEffect(() => {
    const fields = [firstName, lastName, email, password, confirmPassword, birthdate];
    const filledFields = fields.filter(field => field.trim() !== "").length;
    const percentage = Math.min(100, Math.round((filledFields / fields.length) * 100));
    setFormFilled(percentage);
  }, [firstName, lastName, email, password, confirmPassword, birthdate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div
      className="min-h-screen bg-center flex items-center justify-center p-6 bg-cover relative overflow-hidden"
      style={{
        backgroundImage: `url("https://img.freepik.com/photos-premium/rendering-3d-magnifique-suite-chambre-luxe-contemporaine-dans-hotel-television_1029473-137979.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Particules animées en arrière-plan */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/20 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s infinite linear`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>

      {/* Overlay pour assombrir légèrement l'image de fond */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>

      {/* Conteneur principal avec animation d'entrée */}
      <div 
        className={`w-full max-w-2xl relative z-10 mx-auto rounded-2xl shadow-2xl bg-white/90 p-10 space-y-6 backdrop-blur-sm transition-all duration-1000 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Barre de progression */}
        <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-600 transition-all duration-700 ease-out" style={{ width: `${formFilled}%` }}></div>

        {/* Logo et titre avec animation */}
        <Link href="/">
        <div className="text-center mb-10 transition-all duration-700 delay-300">
          <div className="flex items-center justify-center space-x-4">
            <div className="h-16 w-16 bg-gradient-to-br from-violet-600 to-indigo-800 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-500 shadow-lg hover:shadow-violet-300/50">
              <Home size={28} className="text-white animate-pulse" />
            </div>
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-violet-600 to-indigo-700 bg-clip-text text-transparent hover:from-indigo-700 hover:to-violet-600 transition-all duration-700">
              Maison d'hôte
            </h1>
          </div>
          <p className="mt-5 text-gray-600 italic font-light text-xl">
            <span className="inline-block animate-fade-in-up delay-500">Créez votre compte pour profiter de nos services exclusifs</span>
          </p>
        </div>
        </Link>

        {/* Formulaire d'inscription */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`space-y-2 transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User size={18} className="text-violet-600" />
                Prénom
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 outline-none bg-white/80 shadow-sm hover:shadow-md"
                placeholder="Prénom"
                required
              />
            </div>

            <div className={`space-y-2 transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User size={18} className="text-violet-600" />
                Nom
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none bg-white/80 hover:shadow-md"
                placeholder="Nom"
                required
              />
            </div>
          </div>

          <div className={`space-y-2 transition-all duration-700 delay-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Mail size={18} className="text-violet-600" />
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none bg-white/80 hover:shadow-md"
              placeholder="votre.email@exemple.com"
              required
            />
          </div>

          <div className={`space-y-2 transition-all duration-700 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <label htmlFor="birthdate" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <CalendarIcon size={18} className="text-violet-600" />
              Date de naissance
            </label>
            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none bg-white/80 hover:shadow-md"
              required
            />
          </div>

          <div className={`space-y-2 transition-all duration-700 delay-800 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Lock size={18} className="text-violet-600" />
              Mot de passe
            </label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none bg-white/80 group-hover:shadow-md"
                placeholder="Choisissez un mot de passe"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-violet-600 transition-colors"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          <div className={`space-y-2 transition-all duration-700 delay-900 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Lock size={18} className="text-violet-600" />
              Confirmer le mot de passe
            </label>
            <div className="relative group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none bg-white/80 group-hover:shadow-md"
                placeholder="Confirmez votre mot de passe"
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-violet-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          <div className={`flex items-start mt-6 transition-all duration-700 delay-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="h-5 w-5 text-violet-600 focus:ring-violet-500 border-gray-300 rounded cursor-pointer"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700">
                J'accepte les{" "}
                <Link href="/terms" className="text-violet-600 hover:text-violet-800 underline transition-all duration-300">
                  conditions d'utilisation
                </Link>{" "}
                et la{" "}
                <Link href="/privacy" className="text-violet-600 hover:text-violet-800 underline transition-all duration-300">
                  politique de confidentialité
                </Link>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-4 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-500 font-medium flex items-center justify-center gap-2 shadow-xl mt-8 text-lg group relative overflow-hidden ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="absolute right-full w-12 h-full bg-white/20 transform skew-x-12 transition-all duration-700 group-hover:right-0 z-0"></span>
            <CheckCircle size={22} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">Créer mon compte</span>
            <ChevronRight size={20} className="relative z-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
          </button>
        </form>

        {/* Lien de connexion */}
        <div className={`text-center pt-6 border-t border-gray-200 mt-8 transition-all duration-700 delay-1100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-gray-600 text-lg">
            Déjà inscrit ?{" "}
            <Link href="/auth/login" className="text-violet-600 hover:text-violet-800 font-medium transition-all duration-300 underline hover:no-underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>

      {/* Style CSS pour les animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(0px) rotate(360deg); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out forwards;
        }
        
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-800 { animation-delay: 800ms; }
        .delay-900 { animation-delay: 900ms; }
        .delay-1000 { animation-delay: 1000ms; }
        .delay-1100 { animation-delay: 1100ms; }
      `}</style>
    </div>
  );
}