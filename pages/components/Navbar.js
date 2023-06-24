import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import * as Icons from 'react-icons/fa'
import * as aiIcons from 'react-icons/ai'
import * as mdIcons from 'react-icons/md'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const Navbar = ({ cart,admin, addToCart, clearCart, removeItem, subt, sign, logout }) => {
    let ref = useRef();
    let router = useRouter();
    const [accountDropdown, setAccountDropdown] = useState(false);
   
    useEffect(() => {
        router.events.on('routeChangeStart', () => {
            let clas = ref.current?.classList;
            if (clas) {
                clas.remove('translate-x-0');
                clas.add('translate-x-full');
            }
        });

    }, []);

    function showCart() {
        let clas = ref.current?.classList;
        if (clas) {
            if (clas.contains('translate-x-full')) {
                clas.remove('translate-x-full');
                clas.add('translate-x-0');
            } else if (!clas.contains('translate-x-full')) {
                clas.remove('translate-x-0');
                clas.add('translate-x-full');
            }
        }
    }

    return (
        <div className=" w-[100%] z-20 sticky flex flex-wrap p-5 flex-col bg-white top-0 md:flex-row items-center shadow-xl">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <Image src={'/logo.png'} width={50} priority height={50} alt='Logo Image' />
                <span className="ml-3 text-xl font-mono"><i className='font-black'>Games<span className='text-red-700 font-black'>Store</span></i></span>
            </a>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center gap-x-6 font-semibold">
                <Link href={'/'} className='hover:text-red-700'>Home</Link>
                <Link href={'/Products'} className='hover:text-red-700'>Products</Link>
                <Link href={'/Contact'} className='hover:text-red-700'>Contact Us</Link>
            </nav>
            {!sign &&
                <>
                    <Link href={'/Signup'}>
                        <button className='bg-red-700 text-white px-3 mx-1 py-2 rounded-md '>Register</button>
                    </Link>
                    <Link href={'/Signin'}>
                        <button className='bg-red-700 text-white px-3 mx-1 py-2 rounded-md '>SignIn</button>
                    </Link>
                </>
            }

            {sign && <>
                <div className='flex flex-col relative' onClick={() => { setAccountDropdown(true) }} onMouseLeave={(() => { setAccountDropdown(false) })}>
                    <mdIcons.MdAccountCircle className='text-xl hover:text-red-700 mx-5 cursor-pointer' />
                    {accountDropdown && <div className='absolute bg-[#efeeee] shadow-lg p-4 top-5 right-5 w-40'>
                        <ul className='text-black font-medium'>
                           {admin&&<Link href={'/admin'}> <li className=' hover:text-red-700 cursor-pointer my-2'>Admin Panel</li></Link>}
                            <Link href={'/Order'}> <li className=' hover:text-red-700 cursor-pointer my-2'>Orders</li></Link>
                            <li className=' hover:text-red-700 cursor-pointer my-2' onClick={logout}>Logout</li>
                        </ul>
                    </div>}
                </div>
                <Icons.FaShoppingCart className='text-xl hover:text-red-700 cursor-pointer' onClick={showCart} />
                <div className=' px-4 py-5 min-w-[20%] bg-[#efeeee] absolute z-20 right-0 top-6 transition-all translate-x-full' ref={ref}>
                    <button onClick={showCart} className='absolute top-0 right-6 text-2xl font-bold'>x</button>
                    <div className='py-3 border-b-2 border-black'>
                        <p className='text-lg text-center font-semibold '>Your Cart</p>
                    </div>
                    <div>
                        {
                            Object.keys(cart).length <= 0 &&
                            <div className='my-2 text-center '>No Items In Cart</div>
                        }
                        {
                            Object.keys(cart).map((item) => {
                                return (
                                    <div className='  my-4 p-2 bg-white rounded-lg shadow-md ' key={item}>

                                        <div className="flex">
                                            <div className='w-[80%] flex border-r-2 px-2 items-center'>
                                                <p className='font-bold'>{cart[item].name}</p>
                                            </div>
                                            <div className='w-[20%] flex items-center justify-center'>
                                                <aiIcons.AiOutlinePlus className='cursor-pointer opacity-70 text-lg hover:text-red-700' onClick={() => addToCart(item, cart[item].name, 1)} />
                                                <p className='mx-1'>{cart[item].qty}</p>
                                                <aiIcons.AiOutlineMinus className='cursor-pointer opacity-70 text-lg hover:text-red-700' onClick={() => removeItem(item, cart[item].name, 1)} />
                                            </div>
                                            <div>
                                                <Image className="mx-2 h-12 w-12 rounded-md border object-cover object-center-top" width={70} height={24} src={cart[item].img} alt='home image' />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className='text-center'>
                            <p className='mx-1'><span className='font-medium'>Total Amount : Rs.</span>{subt}</p>
                        </div>
                        <div className="flex justify-around">
                            <Link href={'/Checkout'}><button className="flex  text-white bg-red-500 border-0 py-2 my-2 px-6 focus:outline-none hover:bg-red-600 rounded">Checkout</button></Link>
                            <button className="flex  text-white bg-red-500 border-0 py-2 my-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={() => clearCart()}>Clear Cart</button>
                        </div>
                    </div>
                </div>
            </>
            }
        </div>
    )
}

export default Navbar
