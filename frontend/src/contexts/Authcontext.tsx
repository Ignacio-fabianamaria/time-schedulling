import { ReactNode, createContext } from "react";
import { api } from "../server";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

interface IAuthProvider { children: ReactNode }
interface IAuthContextData { signIn: ({ email, password }: ISignIn) => void }
interface ISignIn { email: string, password: string }

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: IAuthProvider) {
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
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message)
      }else{
        toast.error('Não conseguimos realizar o login, tente mais tarde.')
      }
    }
  }
  return (
    <AuthContext.Provider value={{ signIn }}>
      {children}
    </AuthContext.Provider>
  )
}