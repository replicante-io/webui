'use strict';
//@flow


import { Component } from 'react';
import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import fasActive from '@fortawesome/fontawesome-free-solid/faCircleNotch';
import fasCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import fasRefresh from '@fortawesome/fontawesome-free-solid/faRedoAlt';
import fasTimes from '@fortawesome/fontawesome-free-solid/faTimes';

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
      error: null,
      id: id,
      success: false,
    };
  }

  render() {
    let fetchstate = this.fetchstate();
    let icon = fetchstate.active ? fasActive : fasRefresh;
    let style = 'secondary';
    let spin = fetchstate.active;
    if (fetchstate.active && fetchstate.success) {
      style = 'success';
      icon = fasCheck;
      spin = false;
    }
    if (fetchstate.active && fetchstate.error) {
      style = 'danger';
      icon = fasTimes;
      spin = false;
    }

    let btnStyle = `btn btn-outline-${style} fetch-button`;
    return (
      <button type="button" className={btnStyle}
              ref={(node) => this.button = node}
              disabled={fetchstate.active}
              onClick={this.handleClick.bind(this)}>
        <FontAwesomeIcon icon={icon} spin={spin} />
      </button>
    );
  }
}


export default FetchButton;
