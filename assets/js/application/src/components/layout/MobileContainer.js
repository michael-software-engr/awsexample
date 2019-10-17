import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar
} from 'semantic-ui-react';

import Footer from './Footer';

import { MobileContext } from '../../lib/contexts';

export default class MobileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlePusherClick = () => {
    const { sidebarOpened } = this.state;

    if (sidebarOpened) this.setState({ sidebarOpened: false });
  };

  handleToggle = () => {
    this.setState((state) => ({ sidebarOpened: !state.sidebarOpened }));
  }

  render() {
    const { routes, onLinkClick, children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="uncover"
            inverted
            vertical
            visible={sidebarOpened}
          >
            {
              routes.left.map(({
                name, path, text
              }) => (
                <Menu.Item
                  as={Link}
                  to={path}
                  active={routes.isActive[path]}
                  onClick={onLinkClick}
                  key={name}
                >
                  {text}
                </Menu.Item>
              ))
            }
          </Sidebar>

          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: '100vh' }}
          >
            <Segment
              inverted
              textAlign="center"
              style={{
                // minHeight: 350,
                padding: '1em 0em'
              }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Menu.Item position="right">
                    {
                      routes.right.map(({ name, path, text }) => (
                        <Button
                          as={Link}
                          to={path}

                          // Needed to remove active from left routes
                          onClick={onLinkClick}

                          key={name}

                          inverted
                          style={{ marginLeft: '0.5em' }}
                        >
                          {text}
                        </Button>
                      ))
                    }
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>

            <MobileContext.Provider value={{ mobile: true }}>
              {children}
            </MobileContext.Provider>

            <Footer />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  routes: PropTypes.shape().isRequired,
  onLinkClick: PropTypes.func.isRequired,
  children: PropTypes.node
};

MobileContainer.defaultProps = {
  children: null
};
