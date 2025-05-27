# 💼 HRnet React - Conversion jQuery → React

> Projet de modernisation front-end de l'application RH interne de WealthHealth

---

## 🎯 Objectif

- Convertir l'application interne **HRnet** de **jQuery → React**
- Remplacer les anciens plugins jQuery (modale, datepicker, dropdown, table)
- Créer et publier **un composant React personnalisé** à partir d’un des plugins jQuery
- Fournir un **rapport Lighthouse** comparatif avant/après

---

## 🔧 Plugin jQuery converti : **Modal**

> Conversion d'un ancien plugin jQuery de fenêtre modale vers un **composant React réutilisable**

### ✅ Fonctionnalités du composant

- Affichage conditionnel (`isOpen`)
- Fermeture clavier (Esc), clic extérieur, bouton
- Support de focus accessible (`aria-label`, `role="dialog"`)
- Composant stylisé en SCSS mais facilement thémable

### 🔗 Liens :

- 📦 **Package GitHub :** [github.com/Oragie/React-modal-lib](https://github.com/Oragie/React-modal-lib)
- 🧰 **Publication NPM :** [npmjs.com/package/@oragie/react-modal-lib](https://www.npmjs.com/package/@oragie/react-modal-lib)

---

## 🗃️ Application HRnet complète

L'application HRnet a été entièrement réécrite avec :

- **React 18 + Vite**
- **Zustand** pour la gestion d’état global
- Composants réactifs, accessibles et modulaires
- SCSS + variables pour un thème accessible (contrasté)
- Formulaires (`Create Employee`) et tableaux (`Employee List`)

### 🔗 Lien du repo complet :

> [https://github.com/Oragie/hrnet-react](https://github.com/Oragie/hrnet-react)

---

## 📈 Rapport de performance Lighthouse

### ✅ Scores (post-conversion) :

| Critère          | Score |
| ---------------- | ----- |
| Performances     | 100   |
| Accessibilité    | 100   |
| Bonnes pratiques | 100   |
| SEO              | 100   |

> 📄 **Fichiers joints :**

- `./Avant_Jquery-HRNet_Lighthouse.pdf` (ancienne version jQuery)
- `./Après_React-HRNet_Lighthouse.pdf` (nouvelle version React)

---

## 👩‍💻 Stack utilisée

- React 18
- Zustand
- Sass/SCSS modulaire
- `@hrnet-react/modal` (custom)
- `react-datepicker`, `react-select` , `react-table`'
- Vite

---

## ✅ Accessibilité

- Contrastes validés WCAG AA
- Structure logique du DOM
- Modale avec `role="dialog"` + gestion clavier + `aria-label`
- Navigation clavier complète

---

## 📄 Structure du projet

- `src/components/Modal` → composant React modulaire
- `src/pages/CreateEmployee.jsx` → formulaire accessible
- `src/pages/EmployeeList.jsx` → tableau dynamique avec pagination
- `src/store` → état global (Zustand)

---

## ✍️ Auteur

Développé par **Oragie** pour WealthHealth  
📫 Contact : [Oragie_silverhand@hotmail.com]

---

## 📜 Licence

MIT – libre d'utilisation et de modification.
