import React, { useState } from 'react';
import styles from './auth.module.scss';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import Card from '../../Components/Card/Card';
import loginImg from '../../assets/logingif.gif'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import LoaderSpinner from '../../Components/Loader/LoaderSpinner';
import { API_URL } from '../../Components/Api';
import { signInFailure, signInStart, signInSuccess } from '../../Redux/User/Auth.Slice';



const initialState = {
  email: "",
  password: "",
};

const Login = () => {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [formData, setFormData] = useState(initialState); 
  const [loading, setLoading] = useState(false);

  //handles the onchange input fields
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };



    //toggling for password eye
    const [passwordEye, setPasswordEye] = useState(false);
    const handlePasswordEye = () => {
      setPasswordEye(!passwordEye)
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        setLoading(true);
        dispatch(signInStart());
        const res = await fetch(`${API_URL}/api/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        //console.log(data);
        if (data.success === false) {
          setLoading(false);
          dispatch(signInFailure(data.message));
          toast.error(<p className='text-xl'>{data.message}</p>);
          return;
        }
        dispatch(signInSuccess(data))
        setLoading(false);
        navigate('/chat');
        toast.success(<p className='text-xl'>signin successfully</p>);
      } catch (error) {
        setLoading(false);
        dispatch(signInFailure(error.message));
        toast.error(<p className='text-xl'>{data.message}</p>);
      }
    };


  return (
    <>
    {loading && <LoaderSpinner />}

    <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
         <img src={loginImg} alt="loginImg" width='400'/>
        </div>

        <Card>
        <div className={styles.form}>
           <h2> Login to chatty app </h2>
           
           <form autoComplete='on' onSubmit={handleSubmit}>
           
            <input
            id='email'
            onChange={handleChange} 
            type="email" 
            placeholder='email' 
            required
            />
            
            <div className='my-2 w-full relative'>
            <input 
            id='password'
            onChange={handleChange}
            type={(passwordEye === false) ? 'password' : 'text'} 
            placeholder='password' 
            required
            />
            <div className='absolute right-2 top-6'>
            {(passwordEye === false) ? <AiFillEyeInvisible size={20} onClick={handlePasswordEye} className='text-gray-400'/> : <AiFillEye size={20} onClick={handlePasswordEye} className='text-gray-400'/>}
            </div>
            </div>

            <button type='submit' className='--btn --btn-primary --btn-block '>Login</button>

            <div className={styles.links}>
               <Link to='/reset-password' className='text-[blue] underline hover:text-[blue]'> Reset Password</Link>
            </div>

            <p>-- or --</p>
           </form>
           

           <button className='--btn --btn-danger --btn-block '> <FcGoogle size={25} /> Login with Google</button>
            <span className={styles.register}> 
                <p>Don't have an account?</p> 
                <Link to='/register' className='text-[blue] underline hover:text-[blue]'> Register</Link>
            </span>
        </div>
        </Card>
    </section>
    </>
  )
}

export default Login;
