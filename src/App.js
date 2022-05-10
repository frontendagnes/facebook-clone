import React, { useEffect } from "react";
import "./App.css";

import { useStateValue } from "./components/utility/StateProvider";
import { auth, onAuthStateChanged } from "./components/utility/firebase";
//components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Feed from "./components/Feed/Feed";
import Widgets from "./components/Widgets/Widgets";
import Login from "./components/Login/Login";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const authUser = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "DELETE_USER",
        });
      }
    });

    return () => {
      authUser();
    };
  }, [dispatch]);
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <div className="app__body">
            <Sidebar />
            <Feed />
            <Widgets />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
