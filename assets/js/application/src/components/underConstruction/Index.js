import React from 'react';
import PropTypes from 'prop-types';

import { Segment, Message, Icon } from 'semantic-ui-react';

import { MobileContext } from '../../lib/contexts';

export default function UnderConstruction({ title, invalidPath }) {
  if (!invalidPath && !title) {
    throw Error('... ERROR: must supply "title" prop.');
  }

  const context = React.useContext(MobileContext) || {};
  const { mobile } = context;

  const size = mobile ? 'large' : 'massive';
  const sideSpace = mobile ? '7rem' : '15rem';
  const heading = invalidPath ? 'Uh oh...' : 'Coming soon';
  const msg = invalidPath ? 'Invalid path' : `"${title}" page under construction`;
  const icon = invalidPath ? 'frown outline' : 'cog';
  const isLoading = !invalidPath;
  const isNegative = invalidPath;

  return (
    <Segment
      vertical
      raised
      textAlign="center"
      style={{ paddingLeft: sideSpace, paddingRight: sideSpace }}
    >
      <Message
        icon
        compact
        negative={isNegative}
        size={size}
        style={{ margin: '7rem 0' }}
      >
        <Icon name={icon} loading={isLoading} />
        <Message.Content>
          <Message.Header>{heading}</Message.Header>
          {msg}
        </Message.Content>
      </Message>
    </Segment>
  );
}

UnderConstruction.propTypes = {
  title: PropTypes.string,
  invalidPath: PropTypes.bool
};

UnderConstruction.defaultProps = {
  title: null,
  invalidPath: false
};
