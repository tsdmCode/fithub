import style from "./classdetails.module.scss";
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
export default function ClassDetails() {
  return (<div className={style.classdetailsStyle}></div>)
};