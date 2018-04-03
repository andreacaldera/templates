import React from 'react';
import { connect } from 'react-redux';

const SomeComponent = () => (
  <div>
    <h1>Some page</h1>
  </div>
);

SomeComponent.propTypes = {
};


export default connect(null, null)(SomeComponent);
