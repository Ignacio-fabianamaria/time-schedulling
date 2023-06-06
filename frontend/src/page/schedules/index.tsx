import { useForm } from "react-hook-form";
import { Header } from "../../components/header";
import { InputSchedule } from "../../components/inputSchedule";
import style from './Schedules.module.css';
import { useAuth } from "../../hooks/auth";
import { formatISO, getHours, parseISO, setHours } from "date-fns";
import { api } from "../../server";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export function Schedules() {
const {register, handleSubmit} = useForm();
const navigate = useNavigate();

const { availableSchedules, schedules, date, handleSetDate } = useAuth();
console.log("🚀 ~ file: index.tsx:13 ~ Schedules ~ date:", date)

const currentValue = new Date().toISOString().split('T')[0];

const filteredDate = availableSchedules.filter((hour) => {
  const isScheduleAvailable = !schedules.find((scheduleItem) => {
    const scheduleDate = new Date(scheduleItem.date);
    const scheduleHour = getHours(scheduleDate);
    return scheduleHour === Number(hour);
  });
  return isScheduleAvailable;
});

 const submit =  handleSubmit(async({name, phone, date, hour}) => {
  const formattedDate = formatISO(
    setHours(parseISO(date), parseInt(hour)),
  );   
  try {
    await api.post('/schedules/', {
      name:name,
      phone:phone,
      date: formattedDate,
    });
    toast.success('Atualizado com sucesso');
    navigate('/dashboard')
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
  }
})
  return (
    <div className={`${style.container} container`}>
      <Header />
      <h2>Agendamentos de Horário</h2>
      <div className={style.formDiv}>
      <form onSubmit={submit}>
        <InputSchedule
        placeholder="Nome do cliente"
        type="text"
        {...register('name', {required:true})}
        />
        <InputSchedule
        placeholder="Telefone"
        type="text"
        {...register('phone', {required:true})}
        />
        <div className={style.date}>
        <InputSchedule
        placeholder="Dia"
        type="date"
        {...register('date',
        {required:true,
          value:currentValue,
          onChange:(e)=>handleSetDate(e.target.value)},
        )}
        />
        <div className={style.select}>
          <label htmlFor="">Hora</label>
        <select 
        {...register('hour', {required:true})}
        >
          {filteredDate.map((hour, index)=>{
            return(
              <option value={hour} key={index}>
                {hour}:00
                </option>
            )
          })}
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