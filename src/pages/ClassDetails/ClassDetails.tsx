import { useParams } from 'react-router';
import { useFetch } from '../../hooks/useFetch';
import { useContext } from 'react';
import style from './classdetails.module.scss';
import type { Booking, TeamDetails } from '../../types/types';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';

export default function ClassDetails() {
  const { userData } = useContext(AuthContext);
  const { id } = useParams();
  const { data, isLoading, error } = useFetch<TeamDetails>(import.meta.env.VITE_URL + `/api/teams/${id}`);
  const { data: bookingData } = useFetch<Booking[]>(import.meta.env.VITE_URL + '/api/bookings');

  const signedUp =
    bookingData?.some((booking) => booking.userId === userData?.user.id && booking.teamId == Number(id)) ?? false;

  async function handleSignup() {
    if (!userData) {
      alert('Log lige ind først!');
      return;
    }

    const filteredBookings = bookingData?.filter((booking) => booking.userId === userData?.user.id);

    if (filteredBookings?.some((b) => b.day === data?.day)) {
      alert('Du må ikke booke mere på samme dag!');
      return;
    }

    try {
      const res = await fetch(import.meta.env.VITE_URL + '/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData?.accessToken}`,
        },
        body: JSON.stringify({ teamId: data?.id, day: data?.day, time: data?.time }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Backend Server Error HTML:', errorText);
        alert('Der skete en fejl på serveren. Prøv igen senere.');
        return;
      }
    } catch (Error) {
      console.error(Error);
    }
    alert('signed!');
  }

  if (isLoading) {
    return <h2>Henter data...</h2>;
  }

  if (error) {
    <h2>intet tilgængeligt data</h2>;
  }

  return (
    <div className={style.classdetailsStyle}>
      <Navbar />
      <figure className={style.headerFigure}>
        <img src={import.meta.env.VITE_URL + data?.image.url} alt={data?.name}></img>
        <figcaption>
          <h2>{data?.name}</h2>
          {signedUp ? <button>Sign off</button> : <button onClick={handleSignup}>Sign up</button>}
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
      <article className={style.trainer}>
        <h3>Trainer</h3>
        <figure>
          <img src={import.meta.env.VITE_URL + data?.user.image.url} alt={data?.user.name} />
          <article>
            <h4>{data?.user.name}</h4>
            <p>
              A highly experienced yoga instructor specializing in fluid Flow Yoga, guiding students with grace and
              mindfulness
            </p>
          </article>
        </figure>
      </article>
    </div>
  );
}
