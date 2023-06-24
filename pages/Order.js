import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
const Order = ({ data }) => {
    const router = useRouter();
    const [orderData, setOrderData] = useState([]);
    const [emptyOrder, setEmptyOrder] = useState(null);


    useEffect(() => {
        let id = JSON.parse(Cookies.get('userData')).id;

        if (Cookies.get('token') && Cookies.get('userData')) {
            fetch(`http://127.0.0.1:8000/api/ordersList/${id}`,
            {headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
              }}
            ).then((data) => {
                data.json().then((resp) => {
                    if ('orders' in resp) {
                        setOrderData(resp.orders)
                        console.log(resp.orders)
                    } else if ('empty' in resp) {
                        setOrderData(null)
                        setEmptyOrder(resp.empty)
                    } else {
                        console.log(resp.error)
                    }
                })
            })
        } else {
            router.push('/')
        }
    }, [])

    return (
        <div className='bg-gray-100'>
            <div className="py-10 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                <div className="flex justify-start mb-6 item-start space-y-2 flex-col text-center">
                    <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Your Orders</h1>
                </div>
                {
                    orderData && orderData.map((key) => {
                        return (
                            <div className="mt-1 flex flex-col  xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0" key={key.order_id}>
                                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                                    <div className="flex max-h-[75vh] shadow-lg overflow-auto flex-col justify-start items-start  bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:px-8 w-full">
                                        <div className=" flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                            <div className="pb-4 flex items-center-center md:pb-0 w-full md:w-40 align-middle">
                                                <Image className="w-full  object-contain  md:block" width={150} height={24} src={key.img} alt='home image' />
                                            </div>
                                            <div className="border-b border-gray-200 md:flex-row flex-col h-full flex justify-between items-start w-full  space-y-4 md:space-y-0">
                                                <div className="w-full flex flex-col justify-start items-start space-y-2">
                                                    <h3 className="text-xl  xl:text-2xl font-semibold  text-gray-800">{key.name}</h3>
                                                    <div className="flex justify-start items-start flex-col ">
                                                        <p className="text-sm  leading-none py-1 text-gray-800"><span className=" text-black font-medium">Payment: </span>{key.payment}</p>
                                                        <p className="text-sm  leading-none py-1 text-gray-800"><span className=" text-black font-medium">Delivery Address: </span>{key.address.length > 40 ? key.address.slice(0, 40) + '....' : key.address}</p>
                                                        <p className="text-sm  leading-none py-1 text-gray-800"><span className=" text-black font-medium">Order Placed: </span>{key.productPlaced}</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between space-x-8 items-start w-full">
                                                    <p className="text-base  xl:text-lg leading-6">Quantity : <span className="">{key.qty}</span></p>
                                                    <p className="text-base  xl:text-lg leading-6">Price : <span className="">{key.price}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )

                    })
                }{
                    emptyOrder && <div className="mt-1 flex p-7 h-[50vh] jusitfy-center items-center w-full bg-white">
                        <h1 className="text-8xl mx-auto font-semibold  text-gray-400">No Orders Found</h1>
                    </div>
                }
            </div>
        </div>
    )
}
export default Order
