import React from "react";
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Quiz Creator</h1>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link to="/" className="hover:text-blue-200 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/create" className="hover:text-blue-200 transition">
                    Create Quiz
                  </Link>
                </li>
                <li>
                  <Link to="/take" className="hover:text-blue-200 transition">
                    Take Quiz
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Quiz Creator App</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
