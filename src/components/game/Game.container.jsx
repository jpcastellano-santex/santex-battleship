// Package dependencies
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { Link } from 'react-router-dom';

import Board from '../board/Board.component';
import SurrenderModal from '../surrender_modal/SurrenderModal.component';
import { GameBoard } from '../../graphql/queries/Game';
import { GameClicked, GameEnd } from '../../graphql/subscriptions/Game';
import { CellClick, SurrenderGame } from '../../graphql/mutations/Game';

// Styles
import './Game.sass';

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

    this.state = { otherBoard: MOCK_GAME_MATRIX, myBoard: MOCK_GAME_MATRIX, winner: null };
  }
  subscribeObjectGameEnd = {}
  subscribeObjectGameClick = {}

  componentDidMount() {
    this.getGame();
    this.subscribeToGameClick();
    this.subscribeToGameEnd();
  }

  componentWillUnmount() {
    this.subscribeObjectGameClick.unsubscribe();
    this.subscribeObjectGameEnd.unsubscribe();
  }

  subscribeToGameEnd = () => {
    this.subscribeObjectGameEnd = this.props.client.subscribe({
      query: GameEnd,
      fetchPolicy: "no-cache"
    }).subscribe(response => {
      if (this.props.match.params.id === response.data.gameEnd.id) {
        this.setState({
          winner: response.data.gameEnd.winnerId
        });
      }
    });
  }

  subscribeToGameClick = () => {
    this.subscribeObjectGameClick = this.props.client.subscribe({
      query: GameClicked,
      fetchPolicy: "no-cache"
    }).subscribe(response => {
      if (this.props.match.params.id === response.data.gameClicked.id) {
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
      }
    });
  }

  getGame() {
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
      var winner = response.data.gameboard.winnerId;
      this.setState({
        otherBoard: board,
        myBoard: myBoard,
        turn: turn,
        winner: winner
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

    });
  };

  surrenderGame = () => {
    this.props.client.mutate({
      mutation: SurrenderGame,
      variables: {
        userid: loggeduserid,
        id: this.props.match.params.id
      }
    }).then(response => {
      this.props.history.push('/');
    });
  };

  render() {
    // if (this.state.winner) {
    //   return (
    //     <div>
    //       {(this.state.winner === loggeduserid) && <div>You won</div>}
    //       {(this.state.winner !== loggeduserid) && <div>You lost</div>}
    //       <Link to="/" >
    //         Home
    //     </Link>
    //     </div>
    //   );
    // } else {
    return (
      <Row className="game">
        {this.state.winner &&
          <div className="finishedgame">
          <h1>Game finished</h1>
            {(this.state.winner === loggeduserid) && <h2>You won</h2>}
            {(this.state.winner !== loggeduserid) && <h2>You lost</h2>}
            <Link to="/" >
              Home
               </Link></div>}
        <Col xs={{ size: 8, offset: 2 }}>
              <h1>Opponent</h1>
              <h2>turn:
            {(this.state.turn === loggeduserid) && <label>you</label>}
                {(this.state.turn !== loggeduserid) && <label>opponent</label>}
              </h2>
              <Board
                matrix={this.state.otherBoard}
                onClick={this.onClick}
                turn={this.state.turn}
                disabled={this.state.turn !== loggeduserid}
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
        // }
      }
    }
    
    export default withApollo((withRouter(Game)));
