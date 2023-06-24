import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Admin = () => {
    let router = useRouter()
    useEffect(()=>{
        if(Cookies.get('userData')){
            let user =JSON.parse(Cookies.get('userData'))
           if((user.role != 'admin'||user.role != 'seller')&&user.role=='client'){
            router.push('/')
           }
        }else{
            router.push('/')
        }
    })
   
  return (
    <div>
      Admin
    </div>
  )
}

export default Admin
