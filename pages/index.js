
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
export default function Home({ data }) {

  useEffect(() => {
    console.log(data)
  })
  return (
    <>
      <main className="h-[90vh] relative overflow-hidden flex  justify-between">
        <div className='absolute h-[100%] w-[50%] z-10 flex items-start justify-center flex-col px-14'>
          <h1 className='text-6xl font-bold py-7 text-[#444444]'>What is <i><span className='text-black'>Game<span className='text-white'>Store</span></span></i></h1>
          <p className='text-lg '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus non fugit adipisci voluptatibus earum eius corrupti, exercitationem dolor beatae, unde sit, quisquam culpa odio ratione suscipit soluta illum voluptatum atque id blanditiis deserunt velit ex magnam? Consequatur dolorem tempora voluptatum voluptatem, earum mollitia deleniti minima.</p>
        </div>
        <Image src={'/homePic1.jpg'} height={100} width={2000} priority={true} alt='home image' className='-z-1 h-100 w-full object-cover' />
        <button></button>
      </main>
      <section className="text-gray-600 body-font">
        <h1 className='text-6xl font-bold py-7 text-black mt-6 text-center'>Latest<span className='text-red-700'>Games</span></h1>
        <hr className='w-[80%] mx-auto border-[1px]' />
        <div className="flex flex-wrap -m-4 justify-center mx-auto my-10 shadow-lg p-6 bg-gray-50 gap-4 ">
          {
            data.products && data.products.map((key) => {
              return (
                <div className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-md hover:translate-x-3 hover:-translate-y-3 transition-all bg-white" key={key.pid}>
                  <Link href={`/productItem/${key.pid}`} passHref>
                    <div className="block relative h-48 rounded overflow-hidden">
                      <Image src={key.img} height={100} width={300} alt='product image' className='h-full w-full object-cover' />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{key.cat_name}</h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">{key.name}</h2>
                      <p className="mt-1">Rs.{key.price}</p>
                    </div>
                  </Link>
                </div>
              )
            })
          }
          {
            data.empty && <div className="mt-1 flex p-7 h-[50vh] jusitfy-center items-center w-full bg-white">
              <h1 className="text-6xl mx-auto font-semibold  text-gray-400">No Products Found</h1>
            </div>
          }

        </div>
      </section>
      <section className="text-gray-600 body-font" id='about'>
        <h1 className='text-6xl font-bold py-7 text-black mt-6 text-center'>About<span className='text-red-700'>Us</span></h1>
        <hr className='w-[80%] mx-auto border-[1px]' />
        <div className="flex justify-around  items-center gap-2 mx-auto my-10 shadow-lg p-6 bg-gray-50 ">
          <div className='w-[35%]'>
            <Image src={'/about1.jpg'} height={100} width={500} priority={true} alt='about image' className='-z-1 h-[100%] w-full ' />
          </div>
          <div className='w-[50%]'>
            <p className='text-justify text-lg'>
              Welcome to our
              <span className='text-xl font-bold py-7 text-black mt-6 text-center'> Games<span className='text-red-700'>Store</span></span>!<br />
              We are a team of gamers who are passionate about bringing the best games to our customers. We believe that everyone should have access to great games, regardless of their budget or gaming platform. That's why we offer a wide variety of games at competitive prices.

              We also offer a variety of features that make it easy for you to find the games you're looking for. Our website is easy to navigate, and we have a powerful search engine that can help you find games by genre, platform, or release date. We also have a team of experts who are available to help you find the perfect game for your needs.

              We are committed to providing our customers with the best possible experience. That's why we offer a variety of customer support options, including live chat, email, and phone support. We also offer a satisfaction guarantee on all of our games.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
export async function getServerSideProps(context) {
  let url = await fetch('http://127.0.0.1:8000/api/products/7')
  let data = await url.json()
  return {
    props: {
      data
    }
  }
}