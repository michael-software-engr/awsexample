import React from 'react';
import PropTypes from 'prop-types';

import DesktopContainer from './DesktopContainer';
import MobileContainer from './MobileContainer';

const ResponsiveContainer = ({ routes, onLinkClick, children }) => (
  <div>
    <DesktopContainer routes={routes} onLinkClick={onLinkClick}>
      {children}
    </DesktopContainer>

    <MobileContainer routes={routes} onLinkClick={onLinkClick}>
      {children}
    </MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  routes: PropTypes.shape().isRequired,
  onLinkClick: PropTypes.func.isRequired,
  children: PropTypes.node
};

ResponsiveContainer.defaultProps = {
  children: null
};

const Layout = ({ routes, onLinkClick, children }) => (
  <ResponsiveContainer
    routes={routes}
    onLinkClick={onLinkClick}
  >
    {children}
  </ResponsiveContainer>
);

Layout.propTypes = {
  routes: PropTypes.shape().isRequired,
  onLinkClick: PropTypes.func.isRequired,
  children: PropTypes.node
};

Layout.defaultProps = {
  children: null
};

export default Layout;
