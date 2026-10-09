# Sultan — Online Store (E-Commerce Web App)

A feature-rich e-commerce web application built for browsing household goods, multi-level product filtering, cart management, and full catalog administration.

---

## 🏗️ Architecture & Engineering Approach

- **Component-Driven SPA:** Built with React 18 and React Router DOM, focusing on clean separation of concerns and modular component structure.
- **State & Data Synchronization:** Centralized global state management via Redux Toolkit, synchronized bidirectionally with persistent storage (Firebase Firestore & LocalStorage).
- **Quality Assurance:** Covered with unit and integration tests using Jest and React Testing Library.
- **Type Safety:** Strongly typed with TypeScript across components, hooks, and state slices.

---

## 🧰 Tech Stack

- **Core:** React 18, TypeScript
- **Routing:** React Router DOM (v5)
- **State Management:** Redux Toolkit, React Redux
- **Backend & Database:** Firebase (Firestore persistence, database backup/restore features)
- **Styling:** SASS / SCSS
- **Testing:** Jest, React Testing Library, ts-jest
- **UI & Libraries:** Swiper, React Star Ratings, React Toastify, React Icons
- **Tooling:** Axios, Lodash, ESLint, Prettier, gh-pages

---

## ✨ Key Features & Highlights

- **Advanced Catalog & Multi-Level Filtering:** Dynamic filtering by product purpose, price ranges, and manufacturer brands, featuring internal text search and input validation.
- **Cart & Persistence Engine:** Real-time cart synchronization, quantity adjustments, and state persistence via LocalStorage.
- **Comprehensive Admin Panel (`/admin`):** Full CRUD operations for products, input validation, real-time Firebase sync, and a database restore feature (clearing data and seeding from a JSON backup).
- **Robust UX Elements:** Promotional sliders (`Swiper`), customer reviews, instant toast notifications, and custom 404 routing.

---

## 👨‍💻 Engineering Contributions

- Designed and implemented the complete application architecture and state-sync lifecycle between Redux, LocalStorage, and Firebase.
- Developed complex multi-level filtering and sorting algorithms for the product catalog.
- Built a secure administrative dashboard with CRUD operations and database snapshot restoration.
- Wrote unit and integration test suites using Jest and React Testing Library to ensure core logic reliability.

---

## 🚀 Local Setup

Clone the repository and install dependencies to run the project locally:

```bash
# Clone the repository
git clone https://github.com/Elon26/sultan-webshop.git

# Install dependencies
npm install

# Run tests
npm test

# Run the development server
npm start
