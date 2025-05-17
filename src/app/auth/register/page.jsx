"use client"

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, UserIcon, Lock, Mail, User, CalendarIcon, CheckCircle, Home } from "lucide-react";

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div
      className="min-h-screen bg-center flex items-center justify-center p-6 bg-cover relative"
      style={{
        backgroundImage: `url("https://img.freepik.com/photos-premium/rendering-3d-magnifique-suite-chambre-luxe-contemporaine-dans-hotel-television_1029473-137979.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay pour assombrir légèrement l'image de fond */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>

      <div className="w-full max-w-2xl relative z-10 mx-auto rounded-2xl shadow-2xl bg-white bg-opacity-95 p-10 space-y-6 backdrop-blur-sm">
        {/* Logo et titre */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center space-x-4">
            <div className="h-16 w-16 bg-gradient-to-br from-violet-600 to-indigo-800 rounded-full flex items-center justify-center transform hover:scale-105 transition-transform duration-300 shadow-lg">
              <Home size={28} className="text-white" />
            </div>
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-violet-600 to-indigo-700 bg-clip-text text-transparent">
              Maison d'hôte
            </h1>
          </div>
          <p className="mt-5 text-gray-600 italic font-light text-xl">
            Créez votre compte pour profiter de nos services exclusifs
          </p>
        </div>

        {/* Formulaire d'inscription */}
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User size={18} className="text-violet-600" />
                Prénom
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 outline-none bg-white/80 shadow-sm"
                placeholder="Prénom"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User size={18} className="text-violet-600" />
                Nom
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none bg-white/80"
                placeholder="Nom"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Mail size={18} className="text-violet-600" />
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none bg-white/80"
              placeholder="votre.email@exemple.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="birthdate" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <CalendarIcon size={18} className="text-violet-600" />
              Date de naissance
            </label>
            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none bg-white/80"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Lock size={18} className="text-violet-600" />
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none bg-white/80"
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

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Lock size={18} className="text-violet-600" />
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none bg-white/80"
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

          <div className="flex items-start mt-6">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="h-5 w-5 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700">
                J'accepte les{" "}
                <Link href="/terms" className="text-violet-600 hover:text-violet-800 underline">
                  conditions d'utilisation
                </Link>{" "}
                et la{" "}
                <Link href="/privacy" className="text-violet-600 hover:text-violet-800 underline">
                  politique de confidentialité
                </Link>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-4 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-xl mt-8 text-lg"
          >
            <CheckCircle size={22} />
            Créer mon compte
          </button>
        </form>

        {/* Lien de connexion */}
        <div className="text-center pt-6 border-t border-gray-200 mt-8">
          <p className="text-gray-600 text-lg">
            Déjà inscrit ?{" "}
            <Link href="/auth/login" className="text-violet-600 hover:text-violet-800 font-medium transition-colors underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}