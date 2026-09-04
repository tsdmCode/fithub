import { useNavigate } from 'react-router';
import type { Booking } from '../../types/types';
import style from './booking.module.scss';

export default function Booking({ bookingInfo }: {bookingInfo: Booking}) {
  const navigate = useNavigate()
  return (
    <article onClick={() => navigate(`/team/${bookingInfo?.teamId}`)} className={style.bookingStyle}>
      <p className={style.time}>
        <span>{bookingInfo?.day}</span>
        <span>{bookingInfo?.time}</span>
      </p>
      <h3>{bookingInfo?.team.name}</h3>
    </article>
  );
}
