import React from "react";
import "./Cards.css";
function Cards({ name, id, onCardClick }) {
  return (
    <div>
      <div className="dynamic-container">
        <div className="imagewrap" onClick={onCardClick}>
          <img src="" style={{ width: "80px" }} alt={name} />
        </div>
        <h4>{id}</h4>
      </div>
    </div>
  );
}

export default Cards;
