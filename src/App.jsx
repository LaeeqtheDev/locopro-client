import React, { useState } from "react";
import "./App.css";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'; // Added import for QueryClient and QueryClientProvider

import Website from "./pages/Website";
import Layout from "./components/Layout/Layout";
import Properties from "./pages/Properties/Properties";
import { ToastContainer } from "react-toastify";
import {ReactQueryDevtools} from 'react-query/devtools'
import "react-toastify/dist/ReactToastify.css"
import Property from "./pages/Property/Property";
import UserDetailContext from "./context/UserDetailContext";
import Bookings from "./pages/Bookings/Bookings";
import Favourites from "./pages/Favourites/Favourites";
import { MantineProvider } from "@mantine/core";

function App() {
  const queryClient = new QueryClient(); // Initialize QueryClient using the new keyword
  const [userDetails, setUserDetails]=useState({
    favourite: [],
    bookingws:[],
    token: null
  })
  
  return (
    <UserDetailContext.Provider value={{userDetails, setUserDetails}}>
      <MantineProvider>
       <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Website />} />
              <Route path="/properties" >
              <Route index element={<Properties/>}/>
                <Route path=":propertyId" element={<Property/>}/>
              </Route>
              <Route path="/bookings" element={<Bookings/>}/>
              <Route path="/favourites" element={<Favourites/>}/>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer/>
     
     
    </QueryClientProvider>
    </MantineProvider>

 
    </UserDetailContext.Provider>
  );
}

export default App;
