import React, { useState } from 'react';
import styles from './auth.module.scss';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import Card from '../../Components/Card/Card';
import RegisterImg from '../../assets/register.gif'
import { Link } from 'react-router-dom';

const Register = () => {

    //toggling for password eye
  const [passwordEye, setPasswordEye] = useState(false);
  const handlePasswordEye = () => {
    setPasswordEye(!passwordEye)
  }
  
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const handleConfirmPasswordEye = () => {
    setConfirmPasswordEye(!confirmPasswordEye)
  }


  return (
    <>
    {/* {loadingState && <Loader/>} */}
    <section className={`container pt-10 ${styles.auth}`}>
        
        <Card>
        <div className={styles.form}>
           <h2>Register to chatty app</h2>
           
           <form autoComplete='off'>

           <input
            // value={values.fullname}
            // onChange={handleChange}
            // onBlur={handleBlur}
            id='fullname' 
            type="text" 
            placeholder='Enter you name, must be unique' 
            required
            // className={errors.fullname && touched.fullname ? 'border-[#3a0303]' : ''}
            />
            {/* {errors.fullname && touched.fullname && <p className='error'>{errors.fullname}</p>} */}

            <input
            // value={values.email}
            // onChange={handleChange}
            // onBlur={handleBlur}
            id='email' 
            type="email" 
            placeholder='email' 
            required
            // className={errors.email && touched.email ? 'border-[#3a0303]' : ''}
            />
            {/* {errors.email && touched.email && <p className='error'>{errors.email}</p>} */}

            <div className='my-2 w-full relative'>
            <input 
            // value={values.password}
            // onChange={handleChange}
            // onBlur={handleBlur}
            id='password'
            type={(passwordEye === false) ? 'password' : 'text'}
            placeholder='password' 
            required
            // className={errors.password && touched.password ? 'input-error' : ''}
            />
            <div className='absolute right-2 top-6'>
            {(passwordEye === false) ? <AiFillEyeInvisible size={20} onClick={handlePasswordEye} className='text-gray-400'/> : <AiFillEye size={20} onClick={handlePasswordEye} className='text-gray-400'/>}
            </div>
            </div>
            {/* {errors.password && touched.password && <p className='error'>{errors.password}</p>} */}
            
            <div className=' my-2 w-full relative'>
            <input 
            // value={values.confirmPassword}
            // onChange={handleChange}
            //onBlur={handleBlur}
            id='confirmPassword' 
            type={(confirmPasswordEye === false) ? 'password' : 'text'} 
            placeholder='Confirm password' 
            required
            // className={errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}
            />
            <div className='absolute right-2 top-6'>
            {(confirmPasswordEye === false) ? <AiFillEyeInvisible size={20} onClick={handleConfirmPasswordEye} className='text-gray-400'/> : <AiFillEye size={20} onClick={handleConfirmPasswordEye} className='text-gray-400'/>}
            </div>
            </div>
            {/* {errors.confirmPassword && touched.confirmPassword && <p className='error'>{errors.confirmPassword}</p>} */}
             
            <button 
            type='submit' 
            //disabled={isSubmitting}  
            className='--btn --btn-primary --btn-block '>Register</button>
           </form>
            <span className={styles.register}>
                <p>Already have an account?</p> 
                <Link to='/login'> Login</Link>
            </span>

            {/* <span className='m-5 text-center'> <p> By signing up you accept our <Link to='/terms-and-conditions' className='underline'> terms and conditions </Link> 
            <Link to='/privacy-policy' className='underline'> & privacy policy </Link> 
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
