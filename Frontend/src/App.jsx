
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Layout from "./components/Layout";

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

        {/* Dashboard Page */}
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        {/* New Prediction Page */}
        <Route
          path="/prediction"
          element={
            <Layout>
              <Prediction />
            </Layout>
          }
        />

        {/* Prediction History Page */}
        <Route
          path="/history"
          element={
            <Layout>
              <History />
            </Layout>
          }
        />

        {/* Individual Customer Details */}
        <Route
          path="/history/:id"
          element={
            <Layout>
              <CustomerDetails />
            </Layout>
          }
        />

        {/* Prediction Result Page */}
        <Route
          path="/result"
          element={
            <Layout>
              <Result />
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
