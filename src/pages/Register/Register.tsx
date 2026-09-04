import { useContext, useState, useEffect } from 'react';
import style from './register.module.scss';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import Navbar from '../../components/Navbar/Navbar';

export default function Register() {
  const { userData } = useContext(AuthContext);
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [messageError, setMessageError] = useState<string | null>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) navigate('/home');
  }, [userData, navigate]);

  async function handleRegister() {
    setMessageError(null);
    const nameRegex = /^[A-za-z]+\s[A-za-z]+$/;
    const descriptionRegex = /^[A-za-z0-9\s.,-]+$/;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!nameRegex.test(fullname)) {
      setMessageError('Mærkeligt navn, ingen specielle karakterer tak!');
      return;
    }

    if (!emailRegex.test(email)) {
      setMessageError('Ugyldig email');
      return;
    }

    if (!descriptionRegex.test(description)) {
      setMessageError('Skriv normalt i den din beskrivelse!');
      return;
    }

    if (password !== repeatPassword) {
      setMessageError("Password matcher ikke")
      return;
    }

    await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: fullname, email, description, password, imageId: 1 }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text();
      })
      .catch((error) => {
        console.error('Error creating user: ', error);
      });
  }

  return (
    <div className={style.registerStyle}>
      <Navbar header="Register" />
      <>
        <form action={handleRegister}>
          <input
            placeholder="Indtast dit fulde navn"
            type="text"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input placeholder="Indtast din email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input
            placeholder="Indtast dit password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            placeholder="Gentag dit password"
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <textarea
            placeholder="Sig noget om dig selv"
            onChange={(e) => setDescription(e.target.value)}
            cols={30}
            rows={10}
          ></textarea>
          <input type="submit" value={'REGISTRÉR'} />
        </form>
        {messageError && <p>{messageError}</p>}
      </>
    </div>
  );
}
