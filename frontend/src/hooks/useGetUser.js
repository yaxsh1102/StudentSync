import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AppContext } from '../context/AppContext';

const useGetUser =()=>{
    const {user,setUser,isLoggedIn,setIsLoggedIn,showToast}=useContext(AppContext)
    
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
                        window.location.href='/login'
                    }, timeout);
                }
            }
            else{
                setIsLoggedIn(false)
                // window.location.href='/login'
            }

        console.log(email)
        if (email){
            setIsLoggedIn(true)
            // window.location.href='/'
            try{
                const response = await axios.post('http://localhost:8000/api/v1/getuserdata/',{'email':email})
                setUser(response.data.user)
                console.log(user)
            }
            catch(err){
                console.log(err)
            }
        }
        }

        getData()

    },[])
} 

export default useGetUser