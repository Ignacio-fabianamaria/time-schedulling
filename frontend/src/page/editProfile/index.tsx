import { useForm } from 'react-hook-form';
import { Header } from '../../components/header';
import { InputSchedule } from '../../components/inputSchedule';
import style from './EditProfile.module.css';

interface IFormValues{
  picture:File[];
  name:string;
  email:string;
  password:string
  newPassword:string;
  oldPassword:string;
}

export function EditProfile() {
  const {register, handleSubmit} = useForm<IFormValues>();
  return (
    <div className='container'>
      <Header />
      <div className={style.formDiv}>
        <form>
          <input type='file' {...register} />
          <InputSchedule placeholder='Nome' type='text' />
          <InputSchedule placeholder='Email' type='text' />
          <InputSchedule placeholder='Senha Atual' type='password' />
          <InputSchedule placeholder='Nova Senha' type='password' />
          <InputSchedule placeholder='Confirmar nova senha' type='password' />
        </form>
        <div className={style.footer}>
          <button >Cancelar</button>
          <button >Editar</button>
        </div>
      </div>
    </div>
  )
}