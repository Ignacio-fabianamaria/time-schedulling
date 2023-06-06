import { useForm } from 'react-hook-form';
import { Header } from '../../components/header';
import { InputSchedule } from '../../components/inputSchedule';
import style from './EditProfile.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface IFormValues{
  picture:File[];
  name:string;
  email:string;
  password:string
  newPassword:string;
  confirmPassword:string;
}

export function EditProfile() {
  const schema = yup.object().shape({
    name:yup.string(),
    newPassword:yup.string(),
    oldPassword:yup.string().oneOf([yup.ref('newPassword')], 'senha deve ser iguais')

  })
  const {register, handleSubmit} = useForm<IFormValues>({resolver: yupResolver(schema)});
  const submit = handleSubmit((data)=>{

  })
  return (
    <div className='container'>
      <Header />
      <div className={style.formDiv}>
        <form onSubmit={submit}>
          <input type='file'  {...register('picture', {required:true})} />
          <InputSchedule
          placeholder='Nome'
          type='text'
          {...register('name', {required:true})}
          />
          <InputSchedule
          placeholder='Email'
          type='text'
          {...register('email', {required:true})}
          />
          <InputSchedule
          placeholder='Senha Atual'
          type='password'
          {...register('password', {required:true})}/>
          <InputSchedule
          placeholder='Nova Senha'
          type='password'
          {...register('newPassword', {required:true})}
          />
          <InputSchedule
          placeholder='Confirmar nova senha'
          type='password'
          {...register('confirmPassword', {required:true})}
          />
        </form>
        <div className={style.footer}>
          <button >Cancelar</button>
          <button >Editar</button>
        </div>
      </div>
    </div>
  )
}