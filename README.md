
# Marvel Tech Challenge

This repository contains a web application developed as part of a technical challenge. The application is built using modern web technologies, focusing on responsive design, clean architecture, and maintainable code. The application interacts with Marvel API, allowing the user to get information about its favorites Marvel characters.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Deployment](#deployment)
- [Testing](#testing)
- [Design](#design)
- [Screenshots](#screenshots)
- [License](#license)

---

## Getting Started

### Prerequisites

- [React](https://react.dev/) (v17 or later)
- [npm](https://www.npmjs.com/)
- CSS. Any component external library has been used to design components.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/marvel-tech-challenge.git
   cd marvel-tech-challenge
   ```

2. Install dependencies:

   ```bash
   npm install
   ```
3. Set environmental variables (.env). Follow .env.example format

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the application in your browser:

   ```
   http://localhost:5173
   ```

---

## Project Structure

The project follows a modular structure for scalability and maintainability. Below is an overview:

```plaintext
src/
│
├── api/                  # HTTP requests and API services
│   └── marvelService.ts
│
├── assets/               # Static resources (images, fonts, etc.)
│   ├── images/
│   ├── fonts/
|   ├── gif/
│   └── styles/
|       └── global.css    # Contains global variables for parametric CSS styles 
│
├── components/           # Reusable components
│   ├── Card/
│   │   ├── Card.tsx
│   │   ├── Card.test.tsx
│   │   └── Card.module.css
│   ├── ErrorBoundary/
│   ├── FailingComponent/
│   ├── Grid/
│   │   ├── GridLayout/
│   ├── LoadingBar/
│   └── SearchInput/
│
├── contexts/             # Contexts for global state management
│   ├── CharacterContext.tsx
│   ├── FavoritesContext.tsx
│   └── LoadingContext.tsx
│
├── hooks/                # Custom hooks
│   ├── useDebounce.ts
|   ├── useDebounce.test.tsx
│   ├── useFetch.ts
|   ├── useLocalStorage.ts 
│   └── useLocalStorage.test.tsx
│
├── layouts/              # Layout structures (Header, MainLayout)
│   ├── Header.tsx
|   ├── Header.module.css
│   ├── MainLayout.tsx
|   └── MainLayout.module.css
│
├── pages/                # Main application pages
│   ├── CharacterDetail/
│   ├── Favorites/
│   ├── Home/
│
├── routes/               # Routing and navigation
│   ├── AppRoutes.tsx
│   └── PrivateRoute.tsx
│
├── utils/                # Utilities and helper functions
│   ├── constants.ts
│   ├── helpers.ts
│   └── validations.ts
│
├── App.tsx               # Root component
├── main.tsx              # Entry point (renders App)
└── tsconfig.json         # TypeScript configuration
```

---

## Technologies Used

- **Frontend Framework**: React
- **Languages**: Javascript, Typescript
- **State Management**: Context API
- **Styling**: CSS Modules with CSS variables for theme management
- **HTTP Client**: Axios
- **Testing**: Jest, React Testing Library
- **Code Quality**: Prettier, ESLint
- **Deployment**: Vercel
- **Design Reference**: Figma

---

## Features

- Responsive Design
- API Integration with Marvel's database
- Favorites Management
- Character Detail Views
- Custom Hooks for API calls, local storage, and debouncing
- Error Boundaries for better UX
- Unit Tests for components and hooks

---

## Deployment

The application is deployed on [Vercel](https://vercel.com). You can access the live demo here:

[Live Application](https://bemobile-marvel-tech-challenge.vercel.app/)

---

## Testing

Unit tests are implemented for critical components and custom hooks using Jest and React Testing Library.

Run tests with:

```bash
npm test
```

---

## Design

The design is based on Figma wireframes, ensuring a clean and modern UI. It follows a component-based structure for reusability and consistency.

---

## Screenshots

![Home Page](https://github.com/user-attachments/assets/f9ac57d6-bb60-476c-8978-52a385bb3308)

![Character Detail](https://github.com/user-attachments/assets/abc7fd2b-03c3-4651-812f-17224c248977)

![Tablet design](https://github.com/user-attachments/assets/a8ea9d22-4135-4be8-8ae4-3ff217f315a4)

![Mobile design](https://github.com/user-attachments/assets/616cbbbe-fea0-4e4f-96a6-1f57c6bd4b6f)

---

## License

This project is licensed under the MIT License.
