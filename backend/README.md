# Backend YELE Immobilier

API Node.js avec Express, MongoDB et Mongoose. L’API de lecture des biens est publique; la création, la modification et la suppression requièrent une session administrateur.

## Configuration

1. Installer les dépendances avec `npm install`.
2. Copier `.env.example` vers `.env` et configurer MongoDB.
3. Générer un hash bcrypt pour le mot de passe administrateur après l’installation:

   ```sh
   node -e "require('bcryptjs').hash(process.argv[1], 12).then(console.log)" "votre-mot-de-passe-long-et-unique"
   ```

4. Mettre le hash obtenu dans `ADMIN_PASSWORD_HASH`, choisir `ADMIN_USERNAME`, et définir un `JWT_SECRET` aléatoire d’au moins 32 caractères. Ne jamais mettre ces valeurs dans les variables `VITE_*` ni les committer.
5. Adapter `CORS_ORIGINS` aux origines exactes de l’interface admin, puis lancer `npm run dev`.
6. Pour le stockage photo, ajouter `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` et `CLOUDINARY_API_SECRET` depuis le tableau de bord Cloudinary dans `backend/.env`. Ne jamais exposer ni committer `CLOUDINARY_API_SECRET`.

Ne réutilisez pas des identifiants ou secrets d’exemple: `.env.example` contient uniquement des valeurs factices. Gardez les identifiants réels dans le fichier `.env`, qui est ignoré par Git.

La session est un cookie `HttpOnly`, `SameSite=Strict`, valable huit heures. En production, le cookie nécessite HTTPS. La route de connexion est limitée à 10 tentatives par adresse IP sur 15 minutes.

## Routes

- `POST /api/auth/login`: connexion avec `{ "username": "...", "password": "..." }`.
- `GET /api/auth/session`: vérifier la session active.
- `POST /api/auth/logout`: fermer la session.
- `GET /api/properties` et `GET /api/properties/:id`: consulter les biens sans connexion.
- `POST /api/properties`, `PUT /api/properties/:id`, `DELETE /api/properties/:id`: opérations administrateur protégées.
- `POST /api/uploads/project-image`: téléverser une photo vers Cloudinary avec un cookie admin; envoyer un fichier multipart dans le champ `image`.

Le tableau « Mes projets » de l’interface admin lit et crée les biens via ces routes. Les photos (maximum 5 Mo) sont téléversées par le backend vers Cloudinary; MongoDB ne conserve que leur URL sécurisée.