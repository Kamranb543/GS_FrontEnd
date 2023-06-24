import Image from 'next/image';
import React, { useState } from 'react'



const About = () => {

  const[file,setFile] = useState();
  const[url,setUrl] = useState('/homePic1.jpg');
  function changeHandler(e) { 
    let files = e.target.files[0];
    setFile(files)
  }
  function submitHandler(e) { 
    e.preventDefault();
    if (file) {
      let formData = new FormData();
      formData.append('image',file)
      fetch('http://127.0.0.1:8000/api/uploadProduct',{
        method:'Post',
        body: formData
      }).then(response => response.text())
      .then((data) => {setUrl(JSON.parse(data)) });
    } else {
      console.log('No file selected');
    }
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="file" name="image" id="" onChange={changeHandler} multiple/>
        <button type='submit' className='bg-slate-400 p-2 rounded-sm text-white' >Upload image</button>
      </form>
      <div className='h-[50vh] w-[100%]'>
        
        <Image height={200} width={200} alt='image' src={url.url}/>
      </div>
    </div>
  )
}

export default About
