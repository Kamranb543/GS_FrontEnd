import React from 'react'

import Link from 'next/link'
const Forgotpassword = () => {
  return (
    <div>
    <div class="relative    h-[80vh] flex flex-col sm:justify-center items-center  bg-gray-100 ">
        <div class="relative sm:max-w-sm w-full">
            <div class="card bg-[#363636] shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
            <div class="card bg-red-800 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
            <div class="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                <label for="" class="block mt-3 text-lg text-gray-700 text-center font-semibold">
                    Forgot Password
                </label>
                <form method="#" action="#" class="mt-10">

                    
                    <div className='my-5'>
                        <input type="text" placeholder="Enter Your Email" class="mt-1 block w-full rounded-lg shadow-lg  px-4 py-3  text-sm bg-gray-100 outline-none hover:bg-red-100 focus:z-10 focus:border-red-500 focus:ring-red-500" />
                    </div>

                    <div class="mt-7">
                        <button class="bg-red-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                            Continue
                        </button>
                    </div>

                    <div class="flex mt-7 items-center justify-center text-center">
                        <hr class="border-gray-300 border-1 w-[40%] rounded-md" />
                        <div class="flex justify-center items-center">
                            <Link href={'/Signin'} class=" text-red-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">Login</Link>
                        </div>
                        <hr class="border-gray-300 border-1 w-[40%] rounded-md" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default Forgotpassword
