'use strict';
//@flow


import { Component } from 'react';
import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faActive from '@fortawesome/fontawesome-free-solid/faCircleNotch';
import faRefresh from '@fortawesome/fontawesome-free-solid/faRedoAlt';

import { fetchData } from './action';
import type { FetchStore } from './store';


type Props = {
  dispatch: any,
  id: string,
  request: () => Promise<void>,
  store: FetchStore,
}

class FetchButton extends React.Component<Props> {
  // Reference to the button for tests.
  button: any;

  handleClick() {
    this.props.dispatch(fetchData(this.props.id, this.props.request));
  }

  fetchstate() {
    let id = this.props.id;
    return this.props.store.get(id) || {
      active: false,
      id: id,
    };
  }

  render() {
    let fetchstate = this.fetchstate();
    let icon = fetchstate.active ? faActive : faRefresh;
    return (
      <button type="button" className="btn btn-outline-secondary fetch-button"
              ref={(node) => this.button = node}
              disabled={fetchstate.active}
              onClick={this.handleClick.bind(this)}>
        <FontAwesomeIcon icon={icon} spin={fetchstate.active} />
      </button>
    );
  }
}


export default FetchButton;
