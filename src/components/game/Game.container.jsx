// Package dependencies
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { graphql, withApollo } from 'react-apollo';

// Local dependencies
import { putShipsOnCells } from '../../helpers/game/ships';
import { ships as gameShips, } from '../../constants';
import Board from '../board/Board.component';
import SurrenderModal from '../surrender_modal/SurrenderModal.component';
import { GameBoard } from '../../graphql/queries/Game';

const loggeduserid = localStorage.getItem('userid');

const MOCK_GAME_MATRIX = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];


class Game extends Component {
  constructor(props) {
    super(props);

    this.state = { otherBoard: MOCK_GAME_MATRIX };
  }

  componentDidMount() {
    this.getGame();
  }

  getGame() {
    // console.log(this.props.match.params.id, this.props);
    this.props.client.query({
      query: GameBoard,
      variables: { userid: loggeduserid, id: this.props.match.params.id }
    }).then(response => {
      var board = response.data.gameboard.ownerBoard;
      this.setState({
        otherBoard: board
      });
      console.log(board);
    })
  }

  onClick = (x, y, newStatus) => {
    // TODO: Make a mutation to modify Game's current status based on the current action
    console.log('$ x, y, newStatus', x, y, newStatus); // eslint-disable-line
  };

  surrenderGame = () => {
    // TODO: Make a mutation to modify Game's current status based on the current action
    console.log('$ Player surrenders !'); // eslint-disable-line
  };

  render() {
    return (
      <Row className="game">
        <Col xs={{ size: 8, offset: 2 }}>
          <Board
            matrix={this.state.otherBoard}
            onClick={this.onClick}
          />
        </Col>
        <Col xs={{ size: 8, offset: 2 }} className="mt-3 text-center">
          <SurrenderModal onClick={this.surrenderGame} />
        </Col>
      </Row>
    );
  }
}

export default withApollo((withRouter(Game)));
