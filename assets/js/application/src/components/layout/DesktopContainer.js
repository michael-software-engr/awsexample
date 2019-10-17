import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility
} from 'semantic-ui-react';

import Footer from './Footer';

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar,
   however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
export default class DesktopContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  hideFixedMenu = () => this.setState({ fixed: false });

  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { routes, onLinkClick, children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{
              // minHeight: 700,
              padding: '1em 0em'
            }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
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

                <Menu.Item position="right">
                  {
                    routes.right.map(({ name, path, text }) => (
                      <Button
                        as={Link}
                        to={path}
                        // Needed to remove active from left routes
                        onClick={onLinkClick}

                        key={name}

                        inverted={!fixed}
                        primary={fixed}
                        style={{ marginLeft: '0.5em' }}
                      >
                        {text}
                      </Button>
                    ))
                  }
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}

        <Footer />
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  routes: PropTypes.shape().isRequired,
  onLinkClick: PropTypes.func.isRequired,
  children: PropTypes.node
};

DesktopContainer.defaultProps = {
  children: null
};
