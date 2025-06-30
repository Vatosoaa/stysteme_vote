# 🚀 Système de Vote Miss - Frontend (React 19 + Vite) 💖

Bienvenue sur le frontend de notre système de vote ! Cette application est développée avec les dernières innovations de **React 19** et **Vite**, offrant une expérience utilisateur fluide, réactive et une gestion efficace des candidats et des votes pour un concours de Miss.


## ✨ Fonctionnalités Principales

* **Gestion des Candidats (Admin)** :
    * Création, édition et suppression de profils de candidates.
    * Téléchargement et gestion des images de profil des candidates.
    * Visualisation des statistiques de vote pour chaque candidate.
* **Système d'Authentification Complet** :
    * Inscription et connexion des utilisateurs.
    * Gestion des rôles (Admin/Voter) via des routes protégées.
    * Déconnexion sécurisée.
* **Interface de Vote Intuitive** :
    * Les utilisateurs connectés peuvent voter pour leur candidate préférée (un vote unique par utilisateur).
    * Affichage dynamique des candidates et de leurs scores.
* **Design Responsive & Moderne** :
    * Interface utilisateur agréable et adaptée à toutes les tailles d'écran, conçue avec **Tailwind CSS**.
* **Performances Optimisées** :
    * Utilisation de **Vite** pour un environnement de développement ultra-rapide et un build optimisé.
    * Gestion de l'état avec les **Signals** de React pour des mises à jour performantes et réactives (inspiré des concepts de réactivité de pointe).

## 🛠️ Technologies Utilisées

* **Frontend Framework**: [React 19](https://react.dev/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
* **HTTP Client**: [Axios](https://axios-http.com/)
* **Routing**: [React Router DOM v6](https://reactrouter.com/en/main)
* **Gestion des requêtes API**: [React Query (TanStack Query)](https://tanstack.com/query/latest)
* **Autres**: `jwt-decode`

## ⚙️ Installation & Lancement

Suivez ces étapes pour mettre en place le projet en local :

### Prérequis

* Node.js (v18 ou plus recommandé)
* npm ou pnpm (Nous utilisons `pnpm` comme indiqué par `pnpm-lock.yaml`)

### Étapes

1.  **Cloner le dépôt :**
    ```bash
    git clone [https://github.com/Vatosoaa/stysteme_vote.git](https://github.com/Vatosoaa/stysteme_vote.git)
    cd stysteme_vote
    ```

2.  **Installer les dépendances :**
    ```bash
    pnpm install
    ```

3.  **Configurer les variables d'environnement :**
    Créez un fichier `.env` à la racine du projet (au même niveau que `package.json`) et ajoutez les variables suivantes :

    ```dotenv
    VITE_API_BASE_URL=http://localhost:5000/api
    VITE_IMAGES_BASE_URL=http://localhost:5000
    ```

4.  **Lancer l'application en mode développement :**
    ```bash
    pnpm dev
    ```
    L'application sera accessible sur `http://localhost:5173` (ou un autre port disponible).

5.  **Construire pour la production :**
    ```bash
    pnpm build
    ```

## 📂 Structure du Projet

```
    .
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── public
│   └── vite.svg
├── README.md
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── admin
│   │   │   └── AdminProtectedRoute.jsx
│   │   ├── Candidate
│   │   │   ├── CandidateCard.jsx
│   │   │   ├── CandidateForm.jsx
│   │   │   └── CandidateList.jsx
│   │   ├── common
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Table.jsx
│   │   └── ui
│   │       ├── Footer.jsx
│   │       └── Navbar.jsx
│   ├── context
│   │   └── AuthContext.jsx
│   ├── hooks
│   │   └── useAuth.js
│   ├── main.jsx
│   ├── pages
│   │   ├── AdminPage.jsx
│   │   ├── CandidateManagementPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── VotePage.jsx
│   ├── services
│   │   ├── admin.js
│   │   ├── api.js
│   │   ├── auth.js
│   │   └── Candidate.js
│   └── utils
│       ├── constants.js
│       └── helpers.js
└── vite.config.js
```