import React from "react";
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from "react-router-dom"


import First from "./Pages/First";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import Myposts from "./Pages/Myposts";
import RecHome from "./Pages/RecHome";
import RecProfile from "./Pages/RecProfile"
import PostNewJob from "./Pages/PostNewJob";
import Myjobs from "./Pages/Myjobs";
import Addcertificate from "./Pages/Addcertificate";
import Applicants from "./Pages/Applicants";
import Get from "./Pages/Get";
import Certificates from "./Pages/Certificates";
import PostedJobs from "./Pages/Allrecjobs";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/">
          <Route index element={<First />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/myposts" element={<Myposts />} />
          <Route path="/rechome" element={<RecHome />} />
          <Route path="/recprofile" element={<RecProfile />} />
          <Route path="/myjobs" element={<Myjobs />} />
          <Route path="/newjob" element={<PostNewJob />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/addcer" element={<Addcertificate />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/recjobs" element={<PostedJobs />} />

          <Route path="/get" element={<Get />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
