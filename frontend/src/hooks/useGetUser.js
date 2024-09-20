import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const useGetUser =()=>{
    const {user,setUser,setIsLoggedIn,showToast,setLoader}=useContext(AppContext)
    
    useEffect(()=>{

        async function getData() 
        {
            const token = localStorage.getItem("jwt");
            var email=''
            if (token) {
                const payload = JSON.parse(atob(token.split(".")[1]));
                const expiration = new Date(payload.exp * 1000);
                const now = new Date();

                if (now >= expiration) {
                    localStorage.removeItem("jwt");
                    setIsLoggedIn(false)
                    // window.location.href='/login'
                    showToast("Session expired, please log in again.");
                } else {
                    email=payload.email
                    setIsLoggedIn(true)
                    const timeout = expiration.getTime() - now.getTime();
                    setTimeout(() => {
                        localStorage.removeItem("jwt");
                        showToast("Session expired, please log in again.");
                        window.location.href='/'
                    }, timeout);
                }
            }
            else{
                setIsLoggedIn(false)
                // window.location.href='/login'
            }

        console.log(email)
        if (email){
            setLoader(true)
            // window.location.href='/'
            try{
                const response = await axios.post('http://localhost:8000/api/v1/getuserdata/',{'email':email})

                if (response.data.status===200){
                    setUser(response.data.user)
                    setIsLoggedIn(true)
                    setLoader(false)
                    console.log(user)
                }else{
                    setIsLoggedIn(false)
                    setLoader(false)
                }
            }
            catch(err){
                setIsLoggedIn(false)
                    setLoader(false)
            }
        }
        }

        getData()

    },[])
} 

export default useGetUser