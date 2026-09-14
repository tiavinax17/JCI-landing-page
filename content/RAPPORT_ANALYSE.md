# Rapport d'analyse — JCI Madagascar Landing Page

Analyse des 11 maquettes PDF du dossier `content/` et de l'état actuel du code React (`src/`).

---

## 1. Pages identifiées (maquettes PDF)

| # | Fichier PDF | Route probable | Contenu principal |
|---|---|---|---|
| 1 | `Accueil.pdf` | `/` | Hero + mission/vision/credo, cadres d'action, programmes, stats (36 ans/384 membres/14 OL), actualités & événements, partenaires, CTA "Devenir membre" |
| 2 | `Historique.pdf` | `/jci-madagascar/historique` | Texte historique, stats, **timeline/frise chronologique** des présidents nationaux (liste répétée d'entrées avec nom, titre, année) |
| 3 | `Nos valeurs.pdf` | `/jci-madagascar/valeurs` | Le Credo (texte long en 5 blocs), Mission, Vision |
| 4 | `Bureau national 2026.pdf` | `/jci-madagascar/bureau-national` | Grille de **cartes membres** (photo, nom, poste) — 14 membres |
| 5 | `Nos programmes.pdf` | `/jci-madagascar/programmes` | Intro + liste de 4 programmes (JMA, Art Oratoire & Débat, TOYP, CYE), section détail par programme |
| 6 | `Sénat.pdf` | `/jci-madagascar/senat` | Texte "Le titre de Sénateur JCI" + "Objectifs d'un sénateur" en 2 colonnes |
| 7 | `Organisations locales.pdf` | `/organisations-locales` | Page hub avec filtres (Tout / Zone Nord / Zone Centre / Zone Sud), présentation, 3 liens vers zones |
| 8 | `zone nord.pdf` (+ centre/sud, non fournis mais même gabarit) | `/organisations-locales/zone-nord` | Présentation VP zone, liste des 6 OL (logos), bloc "bureau local" (cartes membres), "projets locaux", **événements filtrés**, coordonnées OL |
| 9 | `Blog.pdf` | `/blog` | Identique à Accueil pour le bloc actualités, mais en **liste paginée complète** (grille de EventCard + pagination `1 2 3 ... 10`) |
| 10 | `Partenaires.pdf` | `/partenaires` | Liste de blocs "Partenaire type" alternés (image + texte), répétés |
| 11 | `contact.pdf` | `/contact` | Coordonnées (adresse/tél/email) + **formulaire de contact** (nom, email, téléphone, message, bouton Envoyer) |

**Éléments transverses identiques sur toutes les pages** (déjà en partie codés) :
- Header flottant (recherche, sélecteur langue FR/EN, bouton "Boutique en ligne")
- Navbar/Sidebar flottante gauche (logo, liens, réseaux sociaux, bouton "Devenir membre")
- Sous-navigation secondaire par section (ex: HISTORIQUE / NOS VALEURS / BUREAU NATIONAL / NOS PROGRAMMES / JCI IN BUSINESS / JCI RISE / SÉNAT) présente sur toutes les pages "JCI Madagascar"
- Footer complet (Liens utiles, Dernières articles, Informations légales, Partenaires, Nous contacter, copyright)

---

## 2. Composants UI déjà existants (réutilisables tels quels)

Situés dans `src/components/ui/` :

| Composant | Rôle | Props | Remarque |
|---|---|---|---|
| `H1.jsx` | Titre principal | `children` | Style fixe (couleur noire) — à généraliser (voir §4) |
| `H2.jsx` | Sous-titre | `children` | Couleur bleue fixe |
| `LabelTrait.jsx` | Petit label + trait jaune décoratif | `children` | Utilisé en en-tête de section ("QUI SOMMES-NOUS", "NOS PROGRAMMES", etc. dans les maquettes) |
| `ButtonFull.jsx` | Bouton plein (jaune) avec lien | `children`, `path` | Utilisé pour "Boutique en ligne", "J'adhère", CTA principaux |
| `ButtonVoid.jsx` | Bouton outline | `children`, `TextColor` | Utilisé pour "Devenir membre" |
| `EventCard.jsx` | Carte actualité/événement | `Img`, `Day`, `Month`, `Type`, `Title`, `Content` | Correspond exactement aux cartes "Event/Actus" vues sur Accueil, Blog, Organisations locales, Zone Nord |

Composants layout dans `src/components/layout/` :

| Composant | État | Remarque |
|---|---|---|
| `Header.jsx` | Fonctionnel | Sélecteur langue + bouton boutique. Génériq., réutilisable partout |
| `Navbar.jsx` | Fonctionnel mais liens non branchés (`<Link>` sans `to`) | Structure ok, à connecter au router + état "actif" dynamique |
| `Footer.jsx` | **Placeholder vide** (`<div>Footer</div>`) | À construire entièrement — contenu visible dans chaque PDF (4 colonnes + bandeau copyright) |

---

## 3. Nouveaux composants UI à créer

D'après la récurrence dans les maquettes, ces composants n'existent pas encore et devraient être créés pour éviter la duplication :

### Composants de contenu
- **`SubNav` / `SectionTabs`** — sous-navigation horizontale (HISTORIQUE, NOS VALEURS, BUREAU NATIONAL…) présente sur toutes les pages "JCI Madagascar"
- **`StatBlock`** — bloc chiffre-clé (ex: "36 ANS", "384 membres", "14 OL") réutilisé sur Accueil et Historique
- **`MemberCard`** — carte membre du bureau (photo, nom, prénom, poste) — utilisée sur Bureau National, Zone Nord/Centre/Sud (bureau local)
- **`TimelineItem` / `TimelineList`** — entrée chronologique (nom, titre, année) pour la page Historique
- **`ProgramCard` / `ProgramListItem`** — item de programme (JMA, Art Oratoire, TOYP, CYE) avec état actif/sélectionné
- **`ValueCredoBlock`** — bloc "Que la foi en Dieu…" (titre + paragraphe), répété 5 fois sur Nos Valeurs
- **`PartnerBlock`** — bloc partenaire alterné image/texte (Partenaires.pdf) avec variante gauche/droite
- **`LocalOrgCard`** — carte "Organisation Locale" (logo + nom) utilisée sur Organisations Locales / Zone Nord
- **`ContactForm`** — formulaire complet (Nom, Email, Téléphone, Message, bouton Envoyer) avec inputs stylés
- **`ContactInfoBlock`** — bloc coordonnées (adresse, tél, email) affiché sur Contact et sur chaque page Zone
- **`ZoneFilterTabs`** — filtres "Tout / Zone Nord / Zone Centre / Zone Sud" (Organisations Locales)
- **`Pagination`** — pagination numérotée (`1 2 3 ... 10`) vue sur Blog
- **`SocialIconsRow`** — regroupement des icônes réseaux sociaux (déjà dans Navbar mais mérite d'être extrait, réutilisé aussi dans Footer)

### Composants de formulaire (bas niveau, pour construire `ContactForm`)
- **`InputField`** — input texte/email/tel avec label flottant
- **`TextAreaField`** — zone de message

### Génériques UI
- **`Badge`** — étiquette type "EVENT" / "ACTUS" (actuellement codée en dur dans `EventCard`, pourrait être extraite si réutilisée ailleurs)
- **`Breadcrumb`** — non visible explicitement mais probable pour pages profondes (zones, organisations locales)

---

## 4. Points d'attention sur les composants existants

- `H1` et `H2` ont des couleurs de texte **codées en dur** (`text-jci-black`, `text-jci-blue`). Sur fond sombre (ex. page Accueil sur fond teal), le texte doit être blanc — prévoir une prop `color` ou variante.
- `ButtonFull` : prop `path` utilisée avec `react-router` `Link`, mais pas de gestion de lien externe/ancre `#` propre (actuellement utilisé avec `path="#"` dans `Header`).
- `Navbar` : les `<Link>` n'ont pas de `to`, le style "actif" (`text-jci-yellow` sur Accueil) est codé en dur plutôt que dérivé de la route active (`useLocation`/`NavLink`).
- `Footer` est vide — bloquant pour toutes les pages car il apparaît sur chaque maquette.
- `AcceuilPage.jsx` contient du code de test (couleurs de debug `bg-green-500`, `bg-red-500`, image de test) à nettoyer avant intégration finale.

---

## 5. Structure de pages/route à prévoir

Basé sur les maquettes, arborescence de routes suggérée (actuellement seule `/` existe dans `src/routes/index.jsx`) :

```
/                                   → AcceuilPage (existe)
/jci-madagascar/historique          → HistoriquePage
/jci-madagascar/valeurs             → ValeursPage
/jci-madagascar/bureau-national     → BureauNationalPage
/jci-madagascar/programmes          → ProgrammesPage
/jci-madagascar/senat               → SenatPage
/organisations-locales              → OrganisationsLocalesPage
/organisations-locales/zone-nord    → ZoneNordPage
/organisations-locales/zone-centre  → ZoneCentrePage
/organisations-locales/zone-sud     → ZoneSudPage
/blog                               → BlogPage
/blog/:slug                         → BlogDetailPage (probable, non maquetté)
/partenaires                        → PartenairesPage
/contact                            → ContactPage
```

Dossier `src/pages/public/` ne contient actuellement que `AcceuilPage.jsx` — toutes les autres pages ci-dessus sont à créer.

---

## 6. Structure des composants (état actuel vs cible)

```
src/components/
├── layout/
│   ├── Header.jsx        ✅ fonctionnel
│   ├── Navbar.jsx         ⚠️ à connecter (routes + état actif)
│   ├── Footer.jsx         ❌ à construire (placeholder vide)
│   └── SubNav.jsx          ➕ à créer
├── ui/
│   ├── ButtonFull.jsx     ✅
│   ├── ButtonVoid.jsx     ✅
│   ├── EventCard.jsx      ✅
│   ├── H1.jsx             ✅ (à généraliser couleur)
│   ├── H2.jsx             ✅ (à généraliser couleur)
│   ├── LabelTrait.jsx     ✅
│   ├── StatBlock.jsx       ➕ à créer
│   ├── MemberCard.jsx      ➕ à créer
│   ├── TimelineItem.jsx    ➕ à créer
│   ├── ProgramCard.jsx     ➕ à créer
│   ├── ValueCredoBlock.jsx ➕ à créer
│   ├── PartnerBlock.jsx    ➕ à créer
│   ├── LocalOrgCard.jsx    ➕ à créer
│   ├── ContactForm.jsx     ➕ à créer
│   ├── ContactInfoBlock.jsx➕ à créer
│   ├── ZoneFilterTabs.jsx  ➕ à créer
│   ├── Pagination.jsx      ➕ à créer
│   ├── InputField.jsx      ➕ à créer
│   └── TextAreaField.jsx   ➕ à créer
```

---

## 7. Design system repéré

Couleurs custom Tailwind (`src/index.css`, bloc `@theme`) :
- `jci-black` `#130F2D`
- `jci-blue` `#0097D7`
- `jci-white` `#FFFFFF`
- `jci-navy` `#1F4789`
- `jci-teal` `#57BCBC`
- `jci-yellow` `#EFC40F`

Polices : `Poppins` (texte courant) et `Roboto` (probable, utilisé dans `H1`/`H2`/`Navbar` via `font-roboto`).

Dépendances déjà installées utiles : `lucide-react` et `react-icons` (icônes), `react-router` (routing).

---

## 8. Prochaines étapes proposées

1. Construire le `Footer` (composant manquant présent sur toutes les pages).
2. Créer le `SubNav`/`SectionTabs` pour les pages "JCI Madagascar".
3. Créer les composants UI listés en §3, en commençant par `MemberCard` (réutilisé 2x : Bureau National + Zones) et `ContactForm`.
4. Mettre en place les routes manquantes dans `src/routes/index.jsx` et créer les pages correspondantes dans `src/pages/public/`.
5. Nettoyer `AcceuilPage.jsx` (retirer couleurs de debug et image de test).

*(Fichiers PDF texte-extraits temporairement pour cette analyse, supprimés après lecture — aucun fichier ajouté au dossier `content/` autre que ce rapport.)*
