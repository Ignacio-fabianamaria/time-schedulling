import { Link } from 'react-router-dom';
import logo from '../../assets/logo.webp';
import { Input } from '../../components/input';
import style from './Register.module.css';
import { Button } from '../../components/button';

export function Register() {
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
          <form >
            <Input
              placeholder="Email"
              type='text'
              /* error={errors.email && errors.email.message}
              {...register('email', { required: true })} */
            />
            <Input
              placeholder="Senha"
              type='password'
              /* {...register('password', { required: true })} */
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