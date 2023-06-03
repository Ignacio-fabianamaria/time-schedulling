import style from './Login.module.css';
import logo from '../../assets/logo.webp';
import { Input } from '../../components/input';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../../components/button';
import { Link, useNavigate } from 'react-router-dom';
import {AiOutlineMail} from 'react-icons/ai';
import {RiLockPasswordLine} from 'react-icons/ri';
import { api } from '../../server';


interface IFormValues{
  email:string;
  password:string;
}

export function Login() {
  const navigate = useNavigate();
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

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<IFormValues>({
    resolver: yupResolver(schema)
  });
  
  const submit = handleSubmit(async(data) => {
   const result = await api.post('/users/auth', {
    email:data.email,
    password:data.password,
   });
   navigate('/dashboard');
   console.log("🚀 ~ file: index.tsx:44 ~ submit ~ result:", result)})

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
             icon={<AiOutlineMail size={25} />}
             error ={errors.email && errors.email.message}
             {...register('email',{required:true})} 
             />
             <Input
             placeholder="Senha"
             type = 'password'
             icon={<RiLockPasswordLine size={25} />}
             error={errors.password && errors.password.message}
             {...register('password',{required:true})} 
             />
              <Button text='Entrar'/>
            </form>
            <div className={style.register}>
            <span>Ainda não tem conta? 
              <Link to={'/register'}>
                Cadastre-se
                </Link>
                </span>
                </div>
          </div>
        </div>
      </div>
    </div>
  )
}