import style from "./myschedule.module.scss";
// Dette view viser en liste over de hold en bruger er tilmeldt, samt ugedag og
// tidspunkt. Når en bruger klikker på en ”Class” i listen, bliver de sendt til ”Class
// Details”.
export default function MySchedule() {
  return (<div className={style.myscheduleStyle}></div>)
};