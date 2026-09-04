import { useContext } from 'react';
import style from './myschedule.module.scss';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { useFetch } from '../../hooks/useFetch';
import Navbar from '../../components/Navbar/Navbar';
import type { Booking as BookingType } from '../../types/types';
import Booking from '../../components/Booking/Booking';
// Dette view viser en liste over de hold en bruger er tilmeldt, samt ugedag og
// tidspunkt. Når en bruger klikker på en ”Class” i listen, bliver de sendt til ”Class
// Details”.
//TODO: Lav booking component om til links
export default function MySchedule() {
  const { userData } = useContext(AuthContext);
  const { data, isLoading, error } = useFetch<BookingType[]>(import.meta.env.VITE_URL + '/api/bookings');
  // const navigate = useNavigate()

  // if (!userData) {
  //     navigate("/home")
  // }
  const filteredBookings = data ? data.filter((booking) => booking.id === userData?.user.id) : null;
  const renderedBookings = filteredBookings?.map((booking) => <Booking bookingInfo={booking} />);
  return (
    <div className={style.myscheduleStyle}>
      <Navbar header="My Schedule" />
      {renderedBookings}
    </div>
  );
}
