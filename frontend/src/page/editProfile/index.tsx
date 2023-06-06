import { Header } from '../../components/header';
import { InputSchedule } from '../../components/inputSchedule';
import style from './EditProfile.module.css';

export function EditProfile(){
    return(
<div className='container'>
    <Header />
    <div className={style.formDiv}>
        <form>
            <InputSchedule placeholder='Name' type='text' />
        </form>
    </div>
</div>
    )
}