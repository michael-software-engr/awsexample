import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  Container,
  Table,
  Button,
  Divider
} from 'semantic-ui-react';

import { unconnected } from '../../redux/todos/slice';

class Todos extends React.Component {
  handleDone = (event) => {
    event.preventDefault();
    const { id } = event.target;
    this.props.connectedActionTodosToggleDone({ id });
  }

  handleCancel = (event) => {
    event.preventDefault();
    const { id } = event.target;
    this.props.connectedActionTodosToggleCancel({ id });
  }

  handleReset = (event) => {
    event.preventDefault();
    const { id } = event.target;
    this.props.connectedActionTodosResetStatus({ id });
  }

  render() {
    const { todos } = this.props;

    return (
      todos.length > 0 && (
        <Container>
          <Divider hidden />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Deadline</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                todos.map(({
                  id, description, deadline, done, canceled
                }) => {
                  if (done && canceled) {
                    throw Error(
                      `... "done" and "canceled" status should not be both true, todo: "${id}" "${description}"`
                    );
                  }

                  return (
                    <Table.Row positive={done} negative={canceled} key={id}>
                      <Table.Cell>{description}</Table.Cell>
                      <Table.Cell>{new Date(deadline).toLocaleDateString()}</Table.Cell>
                      <Table.Cell>
                        <Button positive={done} onClick={this.handleDone} id={id}>
                          Done
                        </Button>
                        <Button negative={canceled} onClick={this.handleCancel} id={id}>
                          Cancel
                        </Button>
                        <Button onClick={this.handleReset} id={id}>
                          Reset
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              }
            </Table.Body>
          </Table>
          <Divider hidden />
        </Container>
      )
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape()),
  connectedActionTodosToggleDone: PropTypes.func.isRequired,
  connectedActionTodosToggleCancel: PropTypes.func.isRequired,
  connectedActionTodosResetStatus: PropTypes.func.isRequired
};

Todos.defaultProps = {
  todos: []
};

const mapStateToProps = (state) => ({
  todos: state.todos.data
});

export default connect(mapStateToProps, {
  connectedActionTodosToggleDone: unconnected.toggleDone,
  connectedActionTodosToggleCancel: unconnected.toggleCancel,
  connectedActionTodosResetStatus: unconnected.resetStatus
})(Todos);

// export default class Todos extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {

//   }
// }

// import { Segment, Message, Icon } from 'semantic-ui-react';

// import { MobileContext } from '../../lib/contexts';

// export default function UnderConstruction({ title, invalidPath }) {
//   if (!invalidPath && !title) {
//     throw Error('... ERROR: must supply "title" prop.');
//   }

//   const context = React.useContext(MobileContext) || {};
//   const { mobile } = context;

//   const size = mobile ? 'large' : 'massive';
//   const sideSpace = mobile ? '7rem' : '15rem';
//   const heading = invalidPath ? 'Uh oh...' : 'Coming soon';
//   const msg = invalidPath ? 'Invalid path' : `"${title}" page under construction`;
//   const icon = invalidPath ? 'frown outline' : 'cog';
//   const isLoading = !invalidPath;
//   const isNegative = invalidPath;

//   return (
//     <Segment
//       vertical
//       raised
//       textAlign="center"
//       style={{ paddingLeft: sideSpace, paddingRight: sideSpace }}
//     >
//       <Message
//         icon
//         compact
//         negative={isNegative}
//         size={size}
//         style={{ margin: '7rem 0' }}
//       >
//         <Icon name={icon} loading={isLoading} />
//         <Message.Content>
//           <Message.Header>{heading}</Message.Header>
//           {msg}
//         </Message.Content>
//       </Message>
//     </Segment>
//   );
// }

// UnderConstruction.propTypes = {
//   title: PropTypes.string,
//   invalidPath: PropTypes.bool
// };

// UnderConstruction.defaultProps = {
//   title: null,
//   invalidPath: false
// };
