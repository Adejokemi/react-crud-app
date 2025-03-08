import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditItem from "./pages/EditItem";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import ItemDetails from "./pages/ItemsDetails";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <React.Fragment>
        <div className="min-h-screen bg-gray-100 text-gray-900">
          <ToastContainer autoClose={3000} />
          <Navbar />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/item/:id" element={<ItemDetails />} />
              <Route path="/edit/:id" element={<EditItem />} />
            </Routes>
          </div>
        </div>
      </React.Fragment>
    </QueryClientProvider>
  );
}

export default App;
