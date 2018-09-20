'use strict';
//@flow

import { Component } from 'react';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';


/** Map known DB kinds to the correct icons. */
const GENERIC_ICON = (key, kind) => (
  <span key={key} className="db-icon" title={kind}>
    <FontAwesomeIcon icon={faDatabase} />
  </span>
);
const KNOWN_ICONS = {
  'Kafka': (key, _) => <span key={key} className="db-icon kafka" title="Kafka" />,
  'MongoDB': (key, _) => <span key={key} className="db-icon mongodb" title="MongoDB" />,
  'Zookeeper': (key, _) => <span key={key} className="db-icon zookeeper" title="Zookeeper" />,
};


/** Render icons for DB kinds. */
type Props = {
  kinds: Array<string>,
}

class ClusterKinds extends Component<Props> {
  render() {
    return this.props.kinds.map((kind, idx) => {
      const icon = KNOWN_ICONS[kind] || GENERIC_ICON;
      return icon(idx, kind);
    });
  }
}
export default ClusterKinds;
