import React from 'react';
import PropTypes from 'prop-types';
import styles from './Loader.module.scss';

function Loader(props) {
  return (
    <div className={styles.loader + ' blue'}>
      <span className={styles.text}>L</span>
      <span className={styles.text}>O</span>
      <span className={styles.text}>A</span>
      <span className={styles.text}>D</span>
      <span className={styles.text}>I</span>
      <span className={styles.text}>N</span>
      <span className={styles.text}>G</span>
      <span className={styles.text}>.</span>
      <span className={styles.text}>.</span>
      <span className={styles.text}>.</span>
    </div>
  );
}

Loader.propTypes = {};

export default Loader;
