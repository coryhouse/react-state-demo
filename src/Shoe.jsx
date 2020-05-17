import React from "react";
import { Link } from "react-router-dom";

export default function Shoe({ shoe }) {
  return (
    <div className="shoe">
      <Link to={`/shoe/${shoe.id}`}>
        <img src={`images/shoe${shoe.id}.jpg`} alt="shoe" />
        <h3>{shoe.name}</h3>
      </Link>
    </div>
  );
}
