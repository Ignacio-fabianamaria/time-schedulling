import { useForm } from 'react-hook-form';
import { Header } from '../../components/header';
import { InputSchedule } from '../../components/inputSchedule';
import style from './EditProfile.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import imageDefault from '../../assets/avatar-img.webp';
import { FiEdit } from 'react-icons/fi';
import { api } from '../../server';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';



interface IFormValues {
  picture: File[];
  name: string;
  email: string;
  password: string
  newPassword: string;
  confirmPassword: string;
}


interface IData {
  newPassword?: string;
  oldPassword?: string;
  name?: string;
  avatar_url?: File;
}

export function EditProfile() {
  const navigate = useNavigate();
  const [fileUpload, setFileUpload] = useState(imageDefault);
  const schema = yup.object().shape({
    name: yup.string(),
    newPassword: yup.string(),
    oldPassword: yup.string().oneOf([yup.ref('newPassword')], 'senha deve ser iguais')

  })
  const { register, handleSubmit, setValue } = useForm<IFormValues>({ resolver: yupResolver(schema) });
  const submit = handleSubmit(
    async ({ name, password, newPassword, picture }: IFormValues) => {
      const data: IData = {
        name,
      };
      if (password && newPassword) {
        data.oldPassword = password;
        data.newPassword = newPassword;
      }
      if (picture) {
        data.avatar_url = picture[0];
      }
      try {
        const result = await api.put('/users', data, {
          headers: {
            'Content-Type': 'multpart/form-data',
          },
        });
        console.log('🚀 ~ file: index.tsx:70 ~ result:', result);
        toast.success('Usuário atualizado com sucesso');
        navigate('/dashboard');
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message);
        }
      }
    },
  );

  useEffect(() => {
    const userStorage = localStorage.getItem('user:token-timeScheduling');
    const user = userStorage && JSON.parse(userStorage);
    console.log("🚀 ~ file: index.tsx:34 ~ useEffect ~ user:", user)

    setValue('name', user.name);
    setValue('email', user.email);
    setValue('picture', user.avatar_url);
  }, []);

  const handleImage = (files:File[])=>{
const image = files[0];
const image_url = URL.createObjectURL(image);
setFileUpload(image_url);
  }

  return (
    <div className={`${style.container} container`}>
      <Header />
      <h2>Editar Perfil</h2>
      <div className={style.formDiv}>
      <form onSubmit={submit}>
          {fileUpload && (
            <div className={style.fileUpload}>
              <img src={fileUpload} alt='avatarDefalt'  width={'200px'} />
              <label className={style.imageUpload}>
              <input type='file'  {...register('picture', { required: true, onChange:(e)=>handleImage(e.target.files) })} />
              <FiEdit/>
              </label>
            </div>
          )}
          <InputSchedule
            placeholder='Nome'
            type='text'
            {...register('name', { required: true })}
          />
          <InputSchedule
            placeholder='Email'
            type='text'
            {...register('email', { required: true })}
          />
          <InputSchedule
            placeholder='Senha Atual'
            type='password'
            {...register('password', { required: true })} />
          <InputSchedule
            placeholder='Nova Senha'
            type='password'
            {...register('newPassword', { required: true })}
          />
          <InputSchedule
            placeholder='Confirmar nova senha'
            type='password'
            {...register('confirmPassword', { required: true })}
          />
        <div className={style.footer}>
          <button >Cancelar</button>
          <button >Editar</button>
        </div>
        </form>
      </div>
    </div>
  )
}