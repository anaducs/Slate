import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [cardData, setCardData] = useState(null);

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

  //cardGenerator

  const cards = [
    {
      name: "anandu",
      id: "01",
    },
    { name: "suchjith", id: "02" },
  ];
  const recentCardMaker = (name, id) => {
    return;
  };

  return (
    <>
      <div className="Dashboard-container">
        <div className="gridcontainer">
          <header className="header">
            <div className="Slate">
              <h3>Slate</h3>
            </div>
            <div className="searchBar">
              <input
                type="text"
                placeholder="search"
                style={{ color: "grey", fontSize: "18px" }}
              />
            </div>
            <div className="profile">
              <h4>{user && user.name}</h4>
              <button>Logout</button>
            </div>
          </header>
          <main className="main-section">
            <div className="createCard">
              <div>
                <h3>Create New Document</h3>
              </div>
              <div className="card">
                <div className="img-wrap">
                  <img
                    src="public/assets/create.svg"
                    style={{ width: "80px" }}
                    alt="+"
                  />
                </div>

                <h4>Blank Document</h4>
              </div>
            </div>
            <div className="recentCard">
              <div>
                <h3>Recent documents</h3>
              </div>
              <div className="recentFlex">
                <div className="dynamic-container">
                  <div className="imagewrap">  
                  <img
                    src="public/assets/create.svg"
                    style={{ width: "80px" }}
                    alt="+"
                  />                  
                  </div>
                  <h4>document</h4>

                </div>
                <div className="dynamic-container">
                  <div className="imagewrap">  
                  <img
                    src="public/assets/create.svg"
                    style={{ width: "80px" }}
                    alt="+"
                  />                  
                  </div>
                  <h4>document</h4>

                </div>
              </div>
            </div>
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
