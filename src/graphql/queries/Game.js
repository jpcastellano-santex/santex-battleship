import gql from 'graphql-tag';
// const FetchCurrentGames = gql``;
// const FetchMyGames = gql``;
// const FetchGameData = gql`
//   query FetchGameData(id: String!) {}
// `;

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

const MyGames = gql`
query mygames{
  mygames(userid: "5c63179ed2318f19bc307156"){
    id
    turn{
      username
    }
    createdDate
  }
}
`;

const SubscriptionAdded = gql`
subscription onGameAdded {
  gameAdded{
    id
    owner {
      username
    }    
    createdDate
  }
}
`;

// const Subscription = gql`
// subscription onUserAdded {
//   userAdded{
//     username
//   }
// }
// `;

export {
  // FetchCurrentGames,
  // FetchMyGames,
  // FetchGameData,
  GetAllGames,
  SubscriptionAdded,
  MyGames
};
