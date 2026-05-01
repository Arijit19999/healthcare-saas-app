import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useAuth } from '../hooks/useAuth';
import {
  HomeIcon,
  ChartIcon,
  UsersIcon,
  ShieldIcon,
  LogoutIcon,
  MenuIcon,
  CloseIcon,
} from './ui/Icon';
import { cn } from '../utils/cn';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: <HomeIcon size={18} /> },
  { to: '/analytics', label: 'Analytics', icon: <ChartIcon size={18} /> },
  { to: '/patient-details', label: 'Patient Details', icon: <UsersIcon size={18} /> },
];

const Navbar: React.FC = () => {
  const { user } = useStore();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = async () => {
    setMenuOpen(false);
    await signOut();
    navigate('/', { replace: true });
  };

  const initial = (user?.displayName || user?.email || 'U').charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
            <ShieldIcon size={18} />
          </div>
          <span className="font-bold text-gray-900 hidden sm:block">Healthcare Portal</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition',
                  isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
                )
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 transition"
              >
                <span className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  {initial}
                </span>
                <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-40 truncate">
                  {user.displayName || user.email}
                </span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogoutIcon size={16} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-2 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium',
                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
                  )
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
