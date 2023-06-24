import Cookies from 'js-cookie';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import * as bsIcons from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const slug = ({ data, addToCart ,buyNow,showMsg}) => {
    const [location, setLocation] = useState('');
    const [msg, setMsg] = useState(null);


    function changHandler(e) {
        setLocation(e.target.value)
    }

    function addcart() {
        if (Cookies.get('token')&& (!addToCart(data[0].pid, data[0].name, 1, Number(data[0].price), data[0].img))) {
            showMsg('Product Added To Cart')
        }else{
            toast.error("Can't Add Product To Cart!", {
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
    
    const checkLocation = async () => {
        let url = await fetch('http://127.0.0.1:8000/api/location');
        let data = await url.json();
        if (data.includes(location)) {
            setMsg(1)
            showMsg("Yes Your City Is Accessible");
        } else {
            setMsg(0)
            toast.error('Sorry, city not serviceable!', {
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
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-4 py-24 mx-auto">
                    {data && <div className="lg:w-[90] mx-auto flex flex-wrap">
                        <div className='w-[50%]'>
                            <Image src={data[0].img} height={200} width={500} priority alt={'product image'} className='w-full h-full object-cover object-center-bottom' />
                        </div>
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest"></h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{data[0].name}</h1>
                            <div className="flex mb-3">
                                <span className="flex items-center">
                                    <p><span className='font-medium'>Category:</span> {data[0].cat_name}</p>
                                </span>
                            </div>
                            <p className="leading-relaxed">{data[0].desc}</p>
                            <h2 className='font-bold text-2xl'>System Requirements</h2>
                            <pre className="leading-relaxed">{data[0].sysreq}</pre>
                            <hr className='my-10' />
                           {Cookies.get('token') && <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 my-2 focus:outline-none hover:bg-red-600 rounded" onClick={addcart}>Add To Cart <bsIcons.BsCartPlus className='text-xl font-bold cursor-pointer' /></button>} 
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">Rs{data[0].price}</span>
                                {/* <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={()=>{buyNow((data[0].pid, data[0].name, 1, data[0].price, data[0].img))}}>Buy</button> */}

                            </div>
                            <hr className='my-5' />
                            <div>
                                <input type="text" className='border-[1px] py-1 px-2 rounded-md mx-2 border-gray-400' name='location' placeholder='Enter Location To Check' value={location} onChange={changHandler} />
                                <button className=" text-white bg-red-500 border-0 py-1 mx-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={checkLocation}>Check</button>
                                {msg && msg != null && <p className="text-green-600 my-2">Yes Your Location is accesible</p>}
                                {!msg && msg != null && <p className="text-red-700 my-2">We Dont Deliver at this location</p>}
                            </div>
                        </div>
                    </div>}
                </div>
            </section>
        </div>
    )
}
export async function getServerSideProps(context) {
    const { slug } = context.query;
    const url = await fetch(`http://127.0.0.1:8000/api/productList/${slug}`)
    const data = await url.json()
    return {
        props: {
            data,
        }
    }
}
export default slug
