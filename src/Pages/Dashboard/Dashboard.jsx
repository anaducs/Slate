import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "http://localhost:3001/api/users/dashboard";
    try {
      const fetchData = async () => {
        const response = await axios.get(url, { withCredentials: true });
        const userData = response.data.user;
        setUser(userData);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <div className="Dashboard-container">
        <div className="gridcontainer">
          <header className="header">
            <div className="Slate">
              <h3>Slate</h3>
            </div>
            <div className="searchBar">
              <input type="text"/>
              
            </div>
            <div className="profile">
                <h4>{user && user.name}</h4>
                <button>Logout</button>
               
            </div>
          </header>
          <main className="main-section">
            <div className="createCard">
              <h1>+</h1>
            </div>
            <div className="recentCard"></div>
          </main>
          <footer className="footer-section">
            <p>&copy; cs</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
