import React from 'react';
import styles from './VegaStartTime.module.css';
import { gql, useQuery } from '@apollo/client'

const GET_VEGA_START_TIME = gql`
  query GetVegaStartTime {
    statistics{
      vegaTime
    }
  }
`;

const VegaStartTime = () => {
  const { loadingRT, errorRT, data } = useQuery(GET_VEGA_START_TIME);

  if (loadingRT || data === undefined) return 'Loading...';
  if (errorRT) return `Error! ${errorRT.message}`;

  return(
    <div className={styles.VegaStartTime}>
      Start time: {data.statistics.vegaTime}  UTC
    </div>
  )
};

VegaStartTime.propTypes = {};

VegaStartTime.defaultProps = {};

export default VegaStartTime;
