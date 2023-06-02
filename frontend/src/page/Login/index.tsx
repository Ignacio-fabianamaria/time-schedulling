import style from './Login.module.css';
import logo from '../../assets/logo.webp';
import { Input } from '../../components/input';

export function Login() {
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
            <form>
             <Input placeholder="Email"/>
             <Input placeholder="Senha" />
              <button></button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}