import React from "react";
import CryptoBuyExchange from "./CryptoBuyExchange";

function Home(props) {
  return (
    <div className="container">
      <div className="homecont row  ">
        <div className="col content">
          <div className="logo">
            <img src="/bitxlog.png" alt="logo" style={{ width: 200 }} />
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
