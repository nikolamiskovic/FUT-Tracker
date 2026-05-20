import { Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <FavoritesProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route
          path="*"
          element={<main className="page"><p>Sidan hittades inte.</p></main>}
        />
      </Routes>
    </FavoritesProvider>
  );
}

export default App;