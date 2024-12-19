import React, { useEffect, useState} from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Dashboard.css";
import Cards from "../../Components/cards/Cards";


function Dashboard({ onUserLogin }) {
  const [user, setUser] = useState(null);
  const [cardData, setCardData] = useState([]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const params = useParams();

  useEffect(() => {
    const url = "http://localhost:3001/api/users/dashboard";
    try {
      const fetchData = async () => {
        const response = await axios.get(url, { withCredentials: true });
        const userData = response.data.user;
        setUser(userData);
      };
      fetchData();
      onUserLogin(user);
    } catch (e) {
      console.log(e);
    }
  }, []);

  //open recent documents
  

  //open new document
  const handleNewDocument = () => {
    navigate("/document");
  };

  //cardGenerator
  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:3001/api/users/getDocument";
      const response = await axios.get(url, { withCredentials: true });
      const userDocuments = response.data;
      //limit output to 5 elements
      const recentdoc = userDocuments.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setCardData(recentdoc);
      console.log(recentdoc);
    };
    fetchData();
  }, []);

  console.log("card", cardData);

  //logout
  const logout = "http://localhost:3001/api/users/logout";
  const handleLogout = async () => {
    try {
      const res = await axios.post(logout, {}, { withCredentials: true });
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
                <div className="img-wrap" onClick={handleNewDocument}>
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
                      <Cards
                        key={card._id}
                        id={card.name}
                        onCardClick={()=>{
                          navigate(`/document/${user.id}/${card._id}`);
                        }}
                      />
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
