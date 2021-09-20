import React from 'react';
import PropTypes from 'prop-types';
import styles from './VegaTime.module.css';
import { gql, useQuery, graphql } from '@apollo/client'

const GET_VEGA_TIME = gql`
  query GetVegaTime {
    statistics{
      vegaTime
    }
  }
`;

const VegaTime = () => {
  const { loading, error, data } = useQuery(GET_VEGA_TIME);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return(
  <div className={styles.VegaTime}>
    Start time: {data.statistics.vegaTime} UTC
  </div>
  )
};

VegaTime.propTypes = {};

VegaTime.defaultProps = {};

export default VegaTime;
