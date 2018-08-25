'use strict';
//@flow

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';


export class NoDataIcon extends React.Component<{}> {
  render() {
    return (
      <p className="large-icon nodata">
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon={faDatabase} />
          <FontAwesomeIcon icon={faQuestion} className="overlay" />
        </span>
      </p>
    );
  }
}
