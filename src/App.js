import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Badge,
  Container,
  Col,
  Row,
} from "reactstrap";
import "./App.css";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
      const data = await response.json();
      setCoins(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  const filteredCryptoData = coins.filter((crypto) =>
    crypto.name.toLowerCase().includes(search.toLowerCase())
  );
  

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="app">
      <h1>CRYPTO CURRENCY TRACKER</h1>
      <div>
        <Container>
          <Row>
            <Col>
              <center>
              <input
                className="search-container"
                type="text"
                placeholder="Find out crypto rates..."
                value={search}
                onChange={handleChange}
              />
              </center>
            </Col>
            
           
          </Row>
        </Container>
      </div>

      <div className="card-container">
        {filteredCryptoData.map((crypto) => (
          <Card
            key={crypto.id}
            style={{
              width: "18rem",
            }}
          >
            <CardBody>
              <CardTitle tag="h6">{crypto.name}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {crypto.symbol.toUpperCase()}
              </CardSubtitle>
            </CardBody>
            <center><img alt={crypto.name} src={crypto.image} width="30%" /></center>
            <CardBody>
              <CardText>
                <b>CURRENT COST:</b> ${crypto.current_price.toLocaleString()}<br/>
                <b>CHANGE RATE :</b> %
                {crypto.price_change_percentage_24h < 0 ? (
                  <span className="text-red-500">
                    {crypto.price_change_percentage_24h}
                  </span>
                ) : (
                  <span className="text-green-400">
                    {crypto.price_change_percentage_24h}
                  </span>
                )}
              </CardText>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;