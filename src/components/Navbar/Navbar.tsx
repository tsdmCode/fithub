import { useState } from 'react';
import style from './navbar.module.scss';
import { BiCaretLeft, BiCaretUp } from 'react-icons/bi';
import { HiMenuAlt3 } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router';
import NavMenu from '../NavMenu/NavMenu';

export default function Navbar({ header = '' }) {
  const [navVis, setNavVis] = useState(false)
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  console.log('location:', location);

  return (
    <div className={style.navbarStyle}>
      {path === '/home' ? (
        <BiCaretLeft onClick={() => navigate('/home')} style={{ color: '#D9D9D9' }} size={24} />
      ) : (
        <BiCaretUp style={{ color: '#D9D9D9' }} size={24} />
      )}
      <h2>{header}</h2>
      <HiMenuAlt3 onClick={() => setNavVis(true)} style={{ color: '#D9D9D9', cursor: 'pointer' }} size={24} />
      {navVis && <NavMenu navVis={navVis} setNavVis={() => setNavVis} />}
    </div>
  );
}
