import { useContext } from "react";
import style from "./myschedule.module.scss";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import type { Booking as BookingType } from "../../types/types";
import Booking from "../../components/Booking/Booking";
// Dette view viser en liste over de hold en bruger er tilmeldt, samt ugedag og
// tidspunkt. Når en bruger klikker på en ”Class” i listen, bliver de sendt til ”Class
// Details”.
//TODO: Lav booking component om til links, find ud af det lort med userData
export default function MySchedule() {
  const {userData} = useContext(AuthContext)
  const {data, isLoading, error} = useFetch<BookingType[]>("http://localhost:3000/api/bookings")
  // const navigate = useNavigate()

  // if (!userData) {
  //     navigate("/home")
  // }
  const filteredBookings = data ? data.filter((booking) => booking.id === userData?.id) : null
  const renderedBookings = filteredBookings?.map((booking) => <Booking id={booking.teamId} />)
  return (<div className={style.myscheduleStyle}>
    {renderedBookings}
  </div>)
};