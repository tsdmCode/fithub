import { useNavigate } from 'react-router';
import { useFetch } from '../../hooks/useFetch';
import type { TeamDetails } from '../../types/types';
import style from './booking.module.scss';

export default function Booking({ id }: {id: number}) {
  const { data } = useFetch<TeamDetails>(`http://localhost:3000/api/teams/${id}`);
  const navigate = useNavigate()
  return (
    <article onClick={() => navigate(`/team/${data?.id}`)} className={style.bookingStyle}>
      <p className={style.time}>
        <span>{data?.day}</span>
        <span>{data?.time}</span>
      </p>
      <h3>{data?.name}</h3>
    </article>
  );
}
