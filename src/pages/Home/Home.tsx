import style from './home.module.scss';
import { useFetch } from '../../hooks/useFetch';
import type { Teams } from '../../types/types';
import useRandomIndex from '../../hooks/useRandomIndex';
import { useNavigate } from 'react-router';
import Navbar from '../../components/Navbar/Navbar';
// Det store billede er et tilfældigt udvalgt træningshold. Under det store billede er en
// liste med alle hold. Brugere skal kunne swipe sig igennem listen, højre/venstre.
//todo: Brugere klikker på et billede for at få flere detaljer. sæt fetch teams logik ud i app?
//lav navbar og implementer login
export default function Home() {
  //et fetch teams, vælg et random, render det som en figure, render resten i en sammen der kan horizono scrollo
  const { data } = useFetch<Teams[]>('http://localhost:3000/api/teams');
  const randomInt = useRandomIndex(data);
  const navigate = useNavigate();
  console.log('data:', data);

  const randomClass = data?.length ? data[randomInt] : null;

  return (
    <div className={style.homeStyle}>
      <Navbar header="Popular classes" />

      <figure className={style.heroClass} onClick={() => navigate(`/teams/${randomClass?.id}`)}>
        <img src={'http://localhost:3000' + randomClass?.image.url} alt={randomClass?.name} />
        <figcaption>
          <h2>{randomClass?.name}</h2>
        </figcaption>
      </figure>
      {/* skal gøres til et komponent med header prop */}
      <div className={style.forYouContainer}>
        <h3>Classes for you</h3>
        <div className={style.classesContainer}>
          {data?.map((team) => (
            <article key={team.id}>
              <figure>
                <img src={`http://localhost:3000${team.image.url}`} alt={team.name} />
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
