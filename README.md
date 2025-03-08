# React CRUD App with Pagination

This is a simple React application that allows users to view, edit, and delete items from an API. It uses **React Router**, **TanStack Query (React Query)** for data fetching and caching, and **React Toastify** for notifications. The pagination dynamically updates and maintains a fixed number of visible page numbers.

## Features
- View a paginated list of items (10 items per page).
- Click an item to view full details.
- Edit an item with a form and save changes.
- Delete an item and update the list dynamically.
- Responsive pagination:
  - Shows **6 numbers** on large screens (e.g., `1 2 3 ... 8 9 10`).
  - Shows **"Page X of Y"** on small screens.
- Uses **React Query** for efficient data fetching and caching.
- **Toast notifications** for feedback.

## Tech Stack
- React.js
- React Router
- TanStack Query (React Query)
- React Toastify
- Tailwind CSS
- JSONPlaceholder API (Mock Data)


## Getting Started
### Follow these steps to set up and run the project locally.

Clone this repository to your local machine:
```
git clone https://github.com/Adejokemi/react-crud-app.git
``` 

### Move to the cloned directory
```
cd react-crud-app
``` 

### Install dependencies:
```
npm install
```

### Start the local Server:
```
npm run dev
```

Access the app at http://localhost:5173 (default Vite port).