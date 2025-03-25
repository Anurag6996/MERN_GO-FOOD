import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../components/ContextReducer";
import Cart from "../screens/Cart"; // Import Cart for overlay

export default function Navbar() {
  const { state } = useCart();
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [showCart, setShowCart] = useState(false); // State for cart overlay
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthToken(localStorage.getItem("authToken"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("authToken");
      setAuthToken(null);
      window.location.reload();
      navigate("/login");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success px-3">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto">
              <Link className="nav-link fs-5" to="/">Home</Link>
              {authToken && <Link className="nav-link fs-5" to="/myorders">My Orders</Link>}
            </div>

            <div className="d-flex align-items-center">
              {authToken ? (
                <>
                  {/* My Cart Button - Opens Overlay */}
                  <button
                    className="btn btn-light text-success mx-2 px-3 position-relative"
                    onClick={() => setShowCart(true)} // Open overlay
                  >
                    My Cart
                    {state.cartCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {state.cartCount}
                      </span>
                    )}
                  </button>

                  <button className="btn btn-outline-light px-3" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link className="btn btn-light text-success mx-2 px-3" to="/login">Login</Link>
                  <Link className="btn btn-outline-light px-3" to="/creatuser">Signup</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Overlay Component */}
      {showCart && <Cart closeCart={() => setShowCart(false)} />}
    </>
  );
}
