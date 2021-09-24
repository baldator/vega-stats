import React from 'react';
import styles from './VegaRealTime.module.css';
import { gql, useQuery } from '@apollo/client'

const GET_VEGA_REAL_TIME = gql`
  query GetVegaRealTime {
    statistics{
      vt: vegaTime
    }
  }
`;

const VegaRealTime = () => {
  const { loading, error, data } = useQuery(GET_VEGA_REAL_TIME, {
    pollInterval: 1000
  });

  if (loading || data  === 'undefined') return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return(
    <div className={styles.VegaRealTime}>
      Current Vega time: {data.statistics.vt}  UTC
    </div>
  )
};

VegaRealTime.propTypes = {};

VegaRealTime.defaultProps = {};

export default VegaRealTime;
