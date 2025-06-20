# API de Gestion de Vote

Cette API permet la gestion d’un système de vote en ligne, incluant l’authentification des votants, la gestion des candidats et le vote sécurisé.

## Prérequis

-  Node.js
-  MongoDB
-  pnpm (ou npm/yarn)
-  Un fichier `.env` avec au minimum :
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=1h
   PORT=5000
   ```

## Installation

```sh
cd Backend
pnpm install
```

## Lancement du serveur

```sh
pnpm start
```

Le serveur démarre par défaut sur `http://localhost:5000`.

## Endpoints principaux

### Authentification

-  **Inscription**

   -  `POST /api/auth/signup`
   -  Corps :
      ```json
      {
         "email": "user@example.com",
         "password": "password",
         "firstName": "John",
         "lastName": "Doe",
         "dateOfBirth": "1990-01-01",
         "gender": "male",
         "country": "France",
         "city": "Paris"
      }
      ```

-  **Connexion**

   -  `POST /api/auth/login`
   -  Corps :
      ```json
      {
         "email": "user@example.com",
         "password": "password"
      }
      ```

-  **Déconnexion**
   -  `POST /api/auth/logout`
   -  Header : `Authorization: Bearer <token>`

### Candidats (protégé par authentification)

-  **Créer un candidat**

   -  `POST /api/candidates`
   -  Corps :
      ```json
      {
         "fullName": "Jane Doe",
         "age": 35,
         "image": "https://url/image.jpg",
         "description": "Description optionnelle",
         "slogan": "Pour un avenir meilleur",
         "party": "Indépendant"
      }
      ```

-  **Lister tous les candidats**

   -  `GET /api/candidates`

-  **Obtenir un candidat par ID**

   -  `GET /api/candidates/:id`

-  **Mettre à jour un candidat**

   -  `PUT /api/candidates/:id`

-  **Supprimer un candidat**

   -  `DELETE /api/candidates/:id`

-  **Voter pour un candidat**
   -  `PATCH /api/candidates/:id/vote`
   -  Header : `Authorization: Bearer <token>`

## Sécurité

-  Authentification par JWT.
-  Un votant ne peut voter qu’une seule fois (`hasVoted`).

## Structure des dossiers

Voir l’arborescence du projet pour plus de détails sur l’organisation des fichiers.

```
package.json
├── pnpm-lock.yaml
├── README.md
├── server.js
└── src
    ├── config
    │   └── database.js
    ├── controllers
    │   ├── auth-controller.js
    │   └── candidate-controller.js
    ├── middleware
    │   └── auth-middleware.js
    ├── models
    │   ├── candidate-model.js
    │   └── voters-model.js
    └── routes
        ├── auth-routes.js
        └── candidate-routes.js
```

---
