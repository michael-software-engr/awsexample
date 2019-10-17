import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Segment,
  Header,
  Icon
} from 'semantic-ui-react';

import { MobileContext } from '../../lib/contexts';

const HomepageHeading = () => {
  const context = React.useContext(MobileContext) || {};
  const { mobile } = context;

  const vertSpace = mobile ? 110 : 100;
  return (
    <Segment
      vertical
      textAlign="center"
      style={{
        backgroundColor: 'black',
      }}
    >
      <Header
        as="h1"
        content="Imagine-a-Company"
        inverted
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: vertSpace
          // marginTop: mobile ? '1.5em' : '3em'
        }}
      />
      <Header
        as="h2"
        content="Do whatever you want when you want to."
        inverted
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: mobile ? '0.5em' : '1.5em'
        }}
      />
      <Button as="div" primary size="huge" style={{ marginBottom: vertSpace }}>
        Get Started
        <Icon name="right arrow" />
      </Button>
    </Segment>
  );
};

HomepageHeading.contextTypes = {
  mobile: PropTypes.bool
};

// HomepageHeading.propTypes = {
// };

// HomepageHeading.defaultProps = {
// };

export default HomepageHeading;
