import { useContext } from 'react';
import style from './myschedule.module.scss';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { useFetch } from '../../hooks/useFetch';
import Navbar from '../../components/Navbar/Navbar';
import type { Booking as BookingType } from '../../types/types';
import Booking from '../../components/Booking/Booking';

export default function MySchedule() {
  const { userData } = useContext(AuthContext);
  const { data, isLoading, error } = useFetch<BookingType[]>(import.meta.env.VITE_URL + '/api/bookings');
  const navigate = useNavigate();

  if (!userData) {
    navigate('/home');
  }

  if (isLoading) {
    return <h2>Henter data...</h2>
  }
  if (error) {
    return <h2>Ingen data...</h2>
  }

  const filteredBookings = data ? data.filter((booking) => booking.id === userData?.user.id) : null;
  const renderedBookings = filteredBookings?.map((booking) => <Booking bookingInfo={booking} />);
  return (
    <div className={style.myscheduleStyle}>
      <Navbar header="My Schedule" />
      {renderedBookings}
    </div>
  );
}
