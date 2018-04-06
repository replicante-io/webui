'use strict';
//@flow


import { Component } from 'react';
import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faActive from '@fortawesome/fontawesome-free-solid/faCircleNotch';
import faRefresh from '@fortawesome/fontawesome-free-solid/faRedoAlt';

import type { FetchStore } from './store';


type Props = {
  dispatch: any,
  id: String,
  store: FetchStore,
}


// While refreshing: <i className="fas fa-circle-notch"></i>
class FetchButton extends React.Component<Props> {
  handleClick() {
    this.props.dispatch({type: 'FETCH_DATA', id: this.props.id});
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
              disabled={fetchstate.active} onClick={this.handleClick.bind(this)}>
        <FontAwesomeIcon icon={icon} spin={fetchstate.active} />
      </button>
    );
  }
}


export default FetchButton;
