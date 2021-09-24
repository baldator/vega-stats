import './App.css';
import { useState } from 'react'
import Header from './components/Header/Header'
import VegaRealTime from './components/VegaRealTime/VegaRealTime'
import MarketSelect from './components/MarketSelect/MarketSelect'
import MarketData from './components/MarketsData/MarketsData'
import { gql, useSubscription } from "@apollo/client"
import configData from './config.json';


const SUBSCRIBE_TRADES = gql`
  subscription getTradingData {
    trades{
      size
      market{
        id
      }
      buyer{
        id
      }
    }
  }
`;

var tradesRatio = {};

function App() {
  const [markets, setMarkets] = useState([])

  const updateMarkets = (data) => {
    setMarkets(data);
  };

  
  const result = useSubscription(
    SUBSCRIBE_TRADES
  );
  let liqBots = configData.liqBots.map(item => item.pubKey);
  let traderBot = configData.traderBot.map(item => item.pubKey);

  if(result.data){
    result.data.trades.map((trade) => {
      if(trade.market.id){
        if(tradesRatio[trade.market.id]){
          tradesRatio[trade.market.id].trades += 1;
        }
        else{
          tradesRatio[trade.market.id] = {
            trades: 1,
            botTrades: 0,
            liqBotTrades: 0
          }
        }
        if(traderBot.includes(trade.buyer.id)){
          tradesRatio[trade.market.id].botTrades += 1;
        }
        if(liqBots.includes(trade.buyer.id)){
          tradesRatio[trade.market.id].liqBotTrades += 1;
        }
      }
    });
  }
  console.log("trades ratio: ", tradesRatio);

  return (
      <div>
        <Header />
        <VegaRealTime />
        <MarketSelect updateMarkets={updateMarkets} />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {markets.map((market) => {
            return (<MarketData key={market.value} marketId={market.value} marketBotRatio={tradesRatio[market.value] ? (tradesRatio[market.value].botTrades + tradesRatio[market.value].liqBotTrades) / tradesRatio[market.value].trades : 0} marketLiqBotRatio={tradesRatio[market.value] ? tradesRatio[market.value].liqBotTrades / tradesRatio[market.value].botTrades : 0} />);
          }  
          )}
        </div>
      </div>
  );
}

export default App;
