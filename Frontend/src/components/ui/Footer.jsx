import React from "react";

const Footer = () => {
   const year = new Date().getFullYear();
   return (
      <footer className="bg-gradient-to-r from-pink-50 to-purple-50 mt-auto py-8 px-4 sm:px-6 lg:px-8 shadow-md border-t border-purple-100">
         <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
            <div className="text-gray-600 text-sm">
               <p>&copy; {year} Vote Miss. Tous droits réservés.</p>
            </div>

            <div className="text-gray-700 text-sm font-medium">
               <p>
                  Développé avec passion pour la célébration de la beauté et
                  l'innovation numérique. 💖
               </p>
            </div>

            <div className="text-sm">
               <a
                  href="/politique-confidentialite"
                  className="text-purple-600 hover:text-purple-800 transition-colors duration-200 mx-2"
               >
                  Politique de Confidentialité
               </a>
               <span className="text-gray-400">|</span>
               <a
                  href="/mentions-legales"
                  className="text-purple-600 hover:text-purple-800 transition-colors duration-200 mx-2"
               >
                  Mentions Légales
               </a>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
