import { Outlet,NavLink,Link} from "react-router-dom";
import { useState } from "react";
import TemporaryDrawer from "./drawer";
import {AiOutlineSetting} from "react-icons/ai"
import {BiLogOut} from "react-icons/bi"
import {BsCaretDown} from "react-icons/bs"
import jwt from 'jwt-decode'
import axios from 'axios'
import * as React from 'react';
import Footer from "./footer";
const access_token=window.localStorage.getItem('access_token');
export async function loader(){
    const apiUrl=`http://localhost:3500/home/profile`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    if(res.statusText=="OK"){
      const user=jwt(access_token)
      const userRole=user.userInfo.roles
      return {userRole}
    }
    return 0;
}
export default function Home() {
   const user=jwt(access_token);
   const userRole=user.userInfo.roles
   const [classValue,setClassValue]=useState(null)
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const id = open ? 'simple-popover' : undefined;
   const basicData=JSON.parse(window.localStorage.getItem('basic_data'));
   function changeClassName(){
    if(classValue=="options"){
      return setClassValue(null)
    }else{
      return setClassValue("options")
    }
   }
    return (
      <>
      <div className="rootContainer">
        <div className="root" >
            <div className="menu">
              <div onClick={changeClassName} className="toggle">
                  <img src={`http://localhost:3500/${basicData.image}`} alt="profileImg" /> <br />
                  <span>me<BsCaretDown className="drop"/></span>
              </div>
              <div className={`hiddenOptions ${classValue}`} onClick={changeClassName}>
                  <NavLink to={"/home/profile"}>
                     <AiOutlineSetting/>account
                  </NavLink>
                  <NavLink to={"/home/logout"}>
                      <BiLogOut/> Logout
                  </NavLink>
              </div>
            </div>
        </div>
        <div className="drawer" >
          <TemporaryDrawer basicData={basicData} userRole={userRole} />
        </div>
        <div id="detail"><Outlet /></div>
        </div>
        <div style={{marginTop:"50px"}}><Footer /></div>
      </>
    );
  }