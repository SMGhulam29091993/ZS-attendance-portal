import React,{ useState} from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess, userSelector, token } from '../redux/user/userSlice';

const SignIn = () => {
  const {loading, error, currentUser,} = useSelector(userSelector);
  const [formData,setFormData] = useState({ email:"",password: ""});
    const dispatch = useDispatch();

    const navigate = useNavigate(); 

    // the below handleChange function will take the value from form and store in formData
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.id] : e.target.value
        })
    }
    
    //the below function will send the formData that contans user credentials to backend and register it to DB
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(formData);
        try {
            dispatch(signInStart())
            const res = await axios.post(`https://zs-attendance-portal.onrender.com/api/v1/user/sign-in`, formData);
            const responseData = res.data;
            console.log(responseData);
            if(!responseData.success){
                dispatch(signInFailure(responseData.message));
                return;
            }
            dispatch(signInSuccess(responseData.user))
            dispatch(token(responseData.token))
            console.log("Loading : ", loading);
            // if everything goes fine user is registered then navigate to sign-in page
            navigate(`/profile/${currentUser._id}`)

        } catch (error) {
            if(error.response){
                console.error("Server Error Response:", error.response.data);
                dispatch(signInFailure(error.response.data.message));
            }else if(error.request){
                console.error(`No response received from server ${error.request}`);
                dispatch(signInFailure(error.request));
            }else{
                console.error(`Request setup error : ${error.message}`);
                dispatch(signInFailure(error.message))
            }
        }
    }

  return (
    <>
        <div className='mx-auto my-10 shadow-zinc-600 shadow-md max-w-xl'>
            {error && <p className='text-red-500 mt-5 text-center'>{error}</p>}
            <div className='w-full flex flex-col items-center justify-center gap-4 p-3'>
                <h1 className='font-semibold text-lg sm:text-2xl text-orange-300'>Sign In</h1>
                <form className='w-full text-xs sm:text-lg' onSubmit={handleSubmit}>   
                    <div className='flex items-center flex-wrap gap-4 mb-2'>
                        <label  style={{width:"20%"}}>
                            Email 
                        </label>
                        <input type='email' placeholder='Enter your email' value={formData.email} onChange={handleChange} id='email'
                            className='border border-slate-700 rounded p-1 outline-none bg-transparent' style={{width:"70%"}} required/>
                    </div>
                    <div className='flex items-center flex-wrap gap-4 mb-2'>
                        <label  style={{width:"20%"}}>
                            Password 
                        </label>
                        <input type='password' placeholder='Enter your password' value={formData.password} onChange={handleChange} id='password'
                            className='border border-slate-700 rounded p-1 outline-none bg-transparent' style={{width:"70%"}} required/>
                    </div>
                    <button  type='submit' className='w-full bg-blue-700 p-3 text-white rounded-lg uppercase hover:opacity-90'>
                        {loading?"Logging":"Sign In"}
                    </button>
                    <p className='mt-3 text-md'>New User? <Link to="/sign-up"><span className='text-blue-700'>Sign-up</span></Link></p> 
                </form>
            </div> 
                     
        </div>
    </>
  )
}

export default SignIn