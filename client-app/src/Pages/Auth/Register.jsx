import React, { useState } from 'react';
import styles from './auth.module.scss';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import Card from '../../Components/Card/Card';
import RegisterImg from '../../assets/register.gif'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoaderSpinner from '../../Components/Loader/LoaderSpinner';
import { API_URL } from '../../Components/Api';



const initialState = {
  username: "",
  email: "",
  password: "",
  comfirmpassword: "",
};

const Register = () => {
   
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState); 
  const {username, email, password, comfirmpassword} = formData;
  const [loading, setLoading] = useState(false);

    //toggling for password eye
  const [passwordEye, setPasswordEye] = useState(false);
  const handlePasswordEye = () => {
    setPasswordEye(!passwordEye)
  }
  
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const handleConfirmPasswordEye = () => {
    setConfirmPasswordEye(!confirmPasswordEye)
  }

  //handles the onchange input fields
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };


 //validating the email
 const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!username || !email || !password) {
    return toast.error(<p className='text-xl'>All fields are required</p>);
  }
  if (password.length < 6) {
    return toast.error(<p className='text-xl'>Passwords must be up to 6 characters</p>);
  };
  if (!validateEmail(email)) {
    return toast.error(<p className='text-xl'>Please enter a valid email</p>);
  };
  if (password !== comfirmpassword) {
    return toast.error(<p className='text-xl'>Passwords do not match</p>);
  };

  try {
    setLoading(true);
    const res = await fetch('https://chattyapp-iwdo.onrender.com/api/auth/signup', {
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
      toast.error(<p className='text-xl'>{data.message}</p>);
      return;
    }

    setLoading(false);
    navigate('/login');
    toast.success("signup successfully");
  } catch (error) {
    setLoading(false);  
    toast.error(<p className='text-xl'>{error.message}</p>);
  }
};




  return (
    <>
    {loading && <LoaderSpinner />}
    <section className={`container pt-10 ${styles.auth}`}>
        
        <Card>
        <div className={styles.form}>
           <h2>Register to chatty app</h2>
           
           <form autoComplete='on' onSubmit={handleSubmit}>

           <input
            id='username' 
            onChange={handleChange}
            type="text" 
            placeholder='Enter your name and it must be unique'
            required
            />

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
            
            <div className=' my-2 w-full relative'>
            <input 
            id='comfirmpassword'
            onChange={handleChange}
            type={(confirmPasswordEye === false) ? 'password' : 'text'} 
            placeholder='Confirm password' 
            required
            />
            <div className='absolute right-2 top-6'>
            {(confirmPasswordEye === false) ? <AiFillEyeInvisible size={20} onClick={handleConfirmPasswordEye} className='text-gray-400'/> : <AiFillEye size={20} onClick={handleConfirmPasswordEye} className='text-gray-400'/>}
            </div>
            </div>
             
            <button 
            type='submit' 
            className='--btn --btn-primary --btn-block'>Register</button>
           </form>
            <span className={styles.register}>
                <p>Already have an account?</p> 
                <Link to='/login' className='underline text-[blue] hover:text-[blue]'> Login</Link>
            </span>

            {/* <span className='m-5 text-center'> <p> By signing up you accept our <Link to='/terms-and-conditions' className='underline text-[blue] hover:text-[blue]'> terms and conditions </Link> 
            <Link to='/privacy-policy' className='underline text-[blue] hover:text-[blue]'> & privacy policy </Link> 
            </p> </span> */}
        </div>
        </Card>
        <div className={styles.img}>
         <img src={RegisterImg} alt="RegisterImg" width='600'/>
        </div>
    </section>
    </>
  )
}

export default Register;
