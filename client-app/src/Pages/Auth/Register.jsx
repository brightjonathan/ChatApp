import React, { useState } from 'react';
import styles from './auth.module.scss';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import Card from '../../Components/Card/Card';
import RegisterImg from '../../assets/register.gif'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { basicSchema } from './Scheme/SchemeIndex';


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

//handles submit in react
const onSubmit = async ({username, email, password}, actions)=>{
      //api will be here
      try {
        //console.log({username, email, password});
      } catch (error) {
        console.log(error);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      actions.resetForm();
}
 

    //de-structuring the property of useFormik()
    const {values, handleBlur, isSubmitting, touched, errors, handleChange, handleSubmit} = useFormik({
      initialValues: {
         username: '',
         email: '',
         password: '',
         confirmPassword: "",
      },
      
      //validation
      validationSchema: basicSchema,
      onSubmit
    });


  return (
    <>
    {/* {loadingState && <Loader/>} */}
    <section className={`container pt-10 ${styles.auth}`}>
        
        <Card>
        <div className={styles.form}>
           <h2>Register to chatty app</h2>
           
           <form autoComplete='off' onSubmit={handleSubmit}>

           <input
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            id='username' 
            type="text" 
            placeholder='Enter you name, must be unique' 
            required
            className={errors.username && touched.username ? 'border-[red]' : ''}
            />
            {errors.username && touched.username && <p className='text-[red]'>{errors.username}</p>}

            <input
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            id='email' 
            type="email" 
            placeholder='email' 
            required
            className={errors.email && touched.email ? 'text-[red]' : ''}
            />
            {errors.email && touched.email && <p className='text-[red]'>{errors.email}</p>}

            <div className='my-2 w-full relative'>
            <input 
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            id='password'
            type={(passwordEye === false) ? 'password' : 'text'}
            placeholder='password' 
            required
            className={errors.password && touched.password ? 'input-error' : ''}
            />
            <div className='absolute right-2 top-6'>
            {(passwordEye === false) ? <AiFillEyeInvisible size={20} onClick={handlePasswordEye} className='text-gray-400'/> : <AiFillEye size={20} onClick={handlePasswordEye} className='text-gray-400'/>}
            </div>
            </div>
            {errors.password && touched.password && <p className='text-[red]'>{errors.password}</p>}
            
            <div className=' my-2 w-full relative'>
            <input 
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            id='confirmPassword' 
            type={(confirmPasswordEye === false) ? 'password' : 'text'} 
            placeholder='Confirm password' 
            required
            className={errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}
            />
            <div className='absolute right-2 top-6'>
            {(confirmPasswordEye === false) ? <AiFillEyeInvisible size={20} onClick={handleConfirmPasswordEye} className='text-gray-400'/> : <AiFillEye size={20} onClick={handleConfirmPasswordEye} className='text-gray-400'/>}
            </div>
            </div>
            {errors.confirmPassword && touched.confirmPassword && <p className='text-[red]'>{errors.confirmPassword}</p>}
             
            <button 
            type='submit' 
            disabled={isSubmitting}  
            className='--btn --btn-primary --btn-block'>Register</button>
           </form>
            <span className={styles.register}>
                <p>Already have an account?</p> 
                <Link to='/login'> Login</Link>
            </span>

            <span className='m-5 text-center'> <p> By signing up you accept our <Link to='/terms-and-conditions' className='underline'> terms and conditions </Link> 
            <Link to='/privacy-policy' className='underline'> & privacy policy </Link> 
            </p> </span>
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
