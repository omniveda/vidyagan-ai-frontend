import Vnavbar from "../components/common/Vnavbar";
import Footer from "../components/common/Footer";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      {/* Navbar - visible on mobile, hidden on lg screens */}
      <div className="lg:hidden">
        <Navbar/>
      </div>
      <div className="flex min-h-screen">
        {/* Sidebar - hidden on mobile, visible on lg screens and up */}
        <aside className="hidden lg:block w-64 bg-white fixed top-0 left-0 bottom-0 z-50">
          <Vnavbar />
        </aside>

        {/* Main area - full width on mobile, adjusted margin on lg screens */}
        <div className="flex flex-col rounded-xl flex-1 lg:ml-64 min-h-screen">
          <main className="flex-grow p-6 bg-gray-50">{children}</main>
          <footer className="flex justify-between text-[12px] px-8 pb-[20px]">
            <div>
              © 2025 SecCouncil
            </div>

            <div className="hidden lg:flex gap-1">
              <div className="text-[12px] cursor-pointer hover:text-yellow-50 transition-all duration-200">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </div>
              |
              <div className="text-[12px] cursor-pointer hover:text-yellow-50 transition-all duration-200">
                <Link to="/cookie-policy">Cookie Policy</Link>
              </div>
              |
              <div className="text-[12px] cursor-pointer hover:text-yellow-50 transition-all duration-200">
                <Link to="/terms">Terms</Link>
              </div>
              |
              <div className="text-[12px] cursor-pointer hover:text-yellow-50 transition-all duration-200">
                <Link to="/report">Report</Link>
              </div>
            </div>

            <div>
              Powered By CyBite
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
