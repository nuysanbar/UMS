import { redirect } from "react-router-dom";
import axios from 'axios'

export async function loader(){
  // Retrieve the access token from local storage
    const access_token=window.localStorage.getItem('access_token');
    // Clear the access token from local storage
     window.localStorage.setItem('access_token',"")

     // Define the API endpoint URL for logging out
     const apiUrl='http://localhost:3500/logout/'

     // Make a GET request to the logout API endpoint with authorization header
     const res = await axios.get(apiUrl,{
         headers: {
           'Authorization': 'Bearer ' + access_token
         }
       })
    return redirect('/')
}
