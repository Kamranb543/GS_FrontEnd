import React, { useRef, useState } from 'react'
import { Grid } from "@mui/material";
import * as aiIcons from 'react-icons/ai'
import 'react-image-crop/dist/ReactCrop.css';
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";

const AddProduct = ({ data }) => {
    const [formInput, setFormInput] = useState({ pname: '', desc: '', price: '', category: [], img: '', sysreq: ''});
    const [msg, setMsg] = useState({ mesg: '', clr: 'green' });
    const [disabled, setDisabled] = useState(false)
    const myRef = useRef(null);


    function getChecked(e) {
        const checkedValue = e.target.value;
        const isChecked = e.target.checked;
        if (isChecked) {
            setFormInput({ ...formInput, category: formInput.category.concat(checkedValue) })
            // setFormInput({ ...formInput, category: formInput.select.concat(checkedValue) })
        } else {
            setFormInput({ ...formInput, category: formInput.category.filter((value) => value !== checkedValue) })
            // setFormInput({ ...formInput, category: formInput.select.filter((value) => value !== checkedValue) })
        }
    }

    function handleToggle() {
        const aero = document.querySelector("#aero");
        if (myRef.current.classList.contains('hidden')) {
            myRef.current.classList.remove('hidden')
        } else {
            myRef.current.classList.add('hidden')
        }
        if (aero.classList.contains('rotate-180')) {
            aero.classList.remove('rotate-180')
        } else {
            aero.classList.add('rotate-180')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!(formInput.desc.length <= 0 && formInput.price.length <= 0 && formInput.category.length <= 0 && formInput.img.length <= 0 && formInput.sysreq.length <= 0)) {
            let formdata = new FormData();
            formdata.append('name', formInput.pname);
            formdata.append('desc', formInput.desc);
            formdata.append('sysreq', formInput.sysreq);
            formdata.append('price', formInput.price);
            formdata.append('category', formInput.category);
            formdata.append('img', formInput.img);
            setDisabled(true)
            fetch('http://127.0.0.1:8000/api/uploadProduct', {
                method: 'post',
                body: formdata
            }).then((resp) => {
                resp.json().then((data) => {
                    setDisabled(false)
                    if ('error' in data) {
                        if (Object.keys(data.error).length > 1) {
                            setMsg({ ...msg, mesg: 'Fill all fields validly', clr: 'red' })
                        } else {
                            setMsg({ ...msg, mesg: data.error[Object.keys(data.error)[0]], clr: 'red' })
                        }
                        console.log(data.error)
                    } else {
                        setFormInput({
                            pname: '',
                            desc: '',
                            price: '',
                            category: [],
                            img: '',
                            sysreq: '',
                        });
                        setMsg({ ...msg, mesg: data.success, clr: 'green' })
                        setTimeout(() => {
                            setMsg({ ...msg, mesg: '' })
                        }, 1500)
                    }
                })
            })
        } else {
            setMsg({ ...msg, mesg: 'Fill all fields validly', clr: 'red' })
        }
    }
    return (
        <ThemeProvider theme={theme}>
        <FullLayout>
            
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
   
        <div>
            <div className="relative max-h-[100vh]  h-[100vh] flex flex-col sm:justify-center items-center  bg-gray-100 ">
                <div className="relative sm:max-w-sm w-full">
                    <div className="card bg-[#363636] shadow-lg w-[130%] h-full rounded-3xl absolute  transform -rotate-6"></div>
                    <div className="card bg-red-800 shadow-lg w-[130%] h-full rounded-3xl absolute  transform rotate-6"></div>
                    <div className="relative w-[130%] rounded-3xl  px-6 py-4 bg-gray-100 shadow-md box-border">
                        <label htmlFor="" className="block mt-3 text-lg text-gray-700 text-center font-semibold">
                            Add Product
                        </label>
                        <form method="#" action="#" className="mt-0" encType='multipart/form-data' onSubmit={handleSubmit}>

                            <div className='grid grid-cols-12 gap-x-2'>
                                <div className='my-5 col-start-1 col-end-7'>
                                    <input type="text" placeholder="Product Name" value={formInput.pname} onChange={(e) => setFormInput({ ...formInput, pname: e.target.value })} className="mt-1 block w-full rounded-lg shadow-lg  px-4 py-3  text-sm bg-gray-100 outline-none hover:bg-red-100 focus:z-10 focus:border-red-500 focus:ring-red-500 transition-all" />

                                </div>
                                <div className='my-5 col-start-7 col-end-13'>
                                    <input type="number" placeholder="Price" value={formInput.price} onChange={(e) => setFormInput({ ...formInput, price: e.target.value })} className="mt-1 block w-full rounded-lg shadow-lg  px-4 py-3  text-sm bg-gray-100 outline-none hover:bg-red-100 focus:z-10 focus:border-red-500 focus:ring-red-500 transition-all" />

                                </div>
                                <div className=' my-5 col-start-1 col-end-7'>
                                    <textarea type="text" placeholder="Product Description" value={formInput.desc} onChange={(e) => setFormInput({ ...formInput, desc: e.target.value })} className="mt-1 block w-full rounded-lg shadow-lg  px-4 py-3  text-sm bg-gray-100 outline-none hover:bg-red-100 focus:z-10  focus:border-red-500 focus:ring-red-500 transition-all"></textarea>
                                </div>
                                <div className='my-5 col-start-7 col-end-13'>

                                    <button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" onClick={handleToggle} className=" items-center transition-all justify-between px-4 py-3 w-52 flex text-gray-400 bg-gray-100 rounded-lg shadow-lg focus:ring-1 hover:bg-red-100 focus:ring-red-400 focus:outline-none" onChange={getChecked} type="button">Categories Selected {formInput.category.length}<aiIcons.AiFillCaretDown id='aero' className='cursor-pointer opacity-70 text-lg transition-all text-red-700' /></button>

                                    <div id="dropdownSearch" ref={myRef} className="z-20 transition-all hidden absolute bg-white rounded-lg mt-2 shadow max-w-60 ">
                                        <ul className=" px-3  max-w-xs w-52 min-w-max py-2 overflow-y-auto text-sm  " aria-labelledby="dropdownSearchButton">
                                            <li>
                                                {
                                                    data.map((key) => {
                                                        return(
                                                        <div className="flex items-center p-2 rounded hover:bg-red-100 transition-all " key={key.cat_id}>
                                                            <input onChange={getChecked} id="Action" type="checkbox" value={key.cat_id} className="w-4 h-4  transition-alltext-red-600 accent-red-500 bg-gray-100 border-gray-300 rounded    focus:ring-2" />
                                                            <label htmlFor="Action" className="w-full ml-2 text-sm font-medium text-gray-900 rounded ">{key.cat_name}</label>
                                                        </div>
                                                        )
                                                    })
                                                }
                                            </li>
                                        </ul>
                                    </div>


                                </div>
                                <div className=' my-5 col-start-1 col-end-13'>
                                    <textarea type="text" placeholder="System Requirements" value={formInput.sysreq} onChange={(e) => setFormInput({ ...formInput, sysreq: e.target.value })} className="mt-1 block w-full rounded-lg shadow-lg  px-4 py-3  text-sm bg-gray-100 outline-none hover:bg-red-100 focus:z-10  focus:border-red-500 focus:ring-red-500 transition-all"></textarea>
                                </div>
                                <div className=' my-5 col-start-1 col-end-13 text-center'>
                                    <input type="file" id='img' onChange={(e) => setFormInput({ ...formInput, img: e.target.files[0] })} className="mt-1 text-center block w-full rounded-lg shadow-lg  px-4 py-3 cursor-pointer text-sm bg-gray-100 outline-none hover:bg-red-100 focus:z-10  focus:border-red-500 focus:ring-red-500 transition-all"></input>
                                    <label htmlFor="img" className='opacity-40'>Img Must Be Less Than 2mb</label>
                                </div>
                                <div className='col-start-1 col-end-13 text-center'>
                                    {msg && <p className={`text-${msg.clr}-700`}>{msg.mesg}</p>}
                                </div>
                            </div>


                            <div className="mb-7">
                                <button disabled={disabled} className="bg-red-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </Grid>
        </Grid>
        </FullLayout>
        </ThemeProvider>
    
    )
}

export async function getServerSideProps(context) {
    let url = await fetch('http://127.0.0.1:8000/api/categories')
    let data = await url.json()
    return {
        props: {
            data
        }
    }
}

export default AddProduct
