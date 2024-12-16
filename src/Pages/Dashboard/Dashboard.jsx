import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Cards from "../../Components/cards/Cards";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [cardData, setCardData] = useState([]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

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
  //open recent documents
  const handleRecentDocument = async()=>{

  }

  //open new document
  const handleCreateNewDocument = async()=>{
    
  }

  //cardGenerator
  useEffect(() => {
    const fetchData = () => {
      const cards = [
        {
          name: "anandu",
          id: 1,
        },
        { name: "thathamma", id: 2 },
      ];
      setCardData(cards);
    };
    fetchData();
  }, []);

  //logout
  const logout = "http://localhost:3001/api/users/logout";
  const handleLogout = async () => {
    try {
      const res = await axios.post(logout, {}, { withCredentials: true });
      console.log(res);

      navigate("/");
    } catch (e) {}
  };

  return (
    <>
      <div className="Dashboard-container">
        <div className="gridcontainer">
          <header className="header">
            <div className="Slate">
              <h3>Slate</h3>
            </div>
            <div className="searchField">
              <div className="searchBar">
                <input
                  type="text"
                  placeholder="search"
                  style={{ fontSize: "18px" }}
                />
              </div>
              {result && <div className="searchResult"></div>}
            </div>
            <div className="profile">
              <h4>{user && user.name}</h4>
              <img
                src="public/assets/logut.svg"
                alt=""
                onClick={handleLogout}
                width={"25px"}
                style={{ cursor: "pointer" }}
              />
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
            {/* dynamic */}
            {cardData && (
              <div className="recentCard">
                <div>
                  <h3>Recent documents</h3>
                </div>

                <div className="recentFlex">
                  {cardData.map((card) => {
                    return (
                      <Cards key={card.id} name={card.name} id={card.id} onCardClick={handleRecentDocument}/>
                    );
                  })}
                </div>
              </div>
            )}
          </main>
          <footer className="footer-section">
            <hr style={{ color: "blue", width: "90%", margin: "10px auto" }} />
            <p>&copy; cs</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
