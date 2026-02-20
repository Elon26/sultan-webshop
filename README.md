# Sultan — Online Store

A modern e-commerce web application for browsing household goods, managing a shopping cart, and administering the product catalog.

## Overview

Sultan is a full-featured online store that provides product browsing, filtering, cart management, and an admin interface for managing the catalog.  
The application is designed with a responsive layout and focuses on predictable state management and data persistence.

## Tech Stack

- React  
- TypeScript  
- Redux  
- Firebase  
- Jest  
- React Testing Library  

## Pages

- Home  
- Catalog  
- Product Details  
- Cart  
- Admin Panel  

## Data Model & State Management

- The application operates on two core entities:
  - `catalog` — product list  
  - `cart` — user-selected items  

- Persistent storage:
  - Product catalog is stored in Firebase  
  - Cart state is persisted in LocalStorage  

- In-session state:
  - Both entities are stored in Redux to provide global access across the application  
  - Any change to catalog or cart is synchronized between Redux and persistent storage  

## General UI & UX

- Fully responsive layout aligned with the design system  
- 404 page for unknown routes  
- Global loading states and spinners for async operations  
- Toast notifications for all meaningful user actions  
- Header displays:
  - Total number of items in the cart  
  - Total cart price  
- All core functions are documented using JSDoc  

## Home Page

- Promotional slider with current offers  
- Customer reviews section  

## Catalog

- Displays all products fetched from the database  
- Product cards link to individual product pages  
- Sorting:
  - By name (ascending / descending)  
  - By price (ascending / descending)  

- Filtering:
  - Primary filter by product purpose (e.g. dishwashing, fruit washing, etc.)  
  - Secondary filters by price range and manufacturer  
  - Two-level filtering is supported (e.g. filter by purpose first, then refine by price and brand)  
  - Filter options are dynamically generated based on available products  
  - Manufacturer list is dynamically updated based on selected purpose  
  - Manufacturer filter includes internal text search  
  - Price filter includes input validation to prevent invalid ranges  

- Cart interactions:
  - "Add to Cart" adds one unit of the product  
  - After adding, the button transforms into a shortcut link to the cart  

## Product Page

- Displays full product details fetched from the database  
- Quantity selector for adding multiple items to the cart  
- "Add to Cart" adds the selected quantity  
- After adding, the button transforms into a shortcut link to the cart  

## Cart

- Displays all selected products and total price  
- Users can:
  - Change item quantities  
  - Remove items from the cart  
- All cart updates are persisted in LocalStorage and reflected globally  
- Checkout action:
  - Shows a confirmation modal  
  - Clears the cart state  

## Admin Panel

- Admin panel route: `/admin`  
- Provides full CRUD operations for products  
- Supports restoring the database to the default state:
  - Clears all existing products from Firebase  
  - Restores catalog from a predefined JSON backup  
- Product creation and editing include validation to prevent invalid input  
- All admin actions are immediately synchronized with Firebase  

## Testing

- Core functionality is covered with unit and integration tests  
- Test suite is implemented with Jest and React Testing Library  

## Local Setup

1. Clone the repository  
2. Install dependencies  
3. Configure Firebase credentials  
4. Start the development server  

