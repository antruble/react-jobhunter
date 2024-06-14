import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { clearToken } from '../../app/authApiSlice';

const Menu = () => {
  const [cookies, , removeCookie] = useCookies(['cookie-name']);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  const handleLogout = () => {
    dispatch(clearToken());
    removeCookie('token');
    window.location.reload();
  };

  return (
    <nav className="bg-sky-100 text-black font-bold p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bolder">
          JOBHUNTER
        </NavLink>
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-lg border-b-2 border-purple-500 flex items-center space-x-2'
                  : 'text-lg hover:border-b-2 hover:border-purple-300 flex items-center space-x-2'
              }
            >
              <svg className="w-6 h-6" fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g strokeWidth="0"></g>
                <g strokeLinecap="round" strokeLinejoin="round"></g>
                <g>
                <path d="M0 14.016l2.016 1.984h4v14.016q0 0.832 0.576 1.408t1.408 0.576h4v-8q0-0.832 0.576-1.408t1.44-0.576h4q0.8 0 1.408 0.576t0.576 1.408v8h4q0.832 0 1.408-0.576t0.608-1.408v-14.016h4l1.984-1.984-16-14.016zM12 14.016q0-1.664 1.184-2.848t2.816-1.152 2.816 1.152 1.184 2.848-1.184 2.816-2.816 1.184-2.816-1.184-1.184-2.816z"></path>
                </g>
              </svg>
              <span>Főoldal</span>
            </NavLink>
          </li>
          {token || cookies.token ? (
            <>
              {(role === 'jobseeker' || role === 'company') && (
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive
                        ? 'text-lg border-b-2 border-purple-500 flex items-center space-x-2'
                        : 'text-lg hover:border-b-2 hover:border-purple-300 flex items-center space-x-2'
                    }
                  >
                    <svg className='w-6 h-6' viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <title>profile_round [#1342]</title>
                        <desc>Created with Sketch.</desc>
                        <defs></defs>
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -2159.000000)" fill="#000000">
                            <g id="icons" transform="translate(56.000000, 160.000000)">
                              <path d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598" id="profile_round-[#1342]"></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <span>Profilom</span>
                  </NavLink>
                </li>
              )}
              {(role === 'company') && (
                <li>
                  <NavLink
                    to="/add-job"
                    className={({ isActive }) =>
                      isActive
                        ? 'text-lg border-b-2 border-purple-500 flex items-center space-x-2'
                        : 'text-lg hover:border-b-2 hover:border-purple-300 flex items-center space-x-2'
                    }
                  >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path opacity="0.1" d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" fill="#323232"></path>
                        <path d="M9 12H15" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M12 9L12 15" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="#323232" strokeWidth="2"></path>
                      </g>
                    </svg>
                    <span>Álláshírdetés létrehozása</span>
                  </NavLink>
                </li>
              )}
              <li>
                <button onClick={handleLogout} className="text-lg hover:border-b-2 hover:border-purple-300 flex items-center space-x-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g strokeWidth="0"></g>
                    <g strokeLinecap="round" strokeLinejoin="round"></g>
                    <g>
                    <path d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>

                    </g>
                  </svg>
                  <span>Kijelentkezés</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-lg border-b-2 border-purple-500 flex items-center space-x-2'
                      : 'text-lg hover:border-b-2 hover:border-purple-300 flex items-center space-x-2'
                  }
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 11.0001L5.82341 9.79002C6.06208 9.68773 6.18142 9.63659 6.2562 9.55125C6.32206 9.47611 6.36389 9.38296 6.3763 9.28382C6.39039 9.17124 6.34934 9.04806 6.26722 8.80172L5.65307 6.95927C5.4418 6.32546 5.33617 6.00855 5.41069 5.79339C5.47559 5.60605 5.62012 5.45707 5.80542 5.38653C6.01822 5.30552 6.33818 5.40151 6.9781 5.59348L8.6504 6.09517C9.12832 6.23855 9.36728 6.31024 9.58513 6.27915C9.77707 6.25175 9.95691 6.16916 10.1028 6.0414C10.2683 5.89641 10.3696 5.66842 10.5723 5.21247L11.0204 4.20417C11.3306 3.5061 11.4858 3.15706 11.7019 3.04969C11.8897 2.95642 12.1103 2.95642 12.2981 3.04969C12.5142 3.15706 12.6694 3.5061 12.9796 4.20417L13.4277 5.21247C13.6304 5.66841 13.7317 5.89641 13.8972 6.0414C14.0431 6.16916 14.2229 6.25175 14.4149 6.27915C14.6327 6.31024 14.8717 6.23855 15.3496 6.09517L17.0219 5.59348C17.6618 5.40151 17.9818 5.30552 18.1946 5.38653C18.3799 5.45707 18.5244 5.60605 18.5893 5.79339C18.6638 6.00855 18.5582 6.32546 18.3469 6.95927L17.7328 8.80172C17.6507 9.04806 17.6096 9.17124 17.6237 9.28382C17.6361 9.38296 17.6779 9.47611 17.7438 9.55125C17.8186 9.63659 17.9379 9.68773 18.1766 9.79002L21 11.0001M10 11.0001C10 9.89548 10.8954 9.00005 12 9.00005C13.1046 9.00005 14 9.89548 14 11.0001M13 21.0001H21M17 15.0001H21M5 15.0001H13M3 18.0001H19M5 21.0001H9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                  <span>Regisztráció</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-lg border-b-2 border-purple-500 flex items-center space-x-2'
                      : 'text-lg hover:border-b-2 hover:border-purple-300 flex items-center space-x-2'
                  }
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g strokeWidth="0"></g>
                    <g strokeLinecap="round" strokeLinejoin="round"></g>
                    <g>
                    <path d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z" stroke="#000000" strokeWidth="1.5"></path>
<path d="M12 14V18" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path>
<path d="M6 10V8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path>

                    </g>
                  </svg>
                  <span>Bejelentkezés</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
