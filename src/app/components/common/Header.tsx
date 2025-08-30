'use client';
import Image from 'next/image';
import Link from 'next/link';
import profileImage from "../../../../public/assets/logo.png";
import { IoSearch, IoMenu, IoClose, IoLogOut } from 'react-icons/io5';
import { useState } from 'react';

interface User {
  name: string;
  avatar: string;
}

interface HeaderProps {
  user?: User;
  onLogout?: () => void;
  logoSrc?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  user = { name: 'Adrian', avatar: '/api/placeholder/32/32' }, 
  onLogout,
  logoSrc = '/bookwise-logo.png' // Default logo path
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center">
                <Image
                  src={profileImage}
                  alt="BookWise Logo"
                  width={128}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>

          <div>
             {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center ">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
               href="/" 
               className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              <span>Search</span>
            </Link>
          </nav>

          {/* User Section & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Desktop User Section */}
            {user && (
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-gray-400 hover:text-white p-1 rounded-md transition-colors duration-200"
                  title="Logout"
                >
                  <IoLogOut className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <IoClose className="w-6 h-6" />
              ) : (
                <IoMenu className="w-6 h-6" />
              )}
            </button>
          </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-700">
              <Link
                href="/"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Search
              </Link>
              
              {/* Mobile User Section */}
              {user && (
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-600">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">{user.name}</div>
                    </div>
                    <button
                      onClick={onLogout}
                      className="ml-auto text-gray-400 hover:text-white p-2 rounded-md transition-colors duration-200"
                      title="Logout"
                    >
                      <IoLogOut className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;