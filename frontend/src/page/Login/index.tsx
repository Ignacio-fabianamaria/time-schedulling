import style from './Login.module.css';
import logo from '../../assets/logo.webp';
import { Input } from '../../components/input';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


interface IFormValues{
  email:string;
  password:string;
}

export function Login() {
  const schema = yup.object().shape({
    email: yup
    .string()
    .email('Digite um email válido')
    .required('Campo de email obrigatório'),
   password: yup
   .string()
   .min(6)
   .required('Campo de senha origatório'),
  });

  const {register, handleSubmit, formState: {errors}} = useForm<IFormValues>({resolver: yupResolver(schema)});
  
  const submit = handleSubmit((data) => {
    console.log("🚀 ~ file: index.tsx:28 ~ Login ~ data:", data)})

  return (
    <div className={style.background}>
      <div className={`container ${style.container}`} >
        <div className={style.wrapper}>
          <div>
            <img className={style.logo} src={logo} alt='logo' />
            <p className={style.nameLogo} >Beleza e Estética</p>
          </div>
          <div className={style.card}>
            <h2>Olá! Seja Bem Vindo.</h2>
            <form onSubmit={submit}>
             <Input
             placeholder="Email"
             type = 'text'
             error ={errors.email && errors.email.message}
             {...register('email',{required:true})} 
             />
             <Input
             placeholder="Senha"
             type = 'password'
             {...register('password',{required:true})} 
             />
              <button></button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}