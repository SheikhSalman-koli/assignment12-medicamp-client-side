import { createBrowserRouter } from "react-router";
import RootLayout from "../LayOut/RootLayout";
import Home from "../Pages/Home/Home";
import Signin from "../Pages/Authentication/Signin";
import Signup from "../Pages/Authentication/Signup";
import DashBoardLayout from "../LayOut/DashBoardLayout";
import DashHome from "../Pages/DashBoard/DashHome";
import OrganizerProfile from "../Pages/DashBoard/Organizer/OrganizerProfile";
import AddCamp from "../Pages/DashBoard/Organizer/AddCamp";
import ManageCamps from "../Pages/DashBoard/Organizer/ManageCamps";
import ManageRegCamps from "../Pages/DashBoard/Organizer/ManageRegCamps";
import Analytics from "../Pages/DashBoard/Participant/Analytics";
import UserProfile from "../Pages/DashBoard/Participant/UserProfile";
import RegisteredCamps from "../Pages/DashBoard/Participant/RegisteredCamps";
import PaymentHistory from "../Pages/DashBoard/Participant/PaymentHistory";
import PrivateRoute from "./PrivateRoute";
import OrganizerRoute from "./OrganizerRoute";
import AvailableCamps from "../Pages/Available/AvailableCamps";
import CampDetails from "../Pages/Home/CampDetails";
import Payment from "../Pages/DashBoard/Payment/Payment";
import AllFeedbacks from "../Pages/Home/AllFeedbacks";
import NotFoundPage from "../Components/NotFoundPage";
import upcomingDetails from "../Pages/Home/upcomingDetails";
import ReportPage from "../Pages/Home/reportissue/ReportPage";
import OrganizerStats from "../Pages/DashBoard/Organizer/OrganizerStats";


export const routes = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'available',
                Component: AvailableCamps
            },
            {
                path: 'camp-details/:campId',
                Component: CampDetails,
                // element: <PrivateRoute>
                //     <CampDetails></CampDetails>
                // </PrivateRoute>
            },
            {
                path: 'upcommingdetails/:id',
                Component: upcomingDetails
            },
            {
                path :'all-feedback',
                Component: AllFeedbacks
            },
            {
                path: 'report',
                Component: ReportPage
            }
        ]
    },
    
    {
        path: 'signin',
        Component: Signin
    },
    {
        path: 'signup',
        Component: Signup
    },

    {
        path: 'dashboard',
        Component: DashBoardLayout,
        children: [
            {
                index: true,
                // Component: DashHome
                element: <PrivateRoute>
                    <DashHome></DashHome>
                </PrivateRoute>
            },
            {
                path: 'organizer-profile',
                element: <OrganizerRoute>
                    <OrganizerProfile></OrganizerProfile>
                </OrganizerRoute>
            },
            {
                path: 'add-camp',
                element: <OrganizerRoute>
                    <AddCamp></AddCamp>
                </OrganizerRoute>
            },
            {
                path: 'manage-camps',
                element: <OrganizerRoute>
                    <ManageCamps></ManageCamps>
                </OrganizerRoute>,
                // loader:() => fetch(`${import.meta.env.VITE_BASE_URL}/countForManage`)
            },
            {
                path: 'manage-registered',
                element: <OrganizerRoute>
                    <ManageRegCamps></ManageRegCamps>
                </OrganizerRoute>,
                loader:() => fetch(`${import.meta.env.VITE_BASE_URL}/count`)
            },
            {
                path: 'stats',
                Component: OrganizerStats
            },

            {
                path: 'analytics',
                element: <Analytics></Analytics>
            },
            {
                path: 'participant-profile',
                element: <UserProfile></UserProfile>
            },
            {
                path: 'registered-camps',
                element: <RegisteredCamps></RegisteredCamps>
            },
            {
                path: 'payment/:regId',
                element: <Payment></Payment>
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>
            }
        ]
    },
    {
        path: '*',
        Component: NotFoundPage
    }

])