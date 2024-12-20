import axios from "axios";
const access_token=window.localStorage.getItem('access_token');
export async function usersLoader(){
    // make fixed apiurl errors outside of this golder
    const apiUrl=`http://localhost:3500/admin/getCustomers`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    console.log(res.data)
    return res.data
}
