import {AiOutlineMail} from 'react-icons/ai';
import style from'./Input.module.css';

interface IInput{placeholder?:string}

export const Input = ({placeholder}:IInput)=>{
    return(
        <div className={style.container} >
            <label htmlFor="">
                <input type="text" placeholder={placeholder} ></input>
                <i aria-hidden="true">
                    <AiOutlineMail size={25} />
                    </i>
            </label>
        </div>
    )
}