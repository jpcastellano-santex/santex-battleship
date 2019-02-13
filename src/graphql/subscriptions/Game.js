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
  }
}
`;

export {
  GameAdded,
  GameJoined
};
