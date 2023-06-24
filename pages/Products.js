
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { parseCookies } from 'nookies'

const Products = ({ data }) => {
  {
    console.log(data.products)
  }
  return (
    <div className=' flex items-center flex-col'>
      <h1 className='text-6xl font-bold py-3 text-black mt-6 text-center'>Games<span className='text-red-700'>List</span></h1>
      <div className='w-[90%] my-2 bg-gray-100 p-20 flex items-center flex-col gap-y-11 overflow-scroll'>

        {data.products && data.products.map((key) => {
          return (
            <div className=" w-[90%] py-6 p-4 shadow-md hover:translate-x-1 hover:-translate-y-1 transition-all bg-white" key={key.pid}>
              <Link href={`/productItem/${key.pid}`} passHref>
                <div className="flex gap-10">
                  <div className="  w-[20%] rounded overflow-hidden">
                    <Image src={key.img} height={100} alt='product img' width={300} priority className='h-full w-full object-cover' />
                  </div>
                  <div className="w-[80%]">
                    <h3 className="text-black font-medium text-2xl tracking-widest title-font mb-1">{key.name}</h3>
                    <h2 className="text-gray-900 title-font text-sm py-2 font-medium">Category : {key.cat_name}<span className='text-gray-500'>{key.cat}</span></h2>
                    <h2 className="text-gray-900 title-font text-sm ">{key.desc}</h2>
                    <p className="mt-1">Rs. {key.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
        {
          data.empty && <div className="mt-1 flex p-7 h-[50vh] jusitfy-center items-center w-full bg-white">
            <h1 className="text-8xl mx-auto font-semibold  text-gray-400">No Products Found</h1>
          </div>
        }


      </div>
    </div>
  )
}
export async function getServerSideProps(context) {
  const cookie = parseCookies(context)

  const token = cookie.token
  const url = await fetch('http://127.0.0.1:8000/api/productList', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await url.json();
  return {
    props: {
      data,
    },
  };
}
export default Products
