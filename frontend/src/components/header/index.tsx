import style from './Header.module.css';
import logo from '../../assets/logo.webp';

export function Header(){

    return(
        <header className={style.background}>
            <div className={style.image}>
                <img src={logo} alt='' />
                <span>Beleza e Estética</span>
            </div>
            <div className={style.profile}>
                
            </div>
        </header>
    )
}