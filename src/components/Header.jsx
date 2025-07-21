import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // const handleSearch = (e) => {
  //   if (e.key === "Enter") {
  //     navigate(`/rooms?search=${encodeURIComponent(searchTerm)}`);
  //     setSearchTerm("");
  //   }
  // };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <Link to="/">BookMyRoom</Link>
      </h1>

      {/* <input
        type="text"
        placeholder="Search rooms..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
        className="p-2 border border-gray-300 rounded text-black w-full max-w-md"
      /> */}

      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/rooms" className="hover:underline">Rooms</Link>

        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}
