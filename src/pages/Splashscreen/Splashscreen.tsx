import { useNavigate } from "react-router";
import style from "./splashscreen.module.scss";

export default function Splashscreen() {
  const navigate = useNavigate();

  return (<div className={style.splashscreenStyle}>
    <div>
      <hgroup>
        <h1>Believe <br></br>yourself</h1>
        <p>Train like a pro</p>
      </hgroup>

    </div>
    <div>
      <button onClick={() => navigate("/home")}>
        Start training
      </button>
    </div>
  </div>)
};