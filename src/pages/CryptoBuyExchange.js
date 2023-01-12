import React, { useEffect, useRef, useState } from "react";
import currency from "./crun";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import BitXSwap from "../contractABI/BitXSwap.json";
import USDT from "../contractABI/USDT.json";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";

function CryptoBuyExchange(props) {
  const [gp, setgp] = useState(0);
  const [inp, setinp] = useState(1);
  const [cal, setcal] = useState(0);
  const [walletAddress, setWalletAddress] = useState(null);
  const [signer, setSigner] = useState(null);
  const [metamaskError, setMetamaskError] = useState(null);

  const connectMetamask = async () => {
    if (!window.ethereum) {
      setMetamaskError("PLEASE INSTALL METAMASK");
    } else {
      const address = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setSigner(signer);
      setWalletAddress(address[0]);
    }
  };

  const buyBitX = async () => {
    const usdt = new ethers.Contract(USDT.address, USDT.abi, signer);
    const usdtBitXSwap = new ethers.Contract(
      BitXSwap.address,
      BitXSwap.abi,
      signer
    );
    const value = await usdt.allowance(BitXSwap.address, walletAddress);
    const usdtVaule = ethers.utils.parseEther(inp.toString());
    if (value < usdtVaule.toString()) {
      try {
        await (await usdt.approve(BitXSwap.address, usdtVaule)).wait();
      } catch (error) {
        toast.error("Transaction Failed", {
          position: "top-center",
          style: { minWidth: 180 },
        });
      }
    }

    try {
      const swap = await (await usdtBitXSwap.swap(usdtVaule)).wait();
      console.log(swap.events);
      if (!swap.events) {
        toast.error("Transaction Failed", {
          position: "top-center",
          style: { minWidth: 180 },
        });
      } else {
        toast.success(
          "Transaction Successfull https://testnet.bscscan.com/tx/" +
            swap.blockHash,
          { position: "top-center", style: { minWidth: 180 } }
        );
        const tokenAddress = "0xE8b3300605421837f52bD591d144FD625f17e02C";
        const tokenSymbol = "BITXGOLD";
        const tokenDecimals = 18;
        try {
          const wasAdded = await window.ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20",
              options: {
                address: tokenAddress,
                symbol: tokenSymbol,
                decimals: tokenDecimals,
              },
            },
          });
          if (wasAdded) {
            toast.success("Token added in metamask successfully", {
              position: "top-center",
              style: { minWidth: 180 },
            });
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    } catch (error) {
      toast.error(error.reason, {
        position: "top-center",
        style: { minWidth: 180 },
      });
    }
  };

  useEffect(() => {
    connectMetamask();
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", "goldapi-dvw7tlcrv8u05-io");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://www.goldapi.io/api/XAU/USD", requestOptions)
      .then((response) => response.json())
      .then((result) => setgp(result["price_gram_24k"]))
      .catch((error) => toast.error(error));
  }, []);

  return (
    <div className="formContainer container-fluid">
      <Toaster />
      <div className="label">
        <span>Tokens</span>
      </div>
      <div className="inputscont">
        <input
          type="number"
          className="inp"
          value={inp}
          onChange={(e) => setinp(e.target.value)}
          placeholder="Enter Token"
        />
        <div className="opt container-fluid">
          <img src="/trc.png" style={{ maxWidth: "40px" }} className="im" />
          <span style={{ paddingLeft: 10 }} className="in">
            BITX
          </span>
        </div>
      </div>

      <div className="label">
        <span>Amount</span>
      </div>
      <div className="inputscont">
        <input
          type="number"
          className="inp"
          value={parseFloat(inp) * parseFloat(gp)}
          disabled
        />
        <div className="opt container-fluid">
          <img src="/usdt.png" style={{ maxWidth: 40 }} className="im" />
          <span style={{ paddingLeft: 10 }} className="in">
            {" "}
            USDT
          </span>
        </div>
      </div>

      {metamaskError != null ? (
        <>
          <div className="offerbtn">
            <span>{metamaskError}</span>
          </div>
        </>
      ) : walletAddress == null ? (
        <button className="offerbtn" onClick={connectMetamask}>
          CONNECT METAMASK
        </button>
      ) : (
        <button className="offerbtn " onClick={buyBitX}>
          BUY
        </button>
      )}

      {walletAddress != null ? (
        <span className="text-center">
          {walletAddress.slice(0, 5) + "..." + walletAddress.slice(37, 42)}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

export default CryptoBuyExchange;
