import { useContext, useState } from 'react';
import style from './navmenu.module.scss';
import { NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
//todo: færdiggør styling, lav også register form og logik til det
export default function NavMenu({ setNavVis }: { setNavVis: (arg0: boolean) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userData, setUserData, logout } = useContext(AuthContext);

  async function handleLogin(e: React.SubmitEvent) {
    e.preventDefault();

    await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text();
      })
      .then((text) => {
        const data = JSON.parse(text);
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error logging in: ', error);
      });
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
              <li onClick={logout}>Log out</li>
            </>
          )}
        </ul>
        {!userData && (
          <form onSubmit={(e) => handleLogin(e)}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} name="" id="" onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value="Log ind" />
          </form>
        )}

        <p>
          Ingen bruger? Tryk <span>her</span> for at registrere
        </p>

        <button onClick={() => setNavVis(false)}>Luk</button>
      </nav>
    </div>
  );
}
