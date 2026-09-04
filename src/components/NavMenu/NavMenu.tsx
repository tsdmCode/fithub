import { useContext, useState } from 'react';
import style from './navmenu.module.scss';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { IoMdClose } from "react-icons/io";

export default function NavMenu({ setNavVis }: { setNavVis: (arg0: boolean) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userData, setUserData, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
            <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input
              placeholder="Password"
              type="password"
              value={password}
              name=""
              id=""
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value="Log ind" />
          </form>
        )}

        {!userData && (
          <p>
            Ingen bruger? Tryk <span onClick={() =>navigate('/register')}>her</span> for at registrere
          </p>
        )}

        <button onClick={() => setNavVis(false)}><IoMdClose size={36}/></button>
      </nav>
    </div>
  );
}
