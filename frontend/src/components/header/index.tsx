import style from './Header.module.css';
import logo from '../../assets/logo.webp';
import { BsPersonCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks/auth';

export function Header() {
  const { signOut } = useAuth();
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
            <li className={style.dropdownMenuItem}
              onClick={() => navigate('/schedules')}>Agendamentos</li>
            <li className={style.dropdownMenuItem}
              onClick={() => navigate('/edit-profile')}>Editar</li>
            <li className={style.dropdownMenuItem}
              onClick={signOut} >Sair</li>
          </ul>
        </div>
      </div>
    </header>
  )
}