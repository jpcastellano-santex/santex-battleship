// Package dependencies
import ApolloClient from 'apollo-boost';

// Local dependencies
import Environment from '../lib/environment';


// Pass your GraphQL endpoint to uri
export const client = new ApolloClient({ uri: `${Environment.get('API_GATEWAY')}/graphql` });
