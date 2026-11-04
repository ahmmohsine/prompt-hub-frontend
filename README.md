# Prompt Hub — Frontend

Application Angular pour **Prompt Hub** : partager et découvrir des prompts (liste, création, édition, suppression, catégories, votes).

Projet réalisé pendant ma formation Angular, en suivant la [vidéo de la formation](https://youtu.be/3llJm3LO1e4).

## Technologies

- **Angular 21** : composants standalone, signals, nouveau control flow (`@if`, `@for`)
- **PrimeNG 21** : librairie de composants, avec le thème Aura personnalisé en indigo
- **PrimeFlex** : classes utilitaires CSS
- **PrimeIcons** : icônes
- **Reactive Forms** : formulaires avec validation
- **RxJS** : requêtes HTTP vers l'API

## Fonctionnalités

- Affichage de la liste des prompts
- Création et modification d'un prompt (formulaire avec validation)
- Suppression d'un prompt
- Copie du contenu d'un prompt dans le presse-papiers
- Choix d'une catégorie
- Authentification : connexion, création de compte, déconnexion
- Session conservée après un rechargement de la page (appel à `/auth/me` au démarrage)

## Structure du projet

```
src/app/
├── auth/
│   ├── auth-form/      # Formulaire de connexion / inscription
│   ├── interceptors/   # Intercepteur HTTP (envoi du cookie avec withCredentials)
│   ├── models/         # Modèle CurrentUser
│   └── services/       # AuthService (login, register, me)
├── navbar/             # Barre de navigation
└── prompts/
    ├── components/
    │   ├── prompt-list/   # Liste des prompts
    │   ├── prompt-card/   # Carte d'un prompt
    │   └── prompt-form/   # Formulaire de création / édition
    ├── models/         # Modèles Prompt et Category
    └── services/       # PromptService, CategoryService
```

## Routes

| URL | Page |
|-----|------|
| `/prompts` | Liste des prompts |
| `/prompts/create` | Créer un prompt |
| `/prompts/:promptId/edit` | Modifier un prompt |
| `/auth` | Connexion / inscription |

## Lancer le projet

### 1. Le backend

Le frontend a besoin de l'API [prompt-hub-backend](https://github.com/GaetanRouzies/prompt-hub-backend) (NestJS, port 3000).

Dans le dossier du backend :

```bash
npm install
npm run start:auth:dev
```

> `start:auth:dev` lance l'API **avec authentification** et la redémarre automatiquement quand un fichier change.
> Pour la lancer sans authentification : `npm run start:dev`.

### 2. Le frontend

Dans un **autre terminal**, dans le dossier du frontend :

```bash
npm install
npm start
```

Puis ouvre [http://localhost:4200](http://localhost:4200).

## Configuration

L'adresse de l'API se trouve dans `src/environments/environment.development.ts` :

```ts
apiUrl: 'http://localhost:3000'
```

## Autres commandes

| Commande | Rôle |
|----------|------|
| `npm run build` | Construit l'application pour la production |
| `npm test` | Lance les tests |
| `npm run format` | Met en forme le code avec Prettier |