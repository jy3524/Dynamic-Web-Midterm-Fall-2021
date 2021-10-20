import React from "react";
import { Container, Table } from "react-bootstrap";

const CryptoCurrency = ({ name, image, symbol, price, rank, priceChange}) => {
  return (
    <Container className="CoinContainer">
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>price</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#{rank}</td>
            <td><img src={image} alt="crypto" className="CryptoImage"></img></td>
            <td className="Cryptoname">{name}</td>
            <td>{symbol}</td>
            <td>${price}</td>
            {priceChange < 0 ? (
              <td className="increase">{priceChange.toFixed(2)}%</td>
            ) : (<td className="decrease">{priceChange.toFixed(2)}%</td>)
            }
          </tr>
        </tbody>
      </Table>
    </Container>
  )
}

export default CryptoCurrency;