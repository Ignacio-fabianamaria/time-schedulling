import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import logo from '../../assets/logo.webp';
import { Input } from '../../components/input';
import style from './Register.module.css';
import { Button } from '../../components/button';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {AiOutlineMail} from 'react-icons/ai';
import {BsPersonCircle} from 'react-icons/bs';
import {RiLockPasswordLine} from 'react-icons/ri';
import { api } from '../../server';
import { isAxiosError } from 'axios';

interface IFormValues {
  name: string;
  email: string;
  password: string;
}

export function Register() {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup
    .string()
    .required('Campo de nome obrigatório.'),
    email: yup
    .string()
    .email('Digite um email válido.')
    .required('Campo de email obrigatório.'),
    password: yup
    .string()
    .min(6, 'Mínimo de 6 caracteres')
    .required('Campo de senh obrigatório')
  })
  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>({resolver: yupResolver(schema)});
  
  const submit = handleSubmit(async(data) => {
    try {
      const result = await api.post('/users', {
        name:data.name,
        email:data.email,
        password:data.password,
      });
      toast.success('Cadastrado com sucesso');
        navigate('/')
      console.log("🚀 ~ file: index.tsx:41 ~ submit ~ result:", result.data)
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  });

  return (
    <div className={style.background} >
      <div className="container">
        <p className={style.navigate}>
          <Link to={'/'}>
            Home {'>'} Área de Cadastro
          </Link>
        </p>
      </div>
      <div className={style.wrapper}>
        <div className={style.imageContainer}>
          <img className={style.logo} src={logo} alt='logo' />
          <p className={style.nameLogo} >Beleza e Estética</p>
        </div>
        <div className={style.card}>
          <h2>Área de Cadastro.</h2>
          <form onSubmit={submit}>
            <Input
              placeholder="Name"
              type='text'
              error={errors.name && errors.name.message}
              icon={<BsPersonCircle size={25} />}
              {...register('name', { required: true })}
            />
            <Input
              placeholder="Email"
              type='text'
              icon={<AiOutlineMail size={25} />}
              error={errors.email && errors.email.message}
              {...register('email', { required: true })}
            />
            <Input
              placeholder="Senha"
              type='password'
              icon={<RiLockPasswordLine size={25} />}
              error={errors.password && errors.password.message}
              {...register('password', { required: true })}
            />
            <Button text='Cadastrar' />
          </form>
          <div className={style.register}>
            <span>Já tem cadastro?
              <Link to={'/'}>
                Fazer login.
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}