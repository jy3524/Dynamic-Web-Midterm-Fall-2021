import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Alert, Button, Container, Nav, Navbar } from 'react-bootstrap';
import CryptoCurrency from "../components/CryptoCurrency";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

const API_KEY = '323ba17b97933a13e018';

function Home () {
  const URL_Coin = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`;

  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("JPY");
  const [rate, setRate] = useState([]);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
    .get(URL_Coin)
    .then(function (response) {
      console.log(response.data);
      setCoins(response.data)
    })
    .catch(function (error) {
      console.log(error)
    });
  }, [URL_Coin]);

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
  }

  return (
    <Container>
      <Navbar fixed="top" expand="lg" bg="light" className="Navigation">
        <Navbar.Brand href="home">Midterm Project</Navbar.Brand>
        <Nav.Link href="#CurrencyContainer">Currency Exchange Rate</Nav.Link>
        <Nav.Link href="#CryptoIntro">Cryptocurrency</Nav.Link>
      </Navbar>
        <Container className="Intro">
          <p>Welcome to my midterm project webpage...</p>
          <FontAwesomeIcon className="Icon" icon={faArrowAltCircleDown} size="2x"/>
        </Container>
        <Container fluid="md" className="CurrencyContainer" id="CurrencyContainer">
          <h1 className="CurrencyHeader">Currency Converter</h1>
          <h2>1 {from} = {rate[`${from}_${to}`]} {to}</h2>
          <input className="CurrencyInput" type="text" value={from} onChange={(e) => setFrom(e.target.value)} />
          <input className="CurrencyInput" type="text" value={to} onChange={(e) => setTo(e.target.value)}/>
          <Button size="sm" onClick={()=> {getRate(from, to);}}>Convert Currency</Button>
          <Alert variant="light">Type currency into the textbox and then click the convert button.</Alert>
        </Container>
        <Container className="CryptoIntro" id="CryptoIntro">
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