import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Alert, Button, Container } from 'react-bootstrap';

const API_KEY = '323ba17b97933a13e018';

function Home () {
  const URL = `https://free.currconv.com/api/v7/convert?q=USD_AUD&compact=ultra&apiKey=${API_KEY}`;

  const [conversion, setConversion] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("JPY");
  const [rate, setRate] = useState([]);

  useEffect(() => {
    axios
    .get(URL)
    .then(function (response) {
      console.log(response.data);
      setConversion(response.data.USD_JPY);
    })
    .catch(function (error) {
      console.log(error)
    });
  }, [URL]);

  const getRate = (from, to) => {
    const URL1 = `https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=${API_KEY}`
    axios
    .get(URL1)
    .then(function (response) {
      console.log(response.data);
      setRate(response.data);
    })
    .catch(function (error) {
      console.log(error)
    });
  }
  
  return (
    <Container fluid="md" className="CurrencyContainer">
      <h1 className="CurrencyHeader">Currency Converter</h1>
      <h2>1 {from} = {rate[`${from}_${to}`]} {to}</h2>
      <input className="CurrencyInput" type="text" value={from} onChange={(e) => setFrom(e.target.value)} />
      <input className="CurrencyInput" type="text" value={to} onChange={(e) => setTo(e.target.value)}/>
      <Button size="sm" onClick={()=> {getRate(from, to);}}>Convert Currency</Button>
      <Alert variant="light">Type currency into the textbox and then click the convert button.</Alert>
    </Container>
  )
}

export default Home;