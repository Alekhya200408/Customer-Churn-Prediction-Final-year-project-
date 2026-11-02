
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Layout from "./components/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import History from "./pages/History";

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;
