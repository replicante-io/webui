'use strict';
//@flow

import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import fasDatabase from '@fortawesome/fontawesome-free-solid/faDatabase';
import fasQuestion from '@fortawesome/fontawesome-free-solid/faQuestion';


export class NoDataIcon extends React.Component<{}> {
  render() {
    return (
      <p className="large-icon nodata">
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon={fasDatabase} />
          <FontAwesomeIcon icon={fasQuestion} className="overlay" />
        </span>
      </p>
    );
  }
}
