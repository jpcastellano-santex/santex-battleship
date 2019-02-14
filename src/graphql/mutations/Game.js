import gql from 'graphql-tag';

const JoinGame = gql`
mutation joingame($id: String!, $userid: String!)
{
  joingame(id: $id, userid: $userid) {
    id
  }
}
`;

const CreateGame = gql`
mutation addGame($userid: String!)
{
  addGame(userid: $userid) {
    id
  }
}
`;

const CellClick = gql`
mutation cellclick($id: String!, $userid: String!, $row: Int!, $col: Int!)
{
  cellclick(id: $id, userid: $userid, row: $row, col: $col) {
    id
  }
}
`;

export {
  JoinGame,
  CreateGame,
  CellClick
};
