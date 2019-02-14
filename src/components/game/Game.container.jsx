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
import { GameClicked } from '../../graphql/subscriptions/Game';
import { CellClick } from '../../graphql/mutations/Game';

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

    this.state = { otherBoard: MOCK_GAME_MATRIX, myBoard: MOCK_GAME_MATRIX };
  }

  componentDidMount() {
    this.getGame();
    this.subscribeToGameClick();
  }


  subscribeToGameClick = () => {
    this.props.client.subscribe({
      query: GameClicked,
      fetchPolicy: "no-cache"
    }).subscribe(response => {
      var isOwner = response.data.gameClicked.ownerId === loggeduserid;
      var boardname = isOwner ? 'guestBoard' : 'ownerBoard';
      var myboardname = !isOwner ? 'guestBoard' : 'ownerBoard';
      var board = response.data.gameClicked[boardname];
      var myBoard = response.data.gameClicked[myboardname];
      var turn = response.data.gameClicked.turnId;
      this.setState({
        otherBoard: board,
        myBoard: myBoard,
        turn: turn
      });
    });
  }

  getGame() {
    // console.log(this.props.match.params.id, this.props);
    this.props.client.query({
      query: GameBoard,
      variables: { userid: loggeduserid, id: this.props.match.params.id }
    }).then(response => {
      var isOwner = response.data.gameboard.ownerId === loggeduserid;
      var boardname = isOwner ? 'guestBoard' : 'ownerBoard';
      var myboardname = !isOwner ? 'guestBoard' : 'ownerBoard';
      var board = response.data.gameboard[boardname];
      var myBoard = response.data.gameboard[myboardname];
      var turn = response.data.gameboard.turnId;
      this.setState({
        otherBoard: board,
        myBoard: myBoard,
        turn: turn
      });
    })
  }

  onClick = (x, y, newStatus) => {
    this.props.client.mutate({
      mutation: CellClick,
      variables: {
        userid: loggeduserid,
        id: this.props.match.params.id,
        col: y,
        row: x
      }
    }).then(response => {
      // console.log(response);
      // this.props.history.push(`/game/${response.data.joingame.id}`);
    });
    // TODO: Make a mutation to modify Game's current status based on the current action
    // console.log('$ x, y, newStatus', x, y, newStatus); // eslint-disable-line
  };

  surrenderGame = () => {
    // TODO: Make a mutation to modify Game's current status based on the current action
    console.log('$ Player surrenders !'); // eslint-disable-line
  };

  render() {
    console.log(this.state.turn, loggeduserid);
    return (
      <Row className="game">
        <Col xs={{ size: 8, offset: 2 }}>
          <h1>Opponent</h1>
          <Board
            matrix={this.state.otherBoard}
            onClick={this.onClick}
            turn={this.state.turn}
            disabled={this.state.turn != loggeduserid}
          />
          <h1>MyBoard</h1>
          <Board
            matrix={this.state.myBoard}
            disabled={true}
            myBoard={true}
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
