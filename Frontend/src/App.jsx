import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Layout from "./components/Layout";

// Authentication
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

// Pages
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import History from "./pages/History";
import Result from "./pages/Result";
import CustomerDetails from "./pages/CustomerDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />

          <Route
            path="/prediction"
            element={
              <Layout>
                <Prediction />
              </Layout>
            }
          />

          <Route
            path="/history"
            element={
              <Layout>
                <History />
              </Layout>
            }
          />

          <Route
            path="/history/:id"
            element={
              <Layout>
                <CustomerDetails />
              </Layout>
            }
          />

          <Route
            path="/result"
            element={
              <Layout>
                <Result />
              </Layout>
            }
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;