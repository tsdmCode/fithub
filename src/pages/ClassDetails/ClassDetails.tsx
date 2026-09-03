import { useParams } from 'react-router';
import { useFetch } from '../../hooks/useFetch';
import { useContext, useEffect, useState } from 'react';
import style from './classdetails.module.scss';
import type { Booking, TeamDetails } from '../../types/types';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
//Det skal ikke være muligt at tilmelde
// sig mere end et hold på en dag.
//todo: styling og kig i booking logik om signet etc

export default function ClassDetails() {
  const {userData} = useContext(AuthContext)
  const { id } = useParams();
  const { data, isLoading, error } = useFetch<TeamDetails>(import.meta.env.VITE_URL + `/api/teams/${id}`);
  const { data: bookingData } = useFetch<Booking[]>(import.meta.env.VITE_URL + '/api/bookings');

  const signedUp = bookingData?.some((booking) => booking.userId === userData?.user.id && booking.teamId == id) ?? false;
  
  if (isLoading) {
    return <h2>Henter data...</h2>;
  }

  if (error) {
    <h2>intet tilgængeligt data</h2>;
  }

  return (
    <div className={style.classdetailsStyle}>
      <Navbar />
      <figure>
        <img src={"http://localhost:3000"+ data?.image.url} alt={data?.name}></img>
        <figcaption>
          <h2>{data?.name}</h2>
          {signedUp ? <button>Sign off</button> : <button>Sign up</button>}
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
          <img src={"http://localhost:3000" + data?.user.image.url} alt={data?.user.name} />
          <p>
            A highly experienced yoga instructor specializing in fluid Flow Yoga, guiding students with grace and
            mindfulness
          </p>
        </figure>
      </article>
    </div>
  );
}
