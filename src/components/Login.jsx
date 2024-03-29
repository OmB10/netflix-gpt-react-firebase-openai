import React, { useRef, useState } from 'react'
import Header from './Header'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { BG_IMAGE } from '../utils/constants';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true)
    const toggleSignInForm = () => setIsSignInForm(!isSignInForm)

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)

    const email = useRef(null)
    const password = useRef(null)

    const handleButtonClick = () => {
        const message = checkValidData(email.current.value, password.current.value)
        setErrorMessage(message);

        if (message) return
        //sign in or sign up

        if (!isSignInForm) {
            //sign up 

            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value

            )
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode, errorMessage)

                });

        } else {
            //sign in

            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value,
            )
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode, errorMessage)
                });
        }
    }

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src={BG_IMAGE} className='w-screen' style={{ filter: 'brightness(50%)' }} alt="background" />
            </div>

            <div className="absolute bg-black bg-opacity-80 p-4 md:p-8 rounded-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-3/12 my-16 md:my-36 left-0 right-0 mx-auto">
                <h2 className="text-white text-2xl md:text-3xl mb-6">{isSignInForm ? "Sign In" : "Sign Up"}</h2>

                {!isSignInForm && <input
                    type="text"
                    name="Name"
                    placeholder="Enter Your Name"
                    className="p-2 mb-4 w-full bg-[#454545] text-white rounded"
                />}

                <input
                    type="text"
                    name="email"
                    ref={email}
                    placeholder="Email or phone number"
                    className="p-2 mb-4 w-full bg-[#454545] text-white rounded"
                />

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        ref={password}
                        placeholder="Password"
                        className="p-2 w-full bg-[#454545] text-white rounded"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm">
                        {showPassword ? (
                            <EyeOffIcon className="h-4 md:h-6 text-[#8c8c8c]" onClick={() => setShowPassword(false)} />
                        ) : (
                            <EyeIcon className="h-4 md:h-6 text-[#8c8c8c]" onClick={() => setShowPassword(true)} />
                        )}
                    </div>
                </div>
                <p className='text-red-500 '>{errorMessage}</p>
                <button className="p-2 w-full bg-red-600 hover:bg-red-700 text-white rounded mt-5 mb-4" onClick={handleButtonClick}>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>

                <div className='flex justify-between items-center'>
                    <label className='flex items-center'>

                        <input
                            className='w-4 h-4'
                            type='checkbox'
                        />
                        <span className='ml-1 text-white'>Remember me</span>
                    </label>
                    <h3 className='text-white cursor-pointer'>Need help?</h3>
                </div>

                <div className='mt-10'>
                    <h2 className='text-[#737373]'>{isSignInForm ? "New to Netflix?" : "Already Registered!!"} <span onClick={toggleSignInForm} className='text-white cursor-pointer'>{isSignInForm ? "Sign Up now" : "Sign In now"}</span></h2>
                </div>
            </div>
        </div>


    )
}

export default Login