'use strict';
//@flow

import { Component } from 'react';
import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import fasDatabase from '@fortawesome/fontawesome-free-solid/faDatabase';


/** Map known DB kinds to the correct icons. */
const GENERIC_ICON = (key, kind) => <FontAwesomeIcon key={key} icon={fasDatabase} title={kind} />;
const KNOWN_ICONS = {
  'MongoDB': (key, _) => <span key={key} className="db-icon mongodb" title="MongoDB" />,
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
