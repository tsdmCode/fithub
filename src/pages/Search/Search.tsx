import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import style from './search.module.scss';
import type { Teams } from '../../types/types';
import { useNavigate } from 'react-router';

export default function Search({ teams }: { teams: Teams[] | undefined }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const filteredTeams = teams?.filter((team) => {
    const q = query.toLowerCase();
    return (
      team.name.toLowerCase().includes(q) ||
      team.day.toLowerCase().includes(q) ||
      team.description.toLowerCase().includes(q) ||
      team.user.name.toLowerCase().includes(q)
    );
  });
  return (
    <div className={style.searchStyle}>
      <Navbar header="Search" />
      <label htmlFor="query">Enter keyword</label>
      <input type="search" name='query' value={query} placeholder='Search classes' onChange={(e) => setQuery(e.target.value)} />
      <div className={style.classesContainer}>
        {filteredTeams?.length != 0 ? (
          filteredTeams?.map((team) => (
            <article onClick={() => navigate(`/team/${team.id}`)} key={team.id}>
              <figure>
                <img src={import.meta.env.VITE_URL + `${team.image.url}`} alt={team.name} />
                <figcaption>{team.name}</figcaption>
              </figure>
            </article>
          ))
        ) : (
          <h2>Ingen hold fundet</h2>
        )}
      </div>
    </div>
  );
}
