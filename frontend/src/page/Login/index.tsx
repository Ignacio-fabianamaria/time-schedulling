import style from './Login.module.css';
import logo from '../../assets/logo.png';

export function Login() {
  return (
    <div className={style.background}>
      <div className={`container ${style.container}`} >
        <div className={style.wrapper}>
          <div>
            <img src={logo} alt='logo' />
          </div>
          <div className={style.card}>
            <h2>Olá! Seja Bem Vindo.</h2>
            <form>
              <input type="text" />
              <input type="text" />
              <button></button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}