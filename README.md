# Santex battleship

## Local development

1. Install dependencies with `yarn install`
2. Run server with `yarn start`
3. Log with user: \
	username: `user1`\
	password: `user1p`\
	\
	username: `user2`\
	password: `user2p`
	
### Available Features
1. Login - Logout
2. Create game
3. Join game
4. Surrender game

### Create new user with graphql
```javascript
mutation {
  addUser(username:"stringNewUser", password:"stringNewPassword"){
    username
  }
}
```
