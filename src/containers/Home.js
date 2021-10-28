import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Alert, Button, Container, Nav, Navbar } from 'react-bootstrap';
import CryptoCurrency from "../components/CryptoCurrency";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

const API_KEY = '323ba17b97933a13e018';

function Home () {
  const URL_Coin = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`;

  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("JPY");
  const [rate, setRate] = useState([]);
  const [allCoins, setAllCoins] = useState([]);
  const [coins, setCoins] = useState(allCoins);

  useEffect(() => {
    axios
    .get(URL_Coin)
    .then(function (response) {
      console.log(response.data);
      setAllCoins(response.data);
      setCoins(response.data);
    })
    .catch(function (error) {
      console.log(error)
    });
  }, [URL_Coin]);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  const getRate = (from, to) => {
    const URL_Cur = `https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=${API_KEY}`;
    axios
    .get(URL_Cur)
    .then(function (response) {
      console.log(response.data);
      setRate(response.data);
    })
    .catch(function (error) {
      console.log(error)
    });
    
    const randomNum = getRandomInt(allCoins.length);
    const coin = allCoins[randomNum]
    setCoins([coin]);
  }

  const refresh = () => {
    window.location.reload();
  }

  return (
    <Container>
      <Navbar fixed="top" expand="lg" bg="light" className="Navigation">
        <Navbar.Brand href="#Home">Midterm Project</Navbar.Brand>
        <Nav.Link href="#CurrencyContainer">See Project</Nav.Link>
      </Navbar>
        <Container className="Intro" id="Home">
          <p>Welcome to my midterm project webpage... Click the button! It shows the conversion result and one random cryptocurrency from the list...</p>
          <FontAwesomeIcon className="Icon" icon={faArrowAltCircleDown} size="2x"/>
        </Container>
        <Container fluid="md" className="CurrencyContainer" id="CurrencyContainer">
          <h1 className="CurrencyHeader">Currency Converter</h1>
          <h2>1 {from} = {rate[`${from}_${to}`]} {to}</h2>
          <input className="CurrencyInput" type="text" value={from} onChange={(e) => setFrom(e.target.value)} />
          <input className="CurrencyInput" type="text" value={to} onChange={(e) => setTo(e.target.value)}/>
          <Alert variant="light">Type desired currency into the textbox and then click the button.</Alert>
        </Container>
        <Container className="Buttons">
          <Button className="Button1" size="lg" onClick={()=>{getRate(from, to);}}>Click!</Button>
          <Button className="Button2" size="lg" onClick={refresh}>Restart!</Button>
        </Container>
        <Container className="CryptoIntro">
          <p>Cryptocurrency</p>
        </Container>
        <Container>
          {coins.map(coin => {
            return (
              <CryptoCurrency 
                key={coin.id} 
                name={coin.name} 
                image={coin.image} 
                symbol={coin.symbol}
                price={coin.current_price}
                priceChange={coin.price_change_percentage_24h}
                rank={coin.market_cap_rank}
              />
            )
          })}
        </Container>
    </Container>
  )
}

export default Home;