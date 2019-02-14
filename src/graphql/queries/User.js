import gql from 'graphql-tag';

const UserLogin = gql`
query login($username:String!, $password:String!){
    login(username:$username, password:$password){
        username
        id
      }
}
`;

export {
    UserLogin
};
