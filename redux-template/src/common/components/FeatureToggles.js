import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import meta from '../modules/meta';

const FeatureToggles = ({ featureToggles }) => {
  const toggleList = _.isEmpty(featureToggles) ?
    (<p>No feature toggle selected, use ?feature-toggle[]=your-feature-toggle to enable feature toggles</p>) :
    (<div>
      <p>Active featureToggles:</p>
      <ul>
        {featureToggles.map((featureToggle) => (<li key={`${featureToggle}-item`}>{featureToggle}</li>))}
      </ul>
    </div>);
  return (
    <div>
      {toggleList}
    </div>);
};

FeatureToggles.propTypes = {
  featureToggles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  featureToggles: meta.getFeatureToggles(state),
});

export default connect(mapStateToProps, null)(FeatureToggles);
