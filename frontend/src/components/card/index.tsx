import { RiDeleteBin6Line } from 'react-icons/ri';
import { CiEdit } from 'react-icons/ci';
import style from './Card.module.css';

export const Card = () => {
  return (
    <div className={style.background}>
      <div>
        <span>10h</span>
        <p>Faby</p>
        </div>
        <div className={style.icons}>
          <CiEdit color="#5F68B1" size={22} />
          < RiDeleteBin6Line color="#EB2E2E" size={17}/>
        </div>
      </div>
  )
}