import { useContext, useState } from 'react';
import style from './navmenu.module.scss';
import { NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
//todo: færdiggør styling og login funktion, lav også register form og logik til det
export default function NavMenu({setNavVis}: {setNavVis: (arg0: boolean) => void}) {
  const {email, setEmail} = useState<string>("");
  const {password, setPassword} = useState<string>("");
  const { userData, logout } = useContext(AuthContext);

  function handleLogin(e: SubmitEvent) {
    e.preventDefault();
  }

  return (
    <div className={style.navmenuStyle}>
      <nav>
        <ul>
          <li>
            <NavLink to={'/home'}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'/search'}>Search</NavLink>
          </li>

          {userData && (
            <>
            <li>
              <NavLink to={'/myschedule'}>My Schedule</NavLink>
            </li>
            <li onClick={() => logout}>Log out</li>
            </>
          )}
        </ul>
        {!userData && 
          <form onSubmit={(e) => handleLogin(e)}>
            <input type='email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="" id="" onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value="Log ind" />
          </form>
        }
        <button onClick={() => setNavVis(false)}></button>
      </nav>
    </div>
  );
}
