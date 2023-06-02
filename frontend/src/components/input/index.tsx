import style from './Input.module.css';
import { ForwardRefRenderFunction, ReactNode, forwardRef } from 'react';

interface IInput {
  placeholder?: string;
  type: 'password' | 'text' | 'date';
  icon?: ReactNode
  error?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = ({ placeholder, type, icon, error, ...rest }, ref) => {
  return (
    <div className={style.container} >
      <label htmlFor="">
        <input type={type} placeholder={placeholder} ref={ref} {...rest} ></input>
        <i aria-hidden="true">
          {icon}
        </i>
      </label>
      {error && <span>{error}</span>}
    </div>
  )
};
export const Input = forwardRef(InputBase);