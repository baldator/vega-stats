import { React } from 'react';
import PropTypes from 'prop-types';
import { gql, useSubscription } from '@apollo/client'
import styles from './MarketsData.module.css';
import ReactSpeedometer from "react-d3-speedometer"

const MARKET_SUBSCRIPTION = gql`
  subscription getMarketsData ($marketId:ID) {
    marketData (marketId: $marketId){
      market{
        name
        id
        decimalPlaces
      }
      markPrice
      bestBidPrice
      bestBidVolume
      bestOfferVolume
      bestOfferPrice
      midPrice
      timestamp
      
    }
  }
`;

const MarketsData = ({marketId, marketBotRatio}) => {
  const result = useSubscription(
    MARKET_SUBSCRIPTION,
    {
      variables: {
        marketId: marketId
      }
    }
  );

  if(result.data && result.data.marketData.market.id === marketId){

    return (
      <div className={styles.MarketsData}>
        <h2>{result.data.marketData.market.name}</h2>
        
        <p>
          <b>Mid Price: </b> {result.data.marketData.midPrice / (10**result.data.marketData.market.decimalPlaces)}
        </p>
        <p>
          <b>Mark Price: </b> {result.data.marketData.markPrice / (10**result.data.marketData.market.decimalPlaces)}
        </p>
        <p>
          <b>Best Offer: </b> {result.data.marketData.bestOfferPrice / (10**result.data.marketData.market.decimalPlaces)} (Volume: {result.data.marketData.bestOfferVolume})
        </p>
        <p>
          <b>Best Bid: </b> {result.data.marketData.bestBidPrice / (10**result.data.marketData.market.decimalPlaces)} (Volume: {result.data.marketData.bestBidVolume})
        </p>
        
        <ReactSpeedometer maxValue={100}
            value={marketBotRatio * 100}
            needleColor="black"
            startColor="green"
            segments={10}
            currentValueText={"Bot/Human ratio - " + (marketBotRatio * 100).toFixed(1) + "%"}
            endColor="yellow" />
      </div>
    )
  }
  else{
    return(
      <div className={styles.MarketsData}>
        Loading...
      </div>
    )
  }

};

MarketsData.propTypes = {
  markets: PropTypes.array,
  marketBotRatio: PropTypes.number,
};

MarketsData.defaultProps = {
  markets: []
};

export default MarketsData;
