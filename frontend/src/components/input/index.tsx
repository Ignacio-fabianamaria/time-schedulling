import {AiOutlineMail} from 'react-icons/ai';
import style from'./Input.module.css';
import { ForwardRefRenderFunction, forwardRef } from 'react';

interface IInput{
    placeholder?:string;
    type: 'password' | 'text' | 'date' ;
    error?:string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput>= ({placeholder, type, error, ...rest}, ref)=>{
    return(
        <div className={style.container} >
            <label htmlFor="">
                <input type={type} placeholder={placeholder} ref={ref} {...rest} ></input>
                <i aria-hidden="true">
                    <AiOutlineMail size={25} />
                    </i>
            </label>
            {error && <span>{error}</span>}
        </div>
    )
};
export const Input = forwardRef(InputBase);