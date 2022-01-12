import "./App.css";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import ProductsPage from "./pages/products/ProductsPage";
import { SnackbarProvider } from "notistack";

const App = () => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </SnackbarProvider>
  );
};

export default App;
