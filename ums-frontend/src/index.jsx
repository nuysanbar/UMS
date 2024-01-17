import React from "react";
import ReactDOM  from "react-dom/client";
import ErrorPage from "./error-page";
import './index.css'
import './index2.css'
import Root from "./routes/root.jsx"
import Home, {loader as homeLoader} from './routes/home.jsx'
// import SignInOld, {action as signInAction} from './routes/signIn.jsx'
import SignUp, {action as signUpAction} from './routes/signup.jsx'
import LandingPage, {loader as landingPageLoader} from './routes/landingPage.jsx'
import {loader as logoutLoader} from './routes/logout.jsx'
import Profile, {loader as profileLoader}from "./routes/profile";
import ProfileEdit, {action as profileEditAction} from "./routes/profileEdit";
import { License,RetailersProduct,UpdateStatus,addLicenseAction,profileEditAction2 } from "./routes/Admin/pages/RetailerDetailerComponent";
import RetailerDetail, {loader as RetailerDetailLoader,RetailerProductsLoader} from "./routes/Admin/pages/retailerDetail"
import Admin from "./routes/Admin/adminHome"
import SignIn, {action as signInAction} from "./routes/newSignIn"
import { createBrowserRouter,RouterProvider} from "react-router-dom";
import UserPage from './routes/Admin/pages/UserPage';
import { usersLoader} from "./routes/Admin/adminLA";
import AddMember, {action as addMemberAction} from "./routes/Admin/pages/addMember";
import EditMember,{loader as editMemberLoader,action as editMemberAction} from "./routes/Admin/pages/editMember";
import ForgotPassword, {action as forgotPasswordAction} from "./routes/forgotPassword";
import ResetPassword, {action as resetPasswordAction} from "./routes/resetPassword";
import CustomerDetail,{Activity, loader as activityLoader} from "./routes/Admin/pages/customerDetail";
const router=createBrowserRouter([
    {
        path:'/',
        element:<Root />,
        errorElement:<ErrorPage><p>page not available</p></ErrorPage>,
        children:[
            {
                index:true,
                errorElement:<ErrorPage> <SignIn/> </ErrorPage>,
                element: <SignIn/>,
                action:signInAction
            },
            {
                path: "/signUp/",
                element: <SignUp />,
                errorElement:<ErrorPage> <SignUp/> </ErrorPage>,
                action:signUpAction
            },
            {
                path: "/forgotPassword",
                element: <ForgotPassword />,
                errorElement:<ErrorPage> <ForgotPassword/> </ErrorPage>,
                action:forgotPasswordAction
            },
            {
                path: "/resetPassword",
                element: <ResetPassword />,
                errorElement:<ErrorPage> <ResetPassword/> </ErrorPage>,
                action:resetPasswordAction
            },
        ]
    },
    {
        path:"/admin",
        element:<Admin />,
        errorElement:<ErrorPage><p>page not available</p></ErrorPage>,
        children:[
            {
                index:true,
                element: <p>front page of admin dashboard</p>
            },
            {
                path:"/admin/customers",
                element:<UserPage />,
                loader:usersLoader
            },
            {
                path:"/admin/customers/:id",
                element:<CustomerDetail />,
                loader:RetailerDetailLoader,
                children:[
                    {
                        index:true,
                        element:<UpdateStatus />,
                        loader:RetailerDetailLoader
                    },
                    {
                        path:"/admin/customers/:id/edit",
                        element:<ProfileEdit/>,
                        action:profileEditAction2
                    },
                    {
                        path:"/admin/customers/:id/activity",
                        element:<Activity/>,
                        loader:activityLoader
                    }
                ]
            },
            {
                path:'/admin/users/addMember',
                element: <AddMember />,
                action:addMemberAction
            },
            {
                path:'/admin/users/edit/:id',
                element:<EditMember />,
                loader:editMemberLoader,
                action:editMemberAction
            },
            {
                path:"/admin/profile",
                element:<Profile role={3030} />,
                loader:profileLoader,
                children:[
                    {
                        path:"/admin/profile/edit",
                        element:<ProfileEdit/>,
                        loader:profileLoader,
                        action:profileEditAction
                    }
                ]
            },
            {
                path:"/admin/logout",
                loader:logoutLoader
            }
        ]
    },
    {
        path:"/home",
        element: <Home />,
        loader: homeLoader,
        errorElement:<ErrorPage><p>page is not available</p></ErrorPage>,
        children:[
            {
                index:true,
                element: <p>home page</p>,
                errorElement:<ErrorPage><p>page is not available</p></ErrorPage>,
            },
            {
                path:"/home/:username",
                errorElement:<ErrorPage><p>page is not available</p></ErrorPage>,
                element:<LandingPage customPath={""}/>,
                loader:landingPageLoader,
                children:[
                    {
                        index:true,
                        element:<h5>front page</h5>,
                    }
                ]
            },
            {
                path:"/home/profile",
                element:<Profile user={2001}/>,
                loader:profileLoader,
                children:[
                    {
                        path:"/home/profile/edit",
                        element:<ProfileEdit/>,
                        loader:profileLoader,
                        action:profileEditAction
                    }
                ]
            },
            {
              path:"/home/logout",
              loader:logoutLoader
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
  );
  