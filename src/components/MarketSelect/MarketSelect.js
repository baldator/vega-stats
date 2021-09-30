import React from 'react';
import PropTypes from 'prop-types';
import styles from './MarketSelect.module.css';
import { gql, useQuery, graphql } from '@apollo/client';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const GET_VEGA_MARKETS = gql`
    query{
      markets{
        value: id
        label: name
      }
    }
`;
const animatedComponents = makeAnimated();
const placeholder = "Select markets..."

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: 'black'
  }),
  
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}


let markets = data.markets.filter(item => item.state = 'Active');

const MarketSelect = ({updateMarkets}) => {
  const { loading, error, data } = useQuery(GET_VEGA_MARKETS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
        <Select 
          options={markets}
          closeMenuOnSelect={false}
          components={animatedComponents} 
          isMulti
          placeholder={placeholder}
          onChange={(e) => updateMarkets(e)}
          styles= { customStyles }
          />
  )
};

MarketSelect.propTypes = {
  updateMarkets: PropTypes.func
};

MarketSelect.defaultProps = {};

export default MarketSelect;
