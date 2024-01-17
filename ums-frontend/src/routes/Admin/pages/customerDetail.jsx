import { useLoaderData,NavLink,Outlet } from "react-router-dom";
import axios from "axios"
const access_token=window.localStorage.getItem('access_token')
export default function CustomerDetail(){
    const response=useLoaderData()
    return (
        <>
        <div className="favoriteContainer">
            <div className="favorites">
                    <NavLink to={`/admin/customers/${response.username}`} className={({ isActive, isPending }) =>
                            isActive
                            ? "singleFavorites active"
                            : isPending
                            ? "singleFavorites pending"
                            : "singleFavorites"
                        }>
                                <img style={{width:"30px",height:"30px",paddingTop:"15px",borderRadius:"30px"}} src={`https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg`} alt="license" />
                        <p >Profile</p>
                     </NavLink>
                     <NavLink to={`/admin/customers/${response.username}/activity`} className={({ isActive, isPending }) =>
                            isActive
                            ? "singleFavorites active"
                            : isPending
                            ? "singleFavorites pending"
                            : "singleFavorites"
                        }>
                                <img style={{width:"30px",height:"30px",paddingTop:"15px",borderRadius:"30px"}} src={`https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg`} alt="license" />
                        <p >Activity</p>
                     </NavLink>
            </div>
            <div className="favoritesDetail">
                <Outlet/>
            </div>
        </div>
</>)
}
export function Activity(){
    const {response}=useLoaderData()
    return (
        <>
            <h2>activities</h2>
            <ul>
            {
             response.map((item)=>{
                return(
                  <li key={item._id}>
                    <p>... {item.activity} on {item.time} ...</p>
                </li>
                )
              })
            }
          </ul>
        </>
    )
}

export async function loader({params}){
    const apiUrl=`http://localhost:3500/admin/consumers/${params.id}/activity`
    const resp1=await axios.get(apiUrl,{
        headers:{
            "Authorization":"Bearer "+access_token
        }
    })
    const response=resp1.data
    return {response}
}