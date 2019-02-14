import gql from 'graphql-tag';


const GameAdded = gql`
subscription onGameAdded {
  gameAdded{
    id
    owner {
      username
      id
    }    
    guest {
      username
      id
    }    
    createdDate
  }
}
`;

const GameClicked = gql`
subscription onGameClicked {
  gameClicked{
    id
    turnId
    ownerId
    ownerBoard
    guestBoard
  }
}
`;

const GameJoined = gql`
subscription onGameJoined {
  gameJoined{
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
    startDate
  }
}
`;

export {
  GameAdded,
  GameJoined,
  GameClicked
};
