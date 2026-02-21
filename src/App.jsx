import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Products from "./pages/Products/Products";
import CreateProduct from "./pages/Products/CreateProduct";
import EditProduct from "./pages/Products/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>

        <Route path="/" element={<Products />} />

        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;