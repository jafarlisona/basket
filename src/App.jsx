import axios from "axios";
import React, { useEffect, useState } from "react";
function App() {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState(
    localStorage.getItem("product")
      ? JSON.parse(localStorage.getItem("product"))
      : []
  );
  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(basket));
  }, [basket]);
  useEffect(() => {
    axios
      .get("https://northwind.vercel.app/api/products")
      .then((res) => setProducts(res.data));
  }, []);
  function addToBasket(item) {
    const elemIndex = basket.findIndex((y) => y.id === item.id);
    if (elemIndex !== -1) {
      const newBasket = [...basket];
      newBasket[elemIndex].count++;
      setBasket(newBasket);
    } else {
      setBasket([...basket, { ...item, count: 1 }]);
    }
  }

  function removeIfZero(item) {
    if (item.count === 1) {
      setBasket(basket.filter((x) => x.id !== item.id));
    }

    setBasket(updatedBasket.filter((basketItem) => basketItem.count > 0));
  }

  function removeFromBasket(id) {
    setBasket(basket.filter((x) => x.id !== id));
  }

  return (
    <div>
      <div
        style={{
          listStyle: "none",
          maxWidth: "1350px",
          padding: "30px 10px",
          borderRadius: "10px",
          backgroundColor: "aliceblue",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#212157" }}>Basket</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
          }}
        >
          {basket.map((item) => (
            <ul key={item.id}>
              <li>ID :{item.id}</li>
              <li>Name :{item.name}</li>
              <li>
                Count :{" "}
                <button
                  onClick={() => {
                    setBasket((prevBasket) =>
                      prevBasket.map((basketItem) =>
                        basketItem.id === item.id
                          ? { ...basketItem, count: basketItem.count - 1 }
                          : basketItem
                      )
                    );
                    removeIfZero(item);
                  }}
                >
                  -
                </button>
                <span>{item.count}</span>
                <button
                  onClick={() => {
                    setBasket((prevBasket) =>
                      prevBasket.map((basketItem) =>
                        basketItem.id === item.id
                          ? { ...basketItem, count: basketItem.count + 1 }
                          : basketItem
                      )
                    );
                  }}
                >
                  +
                </button>
              </li>
              <li>
                <button onClick={() => removeFromBasket(item.id)}>
                  Remove
                </button>
              </li>
            </ul>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          columnGap: "30px",
        }}
      >
        {products.map((x) => (
          <ul
            style={{
              listStyle: "none",
              width: "150px",
              padding: "30px 10px",
              borderRadius: "10px",
              backgroundColor: "aliceblue",
            }}
            key={x.id}
          >
            <li>ID : {x.id}</li>
            <li>Name :{x.name}</li>
            <li>
              <button
                style={{ margin: "20px 0 0" }}
                onClick={() => {
                  addToBasket(x);
                }}
              >
                Add To Basket
              </button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default App;
