/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import { BACKEND_URL } from "@/constants";

import LoginPage from "./login/page";
import DashboardPage from "./client/page";

function App() {
  const [user, setUser] = useState<any>("loading");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/profile`,{ withCredentials: true })
      .then(function (response) {
        const user = response.data;
        setUser(user);
      })
      .catch(function (error) {
        console.log("error in main is :",error);
        setUser(false);
      });
  }, []);

  if(user == "loading"){
    return (
    <div className="w-full h-screen flex justify-center items-center">
      <Loader className="text-black text-7xl"/>
    </div>
    )
  }

  return (
    <div>
      {user ? (
        <>
          <DashboardPage/>
        </>
      ) : (
        <>
          <LoginPage />
        </>
      )}
    </div>
  );
}

export default App;
