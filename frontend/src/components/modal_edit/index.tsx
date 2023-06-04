import style from './ModalEdit.module.css';

export function ModalEdit({ isOpen }) {
  if (isOpen) {
    return (
      <div className={style.background}>
        <div className={style.modal}>
          <h2>lalala</h2>
        </div>
      </div>
    );
  } else {
    return <></>
  }
}