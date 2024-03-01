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
          <button 
          style={{
            backgroundColor: 'blue',
            border: 'none',
            color: 'white',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            margin: '2px 2px',
            cursor: 'pointer',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s',
            opacity: isMinting ? '0.6' : '1',
            pointerEvents: isMinting ? 'none' : 'auto',
          }} 

          onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <p>Install Metamask wallet</p>
        )}
      </div>
    );
  }
  return (
    <div className="App">

<div>
  <h1 style={{color: '#dbebfb', fontFamily: 'Arial Black, sans-serif', fontSize: '3em', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '2px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>Cosmos NFT Minting Dapp</h1>
  <h2 style={{color: '#02315f', fontFamily: 'Tahoma, sans-serif', fontSize: '1.5em', marginTop: '0', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>Unlock the cosmos with your own Zodiac Sign NFT!<br/>Pick your birth date and mint!</h2>
</div>
      {/* <p>Connected as: {account}</p> */}
 
      <input className="cool-date-input" onChange={handleDateInput} value={date} type="date" id="dob" />
      <br />
      <br />
      {zodiacSign ? (
        <svg
          
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMin meet"
          viewBox="0 0 300 300"
          width="350px"
          height="350px"
          
        >
          
          
          <style>{`.base { fill: white; font-family: Pacifico; font-size: 44px;`}</style>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop id="startColor" offset="0%" stop-color="blue"/>
      <stop id="endColor" offset="100%" stop-color="red"/>
    </linearGradient>
          <rect rx="20" ry="20" id="animatedRect" width="100%" height="100%" fill="url(#gradient)" />
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
      <button 
  style={{
    backgroundColor: isMinting ? '#808080' : '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '2px 2px',
    cursor: 'pointer',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s',
    opacity: isMinting ? '0.6' : '1',
    pointerEvents: isMinting ? 'none' : 'auto',
  }} 
  disabled={isMinting} 
  onClick={mintNFT}
>
  {isMinting ? 'Minting...' : 'Mint NFT'}
</button>
    </div>
  );
}
export default App;
