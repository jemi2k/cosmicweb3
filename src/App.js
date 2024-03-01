import "./App.css";
 
import { useEffect, useState } from "react";
import { Contract, BrowserProvider } from "ethers";
import NFT from "./abi/horoscopeNFT.json";
 
const NFT_CONTRACT_ADDRESS = "0x7e70FB24DAF78a5b15637842D2bdCDf0dBd4E923";
 
function App() {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [date, setDate] = useState("1992-08-31");
  const [zodiacSign, setZodiacSign] = useState(null);
 
  // state for whether the app is minting or not.
  const [isMinting, setIsMinting] = useState(false);
 
  const [NFTContract, setNFTContract] = useState(null);
 
  const [account, setAccount] = useState(null);
 
  useEffect(() => {
    if (window.ethereum) {
      setIsWalletInstalled(true);
    }
  }, []);
 
  function handleDateInput({ target }) {
    setDate(target.value);
  }
 
  async function connectWallet() {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        setAccount(accounts[0]);
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }
 
  useEffect(() => {
    calculateZodiacSign(date);
  }, [date]);
 
 
  function calculateZodiacSign(date) {
    let dateObject = new Date(date);
    let day = dateObject.getDate();
    let month = dateObject.getMonth();
    if (month == 0) {
      if (day >= 20) {
        setZodiacSign("Aquarius");
      } else {
        setZodiacSign("Capricorn");
      }
    } else if (month == 1) {
      if (day >= 19) {
        setZodiacSign("Pisces");
      } else {
        setZodiacSign("Aquarius");
      }
    } else if (month == 2) {
      if (day >= 21) {
        setZodiacSign("Aries");
      } else {
        setZodiacSign("Pisces");
      }
    } else if (month == 3) {
      if (day >= 20) {
        setZodiacSign("Taurus");
      } else {
        setZodiacSign("Aries");
      }
    } else if (month == 4) {
      if (day >= 21) {
        setZodiacSign("Gemini");
      } else {
        setZodiacSign("Taurus");
      }
    } else if (month == 5) {
      if (day >= 21) {
        setZodiacSign("Cancer");
      } else {
        setZodiacSign("Gemini");
      }
    } else if (month == 6) {
      if (day >= 23) {
        setZodiacSign("Leo");
      } else {
        setZodiacSign("Cancer");
      }
    } else if (month == 7) {
      if (day >= 23) {
        setZodiacSign("Virgo");
      } else {
        setZodiacSign("Leo");
      }
    } else if (month == 8) {
      if (day >= 23) {
        setZodiacSign("Libra");
      } else {
        setZodiacSign("Virgo");
      }
    } else if (month == 9) {
      if (day >= 23) {
        setZodiacSign("Scorpio");
      } else {
        setZodiacSign("Libra");
      }
    } else if (month == 10) {
      if (day >= 22) {
        setZodiacSign("Sagittarius");
      } else {
        setZodiacSign("Scorpio");
      }
    } else if (month == 11) {
      if (day >= 22) {
        setZodiacSign("Capricorn");
      } else {
        setZodiacSign("Sagittarius");
      }
    }
  }
 
  useEffect(() => {
    function initNFTContract() {
      const provider = new BrowserProvider(window.ethereum);
      provider.getSigner().then((signer) => {
        setNFTContract(new Contract(NFT_CONTRACT_ADDRESS, NFT.abi, signer));
      }).catch((error) => {
        console.error("Error initializing contract:", error);
      });
    }
    initNFTContract();
  }, [account]);
 
  async function mintNFT() {
    setIsMinting(true);
    try {
      const transaction = await NFTContract.mintNFT(account, zodiacSign);
  
      // Wait for the transaction to be confirmed
      await transaction.wait();
  
      // Transaction is confirmed, you can perform any additional actions here if needed
    } catch (e) {
      console.error(e);
    } finally {
      alert("Minting Successful")
      setIsMinting(false);
    }
  }
  
  if (account === null) {
    return (
      <div className="App">
        {" "}
        <br />
        {isWalletInstalled ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <p>Install Metamask wallet</p>
        )}
      </div>
    );
  }
  return (
    <div className="App">
      <h1>Cosmic NFT Minting Dapp

      </h1>
      <h2> Mint NFT of your ZodiacSign, choose your birth date then MINT! </h2>
      <p>Connected as: {account}</p>
 
      <input onChange={handleDateInput} value={date} type="date" id="dob" />
      <br />
      <br />
      {zodiacSign ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMin meet"
          viewBox="0 0 300 300"
          width="400px"
          height="400px"
        >
          <style>{`.base { fill: white; font-family: serif; font-size: 24px;`}</style>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop id="startColor" offset="0%" stop-color="blue"/>
      <stop id="endColor" offset="100%" stop-color="red"/>
    </linearGradient>
          <rect id="animatedRect" width="100%" height="100%" fill="url(#gradient)" />
          <text
            x="50%"
            y="50%"
            class="base"
            dominant-baseline="middle"
            text-anchor="middle"
          >
            {zodiacSign}
          </text>
        </svg>
      ) : null}
 
      <br />
      <br />
      <button disabled={isMinting} onClick={mintNFT}>
        {isMinting ? "Minting..." : "Mint"}
      </button>
    </div>
  );
}
export default App;
