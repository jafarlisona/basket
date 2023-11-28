import axios from "axios";
import React, { useEffect, useState } from "react";
function App() {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState(
    localStorage.getItem("product")
      ? JSON.parse(localStorage.getItem("product"))
      : []
  );
  const [count, setCount] = useState(1);
  useEffect(() => {
    axios
      .get("https://northwind.vercel.app/api/products")
      .then((res) => setProducts(res.data));
  }, []);
  function addToBasket(item) {
    const elemIndex = basket.findIndex((y) => y.id === item.id);
    if (elemIndex !== -1) {
      const newBasket = [...basket];
      // newBasket[elemIndex].count++;
      setCount(count + 1);
      setBasket(newBasket);
    } else {
      // setBasket([...basket, { ...item, count: 1 }]);
      setBasket([...basket, { ...item }]);
    }
  }
  // function deleteZero() {
  //   if(setCount((count)=>count<1)){
  //     removeFromBasket(id)
  //   }
  // //   const delArr=[...basket]
  // //   if (delArr. < 0) {
  // //     removeFromBasket(id);
  // //   }
  // }
  function removeFromBasket(id) {
    setBasket(basket.filter((x) => x.id !== id));
  }

  return (
    <div>
      <div style={{ border: "2px solid black", width: "100%" }}>
        <h2 style={{ textAlign: "center" }}>Basket</h2>
        <div>
          {basket.map((item) => (
            <ul key={item.id}>
              <li>ID :{item.id}</li>
              <li>Name :{item.name}</li>
              <li>
                Count : <button onClick={() => setCount(count - 1)}>-</button>
                {/* <span>{item.count}</span> */}
                <span>{count}</span>
                <button onClick={() => setCount(count + 1)}>+</button>
              </li>
              <li>
                <button onClick={() => removeFromBasket(item.id)}>
                  REMOVE
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
          margin: "50px 30px",
        }}
      >
        {products.map((x) => (
          <ul
            style={{
              border: "1px solid black",
              listStyle: "none",
              width: "150px",
              padding: "30px 10px",
              borderRadius: "10px",
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
