import React from 'react'
import './LoginScreen.css'
import{FC, useState}from 'react'
import { AuthService } from '../../services/auth.service'
import{toast}from 'react-toastify'
import { setTokenToLocalStorage } from '../../helpers/localstorage.helper'
import { useAppDispatch } from '../../store/hooks'
import { useNavigate } from 'react-router-dom'
import { login } from '../../store/user/userSlice'

const LoginScreen: FC= () => {
    const[username, setLogin] = useState<string>('')
    const[password, setPassword] = useState<string>('')
    const[isLogin, setIsLogin] = useState<boolean>(false)
    const dispatch=useAppDispatch()
    const navigate=useNavigate()

    const loginHandler=async(e: React.FormEvent<HTMLFormElement>)=>{
        try{
        
            e.preventDefault()
            const data=await AuthService.login({username, password})

            if(data){
                setTokenToLocalStorage('token',data.token)
                dispatch(login(data))
                toast.success('You logged in')
                navigate('/home')
            }
        }catch(err: any){
            //const error=err.response?.data.message
            //toast.error(error.toString())
        }
    }

    const registrationHandler=async(e: React.FormEvent<HTMLFormElement>)=>{
        try{
            
            e.preventDefault()
            const data=await AuthService.registration({username, password})
            if(data){
                toast.success('Account has been created')
                setIsLogin(!isLogin)
            }
        }catch(err: any){
            //const error=err.response?.data.message
            //toast.error(error.toString())
            
        }
    }

    return (
        <div className='wrapper'>
           
           <form className='f' onSubmit={isLogin ? loginHandler: registrationHandler}>
                
                <h1 className='hello'>
                    {isLogin ? 'Вход':'Регистрация'}
                </h1>
                <input 
                    type="text"
                    className='input' 
                    placeholder='Введите логин' 
                    onChange={(e)=>setLogin(e.target.value)}
                    />
                <input
                    type="password" 
                    className='input' 
                    placeholder='Введите пароль'
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                <button className='btn_g'>Вход</button>
           </form>
           <div className='reg'>
                {
                    isLogin?(
                    <button className='b_reg' onClick={()=>setIsLogin(!isLogin)}>
                        Нет аккаунта? Зарегистрируйтесь
                    </button>
                    ):(
                        <button className='b_reg' onClick={()=>setIsLogin(!isLogin)}>
                            Вы уже имеете аккаунт?
                        </button>
                    )
                }
           </div>
        </div>
       
    )
}

export default LoginScreen
