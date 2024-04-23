import React from "react";
import { Link } from "react-router-dom";
import "./style/Card.css";

const Card = ({ pokemon }) => {
  const colors = [
    "#FF6347",
    "#4682B4",
    "#32CD32",
    "#BA55D3",
    "#FFD700",
    "#00FF00",
    "#FF00FF",
    "#800080",
  ];

  // Choix aléatoire d'une couleur parmi le tableau de couleurs
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  //style={{ backgroundColor: randomColor }}

  return (
    <div className="LinkPoke" style={{ backgroundColor: randomColor }}>
      <Link
        to={`/pokemon/${pokemon.name}`}
        style={{ textDecoration: "none" }}
        cl
      >
        <div className="image">
          <img src={pokemon.image} alt={pokemon.name} className="imge " />
        </div>
        <div className="card ">
          <div className="info card-body">
            <h3 className="card-title">{pokemon.name}</h3>
            <p className="card-text">Type: {pokemon.type.join(", ")}</p>
            <p className="card-text">height: {pokemon.height}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
