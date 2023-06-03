import { Header } from "../../components/header";
import { useAuth } from "../../hooks/auth";
import {DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import style from './Dashboard.module.css';
import { Card } from "../../components/card";

export function Dashboard() {
  const {user} = useAuth();
  return (
    <div>
      <div className="container" >
     <Header />
     <div className={style.dataTitle}>
      <h2>Bem vindo(a), {user.name} !</h2>
      </div>
     <p>Esta é sua lista de horários de hoje, 04/06/2023</p>
      </div>
      <h2 className={style.nextSchedules}>Próximos Horários</h2>
      <div className={style.schedule}>
        <div className={style.cardWrapper}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
          </div>
          <div className={style.picker}>
            <DayPicker />
          </div>
      </div>
    </div>
  )
}