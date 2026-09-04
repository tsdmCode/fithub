import style from './home.module.scss';
import type { Teams } from '../../types/types';
import useRandomIndex from '../../hooks/useRandomIndex';
import { useNavigate } from 'react-router';
import Navbar from '../../components/Navbar/Navbar';

export default function Home({data}: {data: Teams[] | undefined}) {
  const randomInt = useRandomIndex(data);
  const navigate = useNavigate();

  const randomClass = data?.length ? data[randomInt] : null;

  return (
    <div className={style.homeStyle}>
      <Navbar header="Popular classes" />

      <figure className={style.heroClass} onClick={() => navigate(`/team/${randomClass?.id}`)}>
        <img src={import.meta.env.VITE_URL + randomClass?.image.url} alt={randomClass?.name} />
        <figcaption>
          <h2>{randomClass?.name}</h2>
        </figcaption>
      </figure>
      {/* skal gøres til et komponent med header prop */}
      <div className={style.forYouContainer}>
        <h3>Classes for you</h3>
        <div className={style.classesContainer}>
          {data?.map((team) => (
            <article onClick={() => navigate(`/team/${team.id}`)} key={team.id}>
              <figure>
                <img src={import.meta.env.VITE_URL + `${team.image.url}`} alt={team.name} />
                <figcaption>{team.name}</figcaption>
              </figure>
              <div className={style.rating}>
                <div></div>
                <div></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
