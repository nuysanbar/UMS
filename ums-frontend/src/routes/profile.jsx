// Import necessary modules and components from React, React Router, and external libraries
import { useLoaderData,NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import {AiFillStar,AiOutlinePhone,AiOutlineMail} from "react-icons/ai"
import {GoLocation} from "react-icons/go"
import {BiEdit} from 'react-icons/bi'

export async function loader(){
     // Retrieve the access token from local storage
    const access_token=window.localStorage.getItem('access_token');

    // Define the API URL for fetching profile data
    const apiUrl=`http://localhost:3500/home/profile`

    // Make a GET request to the API with authorization header
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    const response=res.data
    console.log(response)
    return response;
}
export default function Profile({role}){
    // Fetch data using the useLoaderData hook
    const response=useLoaderData()
    var page;
    if(role==3030){
        page="/admin"
    }
    else if(role==3011){
        page="/delivery"
    }else{
        page="/home"
    }
    return (
        <>
           <div className="personalInfoContainer">
            <div className="personalInfo">
            <div className="sensitiveInfo">
            <NavLink to={`/home/${response.username}`} className="personalName">
                <img src={`http://localhost:3500/${response.imgUrl}`} alt="profileImg" />
                <span>{response.firstname} {response.lastname}</span>
            </NavLink>
             <div className="contact"> 
            <div>
               <span><AiOutlinePhone/></span> <span>{response.phoneNum}</span>
            </div>
            <div>
             <span><span><AiOutlineMail/> </span>{response.email}</span>
            </div>
            <div>
                <span><GoLocation/></span> <span>{response.subcity}</span>, <span>{response.city}</span>
            </div>
            </div>
            </div>
            <NavLink to={`${page}/profile/edit`} className="updateProfile"><BiEdit/>update profile</NavLink>
            </div>
            <Outlet />
            </div>
        </>
    )
}
