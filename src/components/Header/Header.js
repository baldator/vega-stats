import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';
import logo from './VegaLogo.png';

const Header = () => (
  <div className={styles.Header}>
    <span class="words word-1">
      <span>V</span>
      <span>E</span>
      <span>G</span>
      <span>A</span>
      <span>&nbsp;</span>
      <span>B</span>
      <span>O</span>
      <span>T</span>
      <span>-</span>
      <span>M</span>
      <span>E</span>
      <span>T</span>
      <span>E</span>
      <span>R</span>
    </span>

  </div>
);

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
