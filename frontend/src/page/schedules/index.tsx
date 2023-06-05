import { Header } from "../../components/header";
import { InputSchedule } from "../../components/inputSchedule";
import style from './Schedules.module.css';

export function Schedules() {
  return (
    <div className="container">
      <Header />
      <h2>Agendamentos de Horário</h2>
      <div className={style.formDiv}>
      <form action="">
        <InputSchedule placeholder="Nome do cliente" type="text"/>
        <InputSchedule placeholder="Celular" type="text"/>
        <div className={style.date}>
        <InputSchedule placeholder="Dia" type="date"/>
        <div className={style.select}>
          <label htmlFor="">Hora</label>
        <select name="" id="">
          <option value="">1</option>
          <option value="">1</option>
          <option value="">1</option>
          <option value="">1</option>
        </select>
          </div>
        </div>
        <div className={style.footer}>
            <button >Cancelar</button>
            <button >Editar</button>
          </div>
      </form>
      </div>
    </div>
  )
}