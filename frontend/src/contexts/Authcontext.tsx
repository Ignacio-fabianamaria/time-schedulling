import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../server";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IAuthProvider { children: ReactNode }
interface IAuthContextData { 
  signIn: ({ email, password }: ISignIn) => void;
  signOut: ()=>void;
  schedules:Array<ISchedule>;
  user:IUserData;
  availableSchedules: Array<string>;
  date:string;
  handleSetDate:(date:string)=> void;
  isAuthenticated:boolean;
}
interface IUserData{name:string,avatar_url:string, email:string}
interface ISignIn { email: string, password: string }
interface ISchedule {name:string, phone:string, date:Date, id:string}

export const AuthContext = createContext({} as IAuthContextData);


export function AuthProvider({ children }: IAuthProvider) {
  const [schedules, setSchedules] = useState<Array<ISchedule>>([]);
  const [date, setDate] = useState('');
  console.log('Valor inicial de date:', date);
  const availableSchedules = ['09','10','11','12','13','14','15','16','17','18','19'];
  const [user, setUser] = useState(()=>{
    const user = localStorage.getItem('user:token-timeScheduling')
    if(user){
      return JSON.parse(user)
    }
    return {};
  });

const isAuthenticated = !! user && Object.keys(user).length !== 0;

  const navigate = useNavigate();
  const handleSetDate = (date: string)=>{
    setDate(date)
    
  }

  useEffect(() => {
    api
      .get('/schedules', {params: {date}})
      .then((response) => {setSchedules(response.data)})
      .catch((error) => console.log(error));
  }, [date]);

  async function signIn({ email, password }: ISignIn) {
    try {
      const { data } = await api.post('/users/auth', { email, password });
      const { user, token, refresh_Token } = data;
      const userData = {
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
      };
      localStorage.setItem('token:token-timeScheduling', token);
      localStorage.setItem('refresh_token:token-timeScheduling', refresh_Token);
      localStorage.setItem('user:token-timeScheduling', JSON.stringify(userData));
      navigate('/dashboard');
      toast.success(`Seja bem vindo(a)!, ${userData.name}`);
      setUser(userData);
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message)
      }else{
        toast.error('Não conseguimos realizar o login, tente mais tarde.')
      }
    }
  }
function signOut(){
  localStorage.removeItem('token:token-timeScheduling');
  localStorage.removeItem('refresh_token:token-timeScheduling');
  localStorage.removeItem('user:token-timeScheduling');
  navigate('/');
}

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      user,
      availableSchedules,
      schedules,
      date,
      handleSetDate,
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  )
}