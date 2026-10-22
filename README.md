# YELE IMMOBILIER

## Déploiement

Le dépôt contient trois applications indépendantes : `frontend/` (site public) et `admin/` (tableau de bord) sont hébergés séparément sur Vercel; `backend/` est l’API Node/Express hébergée sur Render.

### Avant publication

- Ne jamais committer `.env`, les clés Cloudinary, le hash du mot de passe admin ou le secret JWT. Les fichiers `.env` sont ignorés par Git.
- Régénérer les identifiants Cloudinary et remplacer le mot de passe administrateur ainsi que `JWT_SECRET` avant d’utiliser la production. En cas d’exposition passée d’une clé, la révoquer dans le fournisseur avant le déploiement.
- Créer une base MongoDB Atlas accessible depuis Render. L’URI MongoDB locale `mongodb://localhost:27017/...` ne fonctionne pas sur Render.
- Pour une session admin fiable dans les navigateurs qui bloquent les cookies tiers, utiliser des domaines personnalisés du même site, par exemple `www.exemple.com`, `admin.exemple.com` et `api.exemple.com`. L’API utilise `SameSite=None; Secure` en production, mais les domaines `vercel.app` et `onrender.com` restent considérés tiers par certains navigateurs.

### Render (backend)

1. Créer un Web Service depuis ce dépôt et utiliser le blueprint `render.yaml` (ou le répertoire racine `backend/`, `npm ci` et `npm start`).
2. Définir dans Render les variables `MONGODB_URI` (MongoDB Atlas), `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `JWT_SECRET`, `CORS_ORIGINS`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` et `CLOUDINARY_API_SECRET`.
3. Mettre `CORS_ORIGINS` à la liste exacte des origines des deux interfaces, séparées par des virgules, sans barre oblique finale. Exemple : `https://www.exemple.com,https://admin.exemple.com`.
4. Garder les secrets uniquement dans les variables Render. Le service écoute le port fourni par Render.

### Vercel (site public et admin)

Créer deux projets Vercel reliés au même dépôt :

| Projet | Root Directory | Build Command | Output Directory |
| --- | --- | --- | --- |
| Site public | `frontend` | `npm run build` | `dist` |
| Administration | `admin` | `npm run build` | `dist` |

Dans chacun, définir `VITE_API_URL` avec l’origine HTTPS de l’API Render (ou le domaine personnalisé de l’API), sans barre oblique finale. Ajouter les domaines de production exacts à `CORS_ORIGINS` sur Render. Les fichiers `vercel.json` de chaque application prennent en charge le routage SPA.

Les identifiants administrateur et les clés Cloudinary ne doivent jamais être définis comme variables `VITE_*`, car elles sont intégrées au code livré au navigateur.