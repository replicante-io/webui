'use strict';
//@flow

import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import type { OrchestratorAction } from '../action';
import type { OrchestratorActionsSearchStore } from '../store';
import type { ClusterInfoStore } from '../store';

import { defaultOrchestratorActionsStore } from '../store';
import { saveOrchestratorActionsFilters } from '../action';
import { searchOrchestratorActions } from '../action';
import OrchestratorActionView from './orchestrator-action-view';


type Props = {
  dispatch: any,
  id: string,
  match: any,
  actions: OrchestratorAction[],
  search: OrchestratorActionsSearchStore,
};
export class InnerOrchestratorActions extends React.Component<Props> {
  render() {
    let root = `${this.props.match.path}`;
    if (root.endsWith('/')) {
      root = root.substring(0, root.length - 1);
    }
    const action_view = `${root}/:action`;

    return (
      <div className="actions-container">
        <div className="actions-list">
          {this.renderSearchBar()}
          {this.renderActionsTable()}
          <Route path={action_view} component={OrchestratorActionView} />
        </div>
      </div>
    );
  }

  renderActionsTable() {
    let rows = [];
    if (this.props.search.searching) {
      rows = [
        <tr>
          <td colspan="5" className="no-actions">
            Searching for actions
          </td>
        </tr>
      ];

    } else if (this.props.actions.length) {
      let root = `${this.props.match.url}`;
      if (root.endsWith('/')) {
        root = root.substring(0, root.length - 1);
      }
      rows = this.props.actions.map((action) => {
        const url = `${root}/${action.action_id}`;
        return (
          <tr key={action.action_id}>
            <td>
              <NavLink to={url}>{action.created_ts}</NavLink>
            </td>
            <td>
              <NavLink to={url}>{action.finished_ts || "-"}</NavLink>
            </td>
            <td>
              <NavLink to={url}>{action.kind}</NavLink>
            </td>
            <td>
              <NavLink to={url}>{action.state}</NavLink>
            </td>
          </tr>
        );
      });

    } else {
      rows = [
        <tr>
          <td colspan="5" className="no-actions">
            Search for actions with the controls above
          </td>
        </tr>
      ];
    }

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Started At</th>
            <th>Finished At</th>
            <th>Action Kind</th>
            <th>Action State</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }

  renderSearchBar() {
    let time_range = [this.props.search.from, this.props.search.until];
    return (
      <div className="actions-search">
        <div className="search-fields">
          <DateTimeRangePicker
            clearIcon={null}
            disabled={this.props.search.searching}
            onChange={(range) => this.setSearchTimeRange(range)}
            value={time_range}
          />
          <input
            className="pad-left"
            disabled={this.props.search.searching}
            onChange={(event) => this.setSearchActionKind(event.target.value)}
            placeholder="Action Kind"
            type="text"
            value={this.props.search.action_kind}
          />
          <input
            className="pad-left"
            disabled={this.props.search.searching}
            onChange={(event) => this.setSearchActionState(event.target.value)}
            placeholder="Action State"
            type="text"
            value={this.props.search.action_state}
          />
        </div>
        <div className="search-btn">
          <button
            disabled={this.props.search.searching}
            className="btn btn-primary"
            onClick={() => this.search()}
            type="button"
          >
            Search &nbsp;
            <FontAwesomeIcon 
              flip="horizontal"
              icon={faSearch}
            />
          </button>
        </div>
      </div>
    );
  }

  search() {
    this.props.dispatch(searchOrchestratorActions(this.props.id, this.props.search));
  }

  setSearchActionKind(text: string) {
    let search = {...this.props.search};
    search.action_kind = text;
    this.props.dispatch(saveOrchestratorActionsFilters(this.props.id, search));
  }

  setSearchActionState(text: string) {
    let search = {...this.props.search};
    search.action_state = text;
    this.props.dispatch(saveOrchestratorActionsFilters(this.props.id, search));
  }

  setSearchNodeId(text: string) {
    let search = {...this.props.search};
    search.node_id = text;
    this.props.dispatch(saveOrchestratorActionsFilters(this.props.id, search));
  }

  setSearchTimeRange(range: Date[]) {
    let search = {...this.props.search};
    search.from = range[0];
    search.until = range[1];
    this.props.dispatch(saveOrchestratorActionsFilters(this.props.id, search));
  }
}

/** Map the redux state to properties passed to Button. */
type PartialState = {
  clusterinfo: ClusterInfoStore,
}
export function mapStateToProps(state: PartialState, props: {match: any}) {
  const id = props.match.params.name;
  let actions = state.clusterinfo.orchestrator_actions[id];
  if (!actions) {
    actions = defaultOrchestratorActionsStore();
  }
  return {
    id,
    actions: actions.actions,
    search: actions.search,
  };
}


const OrchestratorActions = connect(mapStateToProps, null)(InnerOrchestratorActions);
export default OrchestratorActions;
