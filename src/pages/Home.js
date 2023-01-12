import React from "react";
import CryptoBuyExchange from "./CryptoBuyExchange";
import Header from "./header";

function Home(props) {
  return (
    <div className="container">
      <div className="homecont row  ">
        <div className="col content">
          <div className="logo">
            <img src="/lt.png" alt="logo" style={{ height: 115, width: 150 }} />
          </div>
          <div style={{ minWidth: "100%", marginTop: 30 }}>
            <span style={{ width: "100%", fontSize: "10vmin" }}>
              Best Place To Buy
              <br /> <span style={{ color: "goldenrod" }}>BITX Gold</span>{" "}
            </span>
          </div>
          <div
            style={{
              width: "30%",
              backgroundColor: "goldenrod",
              borderRadius: 3,
              height: 5,
            }}
          ></div>
        </div>
        <div className="cform container-fluid col">
          <CryptoBuyExchange />
        </div>
      </div>
    </div>
  );
}

export default Home;
