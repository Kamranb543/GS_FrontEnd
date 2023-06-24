import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';







const Signin = ({showMsg}) => {
    const[formInput,setFormInput]=useState({email:'',password:''});
    const router = useRouter();

    useEffect(()=>{
        if (Cookies.get('token')) {
            router.push('/')
        }
    })


    function handleChange(e) {
        let {name,value} = e.target;
        setFormInput({...formInput,[name]:value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
       if(Object.values(formInput).every(value=>value !== '')){
            try {
            const resp = await fetch('http://127.0.0.1:8000/api/login', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formInput)
            });
            const data = await resp.json();
            if('success' in data && 'userToken' in data){
              showMsg(data.success)
              const expirationDate = new Date();
              expirationDate.setDate(expirationDate.getDate() + 7);
              Cookies.set('token', data.userToken, { path: '/',expires:expirationDate })
              Cookies.set('userData',JSON.stringify(data.userData), { path: '/',expires:expirationDate })
                  router.push('/')
            }else{
              toast.error(data.error);
            }
          } catch (error) {
            console.log(error);
          }
        // alert('working')
       }else{
        toast.error('All Fieds Must Be Filled');
       }
      }

      
    return ( 
        <div>
            <div className="relative    h-[80vh] flex flex-col sm:justify-center items-center  bg-gray-100 ">
          
                <div className="relative sm:max-w-sm w-full">
                    <div className="card bg-[#363636] shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                    <div className="card bg-red-800 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                    <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                        <label htmlFor="" className="block mt-3 text-lg text-gray-700 text-center font-semibold">
                            Login
                        </label>
                        <form onSubmit={handleSubmit} className="mt-10">

                            
                            <div className='my-5'>
                                <input type="text" placeholder="Enter Your Email" value={formInput.email}  onChange={handleChange} name='email' className="mt-1 block w-full rounded-lg shadow-lg  px-4 py-3  text-sm bg-gray-100 outline-none hover:bg-red-100 focus:z-10 focus:border-red-500 focus:ring-red-500" />
                            </div>
                            <div className='my-5'>
                                <input type="text" placeholder="Enter Your Password"  value={formInput.password} onChange={handleChange} name='password' className="mt-1 block w-full rounded-lg shadow-lg  px-4 py-3  text-sm bg-gray-100 outline-none hover:bg-red-100 focus:z-10 focus:border-red-500 focus:ring-red-500" />
                            </div>



                            <div className="mt-7">
                                <button className="bg-red-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                    Login
                                </button>
                            </div>

                            <div className="flex mt-7 items-center justify-center text-center">
                                <hr className="border-gray-300 border-1 w-[40%] rounded-md" />
                                <div className="flex justify-center items-center">
                                    <Link href={'/Signup'} className=" text-red-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">Sign Up</Link>
                                </div>
                                <hr className="border-gray-300 border-1 w-[40%] rounded-md" />
                            </div>

                            <div className="flex mt-7 justify-center w-full">
                                <button className="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">

                                    Facebook
                                </button>

                                <button className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">

                                    Google
                                </button>
                            </div>

                            <div className="mt-5">
                                <div className="flex justify-center items-center">
                                    <Link href={'/Forgotpassword'} className=" text-red-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">Forgot Password</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin
