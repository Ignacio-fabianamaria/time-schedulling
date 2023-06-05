import style from './InputSchedule.module.css';
import { ForwardRefRenderFunction, forwardRef } from 'react';

interface IInput {
  placeholder?: string;
  type: 'password' | 'text' | 'date';
  error?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = ({ type, placeholder, error, ...rest }, ref) => {
  return (
    <div className={style.container} >
      <label htmlFor="">{placeholder}</label>
      <input type={type} ref={ref} {...rest} ></input>
      {error && <span>{error}</span>}
    </div>
  )
};
export const InputSchedule = forwardRef(InputBase);