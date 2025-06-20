import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, Menu, Search, X } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const navLinks = [
  { label: "Movies", type: "movie", to: "/" },
  { label: "Anime", type: "tv", to: "/" },
  { label: "Watchlist", type: null, to: "/watchlist" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { setContentType } = useContentStore();
  const location = useLocation();

  const handleNavClick = (type) => {
    if (type) setContentType(type);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-black/90 to-black/60 shadow-lg backdrop-blur-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/newlogo.png"
            alt="BingeBook Logo"
            className="w-32 sm:w-40 object-contain"
          />
        </Link>
        {/* Desktop Nav */}
        <div className="hidden sm:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => handleNavClick(link.type)}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-200 hover:text-pink-400 focus:text-pink-500 text-gray-200 ${
                location.pathname === link.to && (link.label === "Movies" || link.label === "Anime")
                  ? "decoration-pink-400"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link to="/search" className="hover:text-pink-400 transition-colors">
            <Search className="size-6 cursor-pointer" />
          </Link>
          <div className="relative group">
            <img
              src={user.image}
              alt="Avatar"
              className="h-9 w-9 border-2 border-pink-500 shadow-md object-cover cursor-pointer group-hover:scale-105 transition-transform"
            />
          </div>
          <button
            onClick={logout}
            title="Logout"
            className="p-2 rounded-full hover:bg-pink-600/80 transition-colors text-gray-200 hover:text-white"
          >
            <LogOut className="size-6" />
          </button>
          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 rounded-md hover:bg-gray-800/70 transition-colors"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>
      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/90 flex flex-col items-center justify-center gap-6 sm:hidden animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => handleNavClick(link.type)}
              className="text-2xl font-semibold text-gray-100 hover:text-pink-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-800/70"
            aria-label="Close menu"
          >
            <X className="size-7 text-gray-300" />
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
