import { ReactNode, createContext, useState } from "react";
import { api } from "../server";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IAuthProvider { children: ReactNode }
interface IAuthContextData { 
  signIn: ({ email, password }: ISignIn) => void;
  signOut: ()=>void;
  user:IUserData
}
interface IUserData{name:string,avatar_url:string, email:string}
interface ISignIn { email: string, password: string }

export const AuthContext = createContext({} as IAuthContextData);


export function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState(()=>{
    const user = localStorage.getItem('user:token-timeScheduling')
    if(user){
      return JSON.parse(user)
    }
    return {};
  })
  const navigate = useNavigate();
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
    <AuthContext.Provider value={{ signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  )
}