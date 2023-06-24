import Cookies from 'js-cookie';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// http://127.0.0.1:8000/api/register/
const Signup = ({ showMsg }) => {
    const [formInput, setFormInput] = useState({ name: '', email: '', role: '', password: '', confirmPassword: '' });
    const router = useRouter();
    function handleChange(e) {
        let { name, value } = e.target;
        setFormInput({ ...formInput, [name]: value })
    }
    function handlSubmit(e) {
        e.preventDefault();
        if (Object.values(formInput).every(value => value !== '')) {

            if (formInput.password !== formInput.confirmPassword) {
                toast.error('Password does not match');
            } else {
                fetch('http://127.0.0.1:8000/api/register/',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(formInput)
                    }
                ).then((resp) => {
                    resp.json().then((data) => {
                        if ('success' in data) {
                            showMsg(data.success);
                            setFormInput({ name: '', email: '', role: '', password: '', confirmPassword: '' });
                            const expirationDate = new Date();
                            expirationDate.setDate(expirationDate.getDate() + 7);
                            Cookies.set('token', data.token, { path: '/', expires: expirationDate })
                            Cookies.set('userData', JSON.stringify(data.userData), { path: '/', expires: expirationDate })
                            router.push('/')
                        } else {
                            if (Object.keys(data.error).length > 1) {
                                toast.error('Fill all fields validly');
                            } else {
                                let error = JSON.stringify(data.error[Object.keys(data.error)]);
                                console.log(error)
                                toast.error(error);
                            }
                        }
                    })
                })
            }

        } else {
            toast.error('All Fields Must Be Filled!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    return (
        <div>
            <div className="relative  min-h-[80vh]  max-h-[90vh] flex flex-col sm:justify-center items-center  bg-gray-100 ">

                <div className="relative sm:max-w-sm w-full">
                    <div className="card bg-[#363636] shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                    <div className="card bg-red-800 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                    <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                        <label htmlFor="" className="block mt-3 text-lg text-gray-700 text-center font-semibold">
                            Sign Up
                        </label>
                        <form onSubmit={handlSubmit} className="mt-10">

                            <div className='my-5'>
                                <input type="text" placeholder="Enter Your Name" value={formInput.name} name='name' onChange={handleChange} className="mt-1 transition-all block w-full rounded-lg shadow-lg  px-4 py-3  text-sm bg-gray-100 outline-none hover:bg-red-100 focus:z-10 focus:border-red-500 focus:ring-red-500" />
                            </div>
                            <div className='my-5'>
                                <input type="text" placeholder="Enter Your Email" value={formInput.email} name='email' onChange={handleChange} className="mt-1 transition-all block w-full rounded-lg shadow-lg  px-4 py-3  text-sm bg-gray-100 outline-none hover:bg-red-100 focus:z-10 focus:border-red-500 focus:ring-red-500" />
                            </div>
                            <div className='my-5'>
                                <div className='my-5'>
                                    <select value={formInput.role} name='role' onChange={handleChange} className="mt-1 text-gray-400 transition-all block w-full rounded-lg shadow-lg px-4 py-3 text-sm bg-gray-100 outline-none hover:bg-red-100 focus:z-10 focus:border-red-500 focus:ring-red-500">
                                        <option value="" disabled defaultValue className='text-black'>Select Your Role</option>
                                        <option value="client" className='text-black'>Customer</option>
                                        <option value="seller" className='text-black'>Seller</option>
                                    </select>
                                </div>
                            </div>
                            <div className='my-5 text-center'>
                                <input type="text" placeholder="Create Password" value={formInput.password} name='password' onChange={handleChange} className="mt-1 transition-all block w-full rounded-lg shadow-lg  px-4 py-3  text-sm bg-gray-100 outline-none hover:bg-red-100 focus:z-10 focus:border-red-500 focus:ring-red-500" />
                                <label htmlFor="img" className='opacity-40'>Password must be at least 8 characters.</label>
                            </div>
                            <div className='my-5'>
                                <input type="text" placeholder="Confirm Password" value={formInput.confirmPassword} name='confirmPassword' onChange={handleChange} className="mt-1 transition-all block w-full rounded-lg shadow-lg  px-4 py-3  text-sm bg-gray-100 outline-none hover:bg-red-100 focus:z-10 focus:border-red-500 focus:ring-red-500" />
                            </div>



                            <div className="mt-7">
                                <button className="bg-red-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                    Register
                                </button>
                            </div>

                            <div className="flex mt-7 items-center text-center">
                                <hr className="border-gray-300 border-1 w-full rounded-md" />
                                <div className="flex justify-center  items-center">
                                    <Link href={'/Signin'} className=" text-red-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">Login</Link>
                                </div>
                                <hr className="border-gray-300 border-1 w-full rounded-md" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
