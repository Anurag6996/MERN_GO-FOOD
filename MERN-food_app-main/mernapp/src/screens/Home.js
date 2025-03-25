import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    setFoodCat(response.foodCategory);
    setFoodItem(response.food_items);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <Carousel setSearch={setSearch} />

      <div className="container">
        {foodCat.map((category) => (
          <div key={category._id} className="mb-5">
            <h2 className="mt-4 mb-3 text-center">{category.CategoryName}</h2>
            <hr />
            <div className="row justify-content-center">
              {foodItem
                .filter(
                  (item) =>
                    item.CategoryName === category.CategoryName &&
                    item.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((filteredItem) => (
                  <Card key={filteredItem._id} data={filteredItem} />
                ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
