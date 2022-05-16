'use strict';

import React from 'react';
import ReactJson from 'react-json-view';
import { connect } from 'react-redux';

import { NoDataIcon } from '../icons';
import { fetchOrchestrateReport } from './action';

//import type { ClusterInfoStore } from './store';
//import type { NodeInfo } from './action';


type Props = {
  report: ?Object,
  dispatch: any,
  id: string,
};
export class InnerOrchestrateReport extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.report) {
      this.props.dispatch(fetchOrchestrateReport(this.props.id));
    }
  }

  renderData(report: Object) {
    return (<ReactJson collapsed={2} name={false} src={report} />);
  }

  render() {
    if (this.props.report) {
      return this.renderData(this.props.report);
    }
    return (
      <div className="text-center">
        <NoDataIcon />
        No information available. <br />
        If nothing shows up the cluster may not exist.
      </div>
    );
  }
}

/** Map the redux state to properties passed to Button. */
type PartialState = {
  clusterinfo: ClusterInfoStore,
}
export function mapStateToProps(state: PartialState, props: {match: any}) {
  const id = props.match.params.name;
  return {
    report: state.clusterinfo.orchestrate_reports[id],
    id: id,
  };
}


const OrchestrateReport = connect(mapStateToProps, null)(InnerOrchestrateReport);
export default OrchestrateReport;
