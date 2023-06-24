import '@/styles/globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { ToastContainer, toast, useToast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'



export default function App({ Component, pageProps }) {

  const [cart, setCart] = useState({})
  const [subt, setSubt] = useState(0)
  const [sign, setSign] = useState(false);
  const [key, setKey] = useState(null);
  const [toastMsg, setToastMsg] = useState(null)
  const [progress, setProgress] = useState(0)
  const [admin, setAdmin] = useState(false)
  let router = useRouter();

  let showMsg = (msg) => {
    setToastMsg(msg)
    setTimeout(() => {
      setToastMsg(null)
    }, 1000);
    toast.success(msg)
  }





  useEffect(() => {

    router.events.on('routeChangeStart', () => {
      setProgress(40)
    });
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    });
    try {
      if (localStorage.getItem('cartItems')) {
        const storedData = JSON.parse(localStorage.getItem('cartItems'));
        setCart(storedData.cart);
        setSubt(storedData.subt);
      } else {
        setCart({});
        setSubt(0);
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }

    if (Cookies.get('token')) {
      setSign(true)
      setKey(Math.random())
    }
      let data = Cookies.get('userData')
  if(data){
      let role = JSON.parse(data)
      if (role.role == 'admin'|| role.role == 'seller') {
          setAdmin(true)
      }else{
          setAdmin(false)
      }
  }
  }, [router.query]);

  let logout = async () => {
    let userToken = Cookies.get('token');
    if (userToken) {
      try {
        let resp = await fetch('http://127.0.0.1:8000/api/logout', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
          },
          body: JSON.stringify({ "token": userToken })
        });
        const data = await resp.json();
        if ('success' in data) {
          showMsg(data.success);
          router.push('/');
          setSign(null);
        } else {
          toast.error(data.error);
        }
        Cookies.remove('token');
        Cookies.remove('userData');
        setKey(Math.random());
      } catch (error) {
        console.log(error);
        // Handle the error appropriately, e.g., display an error message
      }
    }
  };

  let addToCart = (pid, name, qty, price, img) => {

    const updatedCart = { ...cart } // create a new object instance
    if (pid in updatedCart) {
      updatedCart[pid].qty += qty;
    } else {
      updatedCart[pid] = { qty: 1, name, price, img };
    }
    setCart(updatedCart)
    saveCart(updatedCart)

  };



  let removeItem = (pid, name, qty, price) => {
    let data = { ...cart };
    if (pid in cart) {
      data[pid].qty = data[pid].qty - qty
      if (data[pid].qty <= 0) {
        delete data[pid]
      }
    }
    setCart(data);
    saveCart(data); // Parse data before saving to local storage

  };

  const clearCart = () => {
    setCart({});
    saveCart({})
  };

  const saveCart = (data) => {
    let keys = Object.keys(data);
    let total = 0;

    for (let i = 0; i < keys.length; i++) {
      total += data[keys[i]].qty * data[keys[i]].price;
    }

    setSubt(total);

    const cartData = {
      cart: data,
      subt: total
    };

    localStorage.setItem("cartItems", JSON.stringify(cartData));
  };

  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waiting
      />
      <Navbar cart={cart} admin ={admin} addToCart={addToCart} clearCart={clearCart} removeItem={removeItem} subt={subt} sign={sign} logout={logout} />
      <ToastContainer
        position="top-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Component {...pageProps} cart={cart} addToCart={addToCart}  clearCart={clearCart} removeItem={removeItem} subt={subt} showMsg={showMsg} />
      <Footer />
    </>
  );
}