import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold flex items-center">
                  <FaHome className="mr-2" /> Home
        </Link>
                  <p className="text-white font-semibold md:text-xl text-center"> React Crud App</p>
      </div>
    </nav>
  );
}

export default Navbar;
