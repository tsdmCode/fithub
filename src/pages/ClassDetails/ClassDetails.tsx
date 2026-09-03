import { useParams } from 'react-router';
import { useFetch } from '../../hooks/useFetch';
import { useState } from 'react';
import style from './classdetails.module.scss';
import type { Booking, TeamDetails } from '../../types/types';
// Dette view viser detaljer for et enkelt hold.
// Detaljer på dette view er:
// • Holdets navn
// • Ugedag
// • Tidspunkt
// • Beskrivelse
// • Instruktør
// Derudover vises en knap, hvor brugere kan klikke for at melde sig til holdet. Hvis en
// bruger allerede er tilmeldt det pågældende hold, skal teksten ”Leave” vises på
// knappen. Hvis en bruger ikke er logget ind, vises knappen ikke. Det skal ikke være
// muligt at tilmelde sig samme hold flere gange. Det skal ikke være muligt at tilmelde
// sig mere end et hold på en dag.
//todo: styling og kig i booking logik om signet etc
export default function ClassDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch<TeamDetails>(`http://localhost:3000/api/teams${id}`);
  const { data: bookingData } = useFetch<Booking[]>('http://localhost:3000/api/bookings');
  const [signedUp, setIsSignedUp] = useState(false);

  if (isLoading) {
    return <h2>Henter data...</h2>;
  }

  if (error) {
    <h2>intet tilgængeligt data</h2>;
  }

  return (
    <div className={style.classdetailsStyle}>
      <figure>
        <img src={data?.image.url} alt={data?.name}></img>
        <figcaption>
          <h2>{data?.name}</h2>
          {signedUp ? <button>Sign up</button> : <button>Sign off</button>}
        </figcaption>
      </figure>
      <article className={style.schedule}>
        <h3>Schedule</h3>
        <p className={style.time}>
          <span>{data?.day}</span>
          <span>{data?.time}</span>
        </p>
        <p>{data?.description}</p>
      </article>
      <article>
        <h3>Trainer</h3>
        <figure>
          <img src={data?.user.image.url} alt={data?.user.name} />
          <p>
            A highly experienced yoga instructor specializing in fluid Flow Yoga, guiding students with grace and
            mindfulness
          </p>
        </figure>
      </article>
    </div>
  );
}
