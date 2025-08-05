import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { VscSignOut } from "react-icons/vsc";
import { MdReceipt } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { HiOutlineHome, HiOutlineUser, HiOutlineAcademicCap, HiOutlineShoppingBag } from "react-icons/hi";
import logo from "../../assets/vidimg/vidyagan-ailogo.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { logout } from "../../services/operations/authAPI";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import ProgressBar from "./progressbar";
import NotificationBell from "../common/NotificationBell";
import ReceiptModal from "./ReceiptModal";
import { resetCourseState } from "../../slices/courseSlice";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const matchRoute = (route) => location.pathname === route;

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLinkClick = () => {
    dispatch(resetCourseState());
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="navbarContainer sticky top-0 left-0 z-50">
      {/* Main Navbar */}
      <div className="flex items-center w-full justify-between h-16 px-4 bg-[white]/95 backdrop-blur-md shadow-sm ">
        <div className="flex items-center justify-between w-full">
          <Link to="/" onClick={closeMobileMenu} className="flex-shrink-0">
            <img
              src={logo}
              alt="Logo"
              width={120}
              height={70}
              loading="lazy"
              className="cursor-pointer rounded-tl-lg rounded-br-lg"
            />
          </Link>
          
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            {!token && (
              <>
                {/* Desktop Navigation Links */}
                <nav className="flex items-center space-x-6">
                  {NavbarLinks.map(({ title, path }, index) => (
                    <Link
                      key={index}
                      to={title === "Courses" ? "/show-all-courses" : path}
                      className={`text-sm font-medium transition-all duration-200 hover:text-blue-600 ${
                        matchRoute(title === "Courses" ? "/show-all-courses" : path)
                          ? "text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {title}
                    </Link>
                  ))}
                </nav>

                {/* Desktop Auth Buttons */}
                <div className="flex items-center space-x-4">
                  <Link to="/login">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-[white] border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="px-4 py-2 text-sm font-medium text-[white] bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                      Get Started
                    </button>
                  </Link>
                </div>
              </>
            )}

            {/* Desktop User Menu */}
            {token && (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard/my-profile" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  Dashboard
                </Link>
                <Link to="/dashboard/cart" className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  Cart
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-blue-600 text-center text-xs font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <button
                  onClick={() => {
                    dispatch(logout(navigate));
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="block md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <IoClose className="text-2xl text-gray-700" />
            ) : (
              <AiOutlineMenu className="text-2xl text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[white] backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          
          {/* Menu Content */}
          <div className="absolute top-0 right-0 w-80 h-full bg-[white]/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 ease-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <Link to="/" onClick={closeMobileMenu}>
                  <img
                    src={logo}
                    alt="Logo"
                    width={100}
                    height={50}
                    className="cursor-pointer rounded-tl-lg rounded-br-lg"
                  />
                </Link>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  <IoClose className="text-xl text-gray-600" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto py-6">
                {!token ? (
                  <>
                    {/* Navigation Links */}
                    <div className="px-6 mb-8">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                        Navigation
                      </h3>
                      <nav className="space-y-2">
                        {NavbarLinks.map(({ title, path }, index) => (
                          <Link
                            key={index}
                            to={title === "Courses" ? "/show-all-courses" : path}
                            onClick={closeMobileMenu}
                            className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                              matchRoute(title === "Courses" ? "/show-all-courses" : path)
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            <span className="text-sm font-medium">{title}</span>
                            {matchRoute(title === "Courses" ? "/show-all-courses" : path) && (
                              <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                          </Link>
                        ))}
                      </nav>
                    </div>

                    {/* Auth Buttons */}
                    <div className="px-6 space-y-3">
                      <Link to="/login" onClick={closeMobileMenu} className="block">
                        <button className="w-full py-3 px-4 text-sm font-medium text-gray-700 bg-[white] border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm">
                          Login
                        </button>
                      </Link>
                      <Link to="/signup" onClick={closeMobileMenu} className="block">
                        <button className="w-full py-3 px-4 text-sm font-medium text-[white] bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                          Get Started
                        </button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    {/* User Menu */}
                    <div className="px-6 mb-8">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                        Dashboard
                      </h3>
                      <nav className="space-y-2">
                        <Link
                          to="/dashboard/my-profile"
                          onClick={closeMobileMenu}
                          className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
                        >
                          <HiOutlineHome className="text-lg mr-3 text-gray-500 group-hover:text-blue-500" />
                          <span className="text-sm font-medium">Dashboard</span>
                        </Link>
                        <Link
                          to="/dashboard/profile"
                          onClick={closeMobileMenu}
                          className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
                        >
                          <HiOutlineUser className="text-lg mr-3 text-gray-500 group-hover:text-blue-500" />
                          <span className="text-sm font-medium">My Profile</span>
                        </Link>
                        <Link
                          to="/dashboard/enrolled-courses"
                          onClick={closeMobileMenu}
                          className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
                        >
                          <HiOutlineAcademicCap className="text-lg mr-3 text-gray-500 group-hover:text-blue-500" />
                          <span className="text-sm font-medium">Enrolled Courses</span>
                        </Link>
                        <button
                          onClick={() => setIsReceiptModalOpen(true)}
                          className="flex items-center w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
                        >
                          <MdReceipt className="text-lg mr-3 text-gray-500 group-hover:text-blue-500" />
                          <span className="text-sm font-medium">Download Receipts</span>
                        </button>
                        <Link
                          to="/dashboard/cart"
                          onClick={closeMobileMenu}
                          className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group relative"
                        >
                          <HiOutlineShoppingBag className="text-lg mr-3 text-gray-500 group-hover:text-blue-500" />
                          <span className="text-sm font-medium">Cart</span>
                          {totalItems > 0 && (
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-blue-600 text-center text-xs font-bold text-white">
                              {totalItems}
                            </span>
                          )}
                        </Link>
                      </nav>
                    </div>

                    {/* Logout Button */}
                    <div className="px-6">
                      <button
                        onClick={() => {
                          dispatch(logout(navigate));
                          closeMobileMenu();
                        }}
                        className="flex items-center justify-center w-full py-3 px-4 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                      >
                        <VscSignOut className="text-lg mr-2" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <ProgressBar />
      
      {/* Receipt Modal */}
      <ReceiptModal 
        isOpen={isReceiptModalOpen} 
        onClose={() => setIsReceiptModalOpen(false)} 
      />
    </div>
  );
}

export default Navbar;
