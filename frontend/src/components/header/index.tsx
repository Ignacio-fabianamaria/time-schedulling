import style from './Header.module.css';
import logo from '../../assets/logo.webp';
import { BsPersonCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  return (
    <header className={style.background}>
      <div className={style.image} onClick={() => navigate('/dashboard')}>
        <img className={style.logo} src={logo} alt='' />
        <span>Beleza e Estética</span>
      </div>
      <div className={style.profile}>
      <div className={style.dropdown} onClick={() => setOpen(!open)}>
        <BsPersonCircle size={25} />
        <span>Perfil</span>
          <ul className={`${style.dropdownMenu} ${open && style.open}`}>
            <li className={style.dropdownMenuItem}>Agendamentos</li>
            <li className={style.dropdownMenuItem}>Editar</li>
            <li className={style.dropdownMenuItem}>Sair</li>
          </ul>
        </div>
      </div>
    </header>
  )
}