import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fetch from 'cross-fetch';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import Layout from '../layout/Index';
import UnderConstruction from '../underConstruction/Index';

import defaultRoutes from '../../routes';
import { unconnected } from '../../redux/todos/slice';

const buildIsActive = (routes, activePath = null) => (
  Object.keys(routes.byPath).reduce((memo, path) => ({
    ...memo,
    [path]: activePath ? (activePath === path) : routes.byPath[path].defaultIsActive
  }), {})
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: {
        ...defaultRoutes,
        isActive: buildIsActive(defaultRoutes, window.location.pathname)
      }
    };
  }

  componentDidMount() {
    this.props.connectedActionTodosRequest();
    fetch('/todos').then((response) => response.json()).then((data) => {
      this.props.connectedActionTodosSuccess({ data });
    }).catch((response) => {
      console.error(response);
      this.props.connectedActionTodosFailure({ response });
    });
  }

  onLinkClick = (event) => {
    // event.preventDefault();
    const { target } = event;

    this.setState((state) => ({
      routes: {
        ...state.routes,
        isActive: buildIsActive(state.routes, target.pathname)
      }
    }));
  }

  render() {
    const { routes } = this.state;

    return (
      <Router>
        <Switch>
          {
            routes.all.map(({ name, path, Component }) => (
              <Route exact path={path} key={name}>
                <Layout routes={routes} onLinkClick={this.onLinkClick}>
                  {Component}
                </Layout>
              </Route>
            ))
          }

          <Route path="/">
            <Layout routes={routes} onLinkClick={this.onLinkClick}>
              <UnderConstruction invalidPath />
            </Layout>
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  connectedActionTodosRequest: PropTypes.func.isRequired,
  connectedActionTodosSuccess: PropTypes.func.isRequired,
  connectedActionTodosFailure: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    connectedActionTodosRequest: unconnected.request,
    connectedActionTodosSuccess: unconnected.success,
    connectedActionTodosFailure: unconnected.failure
  }
)(App);
