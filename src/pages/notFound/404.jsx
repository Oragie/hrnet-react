// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="p-10 text-center">
      <h2 className="text-4xl font-bold text-red-600 mb-4">404</h2>
      <p className="mb-4">Page non trouvée.</p>
      <Link to="/" className="text-blue-500 underline">
        Retour à l’accueil
      </Link>
    </div>
  );
}

export default NotFound;
