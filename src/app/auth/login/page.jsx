"use client"

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, UserIcon, Lock, LogIn, Home } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen bg-center flex items-center justify-center p-6 bg bg-cover relative"
      style={{
        backgroundImage: `url("https://img.freepik.com/photos-premium/rendering-3d-magnifique-suite-chambre-luxe-contemporaine-dans-hotel-television_1029473-137979.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740")`,
      }}
    >
      {/* Overlay pour assombrir légèrement l'image de fond */}
      <div className="absolute inset-0 bg-black/70 bg-opacity-30"></div>

      <div className="w-full max-w-md relative z-10 mx-auto rounded-2xl shadow-2xl bg-white bg-opacity-95 p-8 space-y-6 backdrop-blur-sm">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-indigo-800 rounded-full flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <Home size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Maison d'hôte
            </h1>
          </div>
          <p className="mt-3 text-gray-600 italic">
            Découvrez le confort et l'élégance
          </p>
        </div>

        {/* Formulaire de connexion */}
        <form className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <UserIcon size={16} className="text-purple-600" />
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="Entrez votre email"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Lock size={16} className="text-purple-600" />
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="Entrez votre mot de passe"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Se souvenir de moi
              </label>
            </div>
            <div className="text-sm">
              <Link href="/forgot-password" className="text-purple-600 hover:text-purple-800 font-medium transition-colors">
                Mot de passe oublié ?
              </Link>
            </div>
          </div>

          <Link href="/dashUser" className="block">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-lg"
            >
              <LogIn size={18} />
              Se connecter
            </button>
          </Link>

          <Link href="/dashboard" className="block">
            <button
              type="button"
              className="w-full bg-gray-700 text-white py-3 mt-2 rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-lg"
            >
              Accès administrateur
            </button>
          </Link>
        </form>

        {/* Lien d'inscription */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-gray-600">
            Pas encore de compte ?{" "}
            <Link href="/auth/register" className="text-purple-600 hover:text-purple-800 font-medium transition-colors">
              S'inscrire ici
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 