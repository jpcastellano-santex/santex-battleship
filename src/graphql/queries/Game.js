import gql from 'graphql-tag';

const GetAllGames = gql`
{
  games {
    id
    owner {
      username
    }    
    createdDate
  }
}
`;

const GameBoard = gql`
query gameboard($id:  String!, $userid: String!)
{
  gameboard(id: $id, userid: $userid) {
    id
    guestBoard
    ownerBoard
    ownerId
    guestId
    turnId
  }
}
`;

const AvailableGames = gql`
query availablegames($userid: String!)
{
  availablegames(userid: $userid) {
    id
    owner {
      username
    }    
    createdDate
  }
}
`;

const MyGames = gql`
query mygames{
  mygames(userid: "5c63179ed2318f19bc307156"){
    id
    turn{
      username
      id
    }
    createdDate
    guest {
      username
      id
    }    
  }
}
`;



export {
  AvailableGames,
  GetAllGames,
  MyGames,
  GameBoard
};
