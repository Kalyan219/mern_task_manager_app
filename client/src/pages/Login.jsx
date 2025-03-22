import React , { useState }from 'react'

import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()
        const [Values, setValues] = useState({email:"",password:'',})
        const handleChange = (e) => {
            
            const {name, value} = e.target;
           
            setValues({...Values, [name]: value})
            
        };
        const login = async (e) => {
            e.preventDefault()
            try {
               const response = await axios.post("https://mern-task-manager-app-eiby.onrender.com/api/v1/login", Values,{
                withCredentials: true,
               })
               localStorage.setItem("userLoggedIn", "yes")
               navigate("/dashboard")
               console.log(response);
            }catch (error) {
                alert(error.response.data.error)
            }
        }
  return (
    <>
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='w-[60vw] md:w-[50vw] lg:w-[30vw]'>
          <h1 className='text-3xl font-bold text-center mb-1 text-blue-800'>Taskify</h1>
          <h3 className='text-center font-semibold text-xinc-900'>Login with Taskify</h3>
      </div>
      <div className='w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4'>
          <form className='flex flex-col gap-4'>
              
              <input type="email" onChange={handleChange} value={Values.email} name='email' required placeholder='email' className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none'/>
              <input type="password" onChange={handleChange} value={Values.passowrd} name='password' required placeholder='passowrd' className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none'/>
              <button className='bg-blue-800 text-white font-semi-bold py-2 rounded hover:bg-blue-700 transition-all duration-300' onClick={login}>
                Login
              </button>
              <p className='text-center font-semibold text-gray-900'>
                 Don't have an account ? <Link to="/register">Sign Up</Link>
              </p>
          </form>
      </div>
    </div>
  </>
  )
}

export default Login