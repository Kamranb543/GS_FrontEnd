import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import * as bsIcons from 'react-icons/bs'
import * as mdIcons from 'react-icons/md'
import * as aiIcons from 'react-icons/ai'
import * as biIcons from 'react-icons/bi'
import { ToastContainer, toast, useToast } from 'react-toastify';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

function Checkout({ cart, addToCart, clearCart, removeItem, subt }) {
    let router = useRouter();
    const [formInput, setFormInput] = useState({ userName: '', phone: '', payment: '', address: '', products: '',userId:'' })

    useEffect(() => {
        if ((Object.keys(cart).length <= 0)&& Cookies.get('token')) {
            router.push('/');
        } else {
            const keys = Object.entries(cart).map(([key, value]) => ({
                [key]: { qty: value.qty }
            }));
            let productData = JSON.stringify(keys)
            setFormInput(prevFormInput => ({
                ...prevFormInput,
                products: productData
            }));

            let userData = JSON.parse(Cookies.get('userData')).id
            setFormInput(prevFormInput => ({
                ...prevFormInput,
                userId: userData
            }));
           
        }
    }, []);

    let changeHandler = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setFormInput({...formInput,[name]:value})
    }

    let placeOrder = async() => {
        if (Object.values(formInput).every(value=>value!=='')) {
           let url =await fetch('http://127.0.0.1:8000/api/placeOrders',{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('token')}`
            },
            body:JSON.stringify(formInput)
           })
           let resp =await url.json();
           if ('error' in resp ) {
            if (Object.keys(resp.error).length>1) {
                toast.error('All Fields Must Be Filled')
            }else{
                toast.error(Object.entries(resp.error)[0][1][0])
            }
           }else{
            toast.success('Order Placed Successfully')
            clearCart();
            router.push('/Order');
           }
        }else{
            toast.error('All Fields Must Be Filled')
        }
    }


    return (
        <div className='bg-gray-100'>
               
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32  py-10">
                <div className="px-6 pt-10 shadow-lg rounded-l-lg">
                    <p className="text-xl font-medium">Order Summary</p>
                    <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 max-h-[58vh] overflow-y-scroll ">

                        {
                            Object.keys(cart).map((item) => {
                                return (
                                    <div className='flex  rounded-lg bg-white sm:flex-row ' key={item}>
                                        <Image className="m-2 h-24 w-28 rounded-md border object-cover object-center-top" width={130} height={24} src={cart[item].img} alt='home image' />
                                        <div className="flex w-full flex-col px-4 py-4">
                                            <span className="font-semibold">{cart[item].name + item}</span>
                                            <span className="float-right text-gray-400">Total : {cart[item].price * cart[item].qty}</span>
                                            <p className="text-lg font-bold">Rs :  {cart[item].price}</p>
                                        </div>
                                        <div className="flex">
                                            <div className='w-[100%] flex items-center justify-center'>
                                                <aiIcons.AiOutlinePlus className='cursor-pointer opacity-70 text-lg hover:text-red-700' onClick={() => addToCart(item, cart[item].name, 1)} />
                                                <p className='mx-1'>{cart[item].qty}</p>
                                                <aiIcons.AiOutlineMinus className='cursor-pointer opacity-70 text-lg hover:text-red-700' onClick={() => removeItem(item, cart[item].name, 1)} />
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                    <p className="mt-8 text-lg font-medium">Shipping Methods</p>
                </div>
                <div className="mt-10 bg-gray-50 shadow-lg rounded-r-lg px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Payment Details</p>
                    <p className="text-gray-400">Complete your order by providing your payment details.</p>
                    <div className="">
                        <div className='my-5'>
                            <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Name</label>
                            <input type="text" placeholder="Your Name Here" name='userName' onChange={changeHandler} value={formInput.userName} className="mt-1 transition-all block w-full rounded-lg shadow-lg  px-4 py-3  text-sm bg-gray-100 outline-none hover:bg-red-100 focus:z-10 focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div className='my-5'>
                            <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Contact</label>
                            <input type="number" placeholder="Your Contact Number Here" name='phone' onChange={changeHandler} value={formInput.phone} className="mt-1 transition-all block w-full rounded-lg shadow-lg  px-4 py-3  text-sm bg-gray-100 outline-none hover:bg-red-100 focus:z-10 focus:border-red-500 focus:ring-red-500" />
                        </div>

                        <div className='my-5'>
                            <div className='my-5'>
                                <label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">Payment Method</label>
                                <select name="payment" onChange={changeHandler} value={formInput.payment} className="mt-1 text-gray-400 transition-all block w-full rounded-lg shadow-lg px-4 py-3 text-sm bg-gray-100 outline-none hover:bg-red-100 focus:z-10 focus:border-red-500 focus:ring-red-500">
                                    <option value="" disabled defaultValue className="text-black">Select Payment Method</option>
                                    <option value="online" className="text-black">Online</option>
                                    <option value="offline" className="text-black">Cash On Delivery</option>
                                </select>
                            </div>
                        </div>
                        <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
                        <div className=' my-5 col-start-1 col-end-7'>
                            <textarea type="text" placeholder="Your Address" name='address' onChange={changeHandler} value={formInput.address} className="mt-1 block w-full rounded-lg shadow-lg  px-4 py-3  text-sm bg-gray-100 outline-none hover:bg-red-100 focus:z-10  focus:border-red-500 focus:ring-red-500 transition-all"></textarea>
                        </div>

                        <div className="mt-6 border-t border-b py-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-red-800">Subtotal</p>
                                <p className="font-semibold text-red-800">Rs {subt}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-red-800">Shipping</p>
                                <p className="font-semibold text-red-800">Rs 800</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-red-800">Total</p>
                            <p className="text-2xl font-semibold text-red-800">Rs {subt + 800}</p>
                        </div>
                    </div>
                    {/* <Link href={'/Order'}> */}
                    <button className="mt-4 mb-8 w-full rounded-md bg-red-800 px-6 py-3 font-medium text-white" onClick={placeOrder}>Place Order</button>
                    {/* </Link> */}
                </div>
            </div>

        </div>
    )
}

export default Checkout
