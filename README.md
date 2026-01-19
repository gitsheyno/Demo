# Product Listing Demo

A demo application built with **Vue 3**, **TypeScript**, and **Tailwind CSS** to showcase a production-ready product listing experience.

The project focuses on clean component architecture, UX best practices, accessibility, and maintainable frontend patterns.

---

## Features

- Product list fetched from API
- Search with debounced requests
- Pagination with accessible controls
- Product cards with:
  - Discount badge (shown only for discounts ≥ 5%)
  - Limited stock indicator
  - Out-of-stock state with disabled actions
- Reusable UI components:
  - Button
  - Badge
  - Pagination
  - Rating
  - Price
  - SearchInput
- Storybook documentation for isolated component development
- Accessibility considerations:
  - Proper labels
  - ARIA attributes
  - Keyboard-friendly interactions

---

## Architecture Notes

- Components are separated into **stateless UI components** and **stateful container components**
- API calls are isolated in service functions
- Shared configuration values are centralized
- Visual states (discount, limited, out of stock) are expressed semantically
- No hardcoded API URLs (Vite proxy used for local development)

---

## Possible Improvements

The following enhancements could be added if the project were to be extended further:

- Introduce global state management using **Pinia** (e.g. cart, filters, shared UI state)
- Add category-based filtering with a dropdown selector
- Implement a dedicated **product details page**
- Add a reusable **toast/notification system** for user feedback
- Implement a real **shopping cart flow** (add/remove items, quantity management)

---

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Tailwind CSS
- Vite
- Storybook (Docs, A11y, Vitest)

---

## Requirements

- Node.js ≥ 18
- npm

---

## Installation

```bash
npm install
```

## Run

```bash
npm run dev
```

## Run Tests

```bash
npm run test
```

## Run Storybook

```bash
npm run storybook
```
