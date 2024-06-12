import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { clearToken } from '../../app/authApiSlice';

const Menu = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  const handleLogout = () => {
    dispatch(clearToken());
    removeCookie('token');
    window.location.reload();
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Jobhunter
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white">Főoldal</Link>
          </li>
          {token || cookies.token ? (
            <>
              {role === "jobseeker" && (
                <>
                  <li>
                    <Link to="/profile" className="text-white">Profilom</Link>
                  </li>
                </>
              )}
              {role === "company" && (
                <>
                  <li>
                    <Link to="/profile" className="text-white">Profilom</Link>
                  </li>
                </>
              )}
              <li>
                <button onClick={handleLogout} className="text-white">
                  Kijelentkezés
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register" className="text-white">Regisztráció</Link>
              </li>
              <li>
                <Link to="/login" className="text-white">Bejelentkezés</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
