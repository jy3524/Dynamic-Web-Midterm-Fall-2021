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
            <td><p>#{rank}</p></td>
            <td><img src={image} alt="crypto" className="CryptoImage"></img></td>
            <td><h3>{name}</h3></td>
            <td><p>{symbol}</p></td>
            <td><p>${price}</p></td>
            {priceChange < 0 ? (
              <p className="increase">{priceChange.toFixed(2)}%</p>
            ) : (<p className="decrease">{priceChange.toFixed(2)}%</p>)
            }
          </tr>
        </tbody>
      </Table>
    </Container>
  )
}

export default CryptoCurrency;