import React from "react";
import Shoe from "./Shoe";
import Filters from "./Filters";

export default function Home({ shoes }) {
  return (
    <>
      <Filters />
      {shoes.map((shoe) => (
        <section id="shoes">
          <Shoe key={shoe.id} shoe={shoe} />
        </section>
      ))}
    </>
  );
}
