const graphql = require('graphql');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const serverURL = "http://0.0.0.0:4000/"

//defining Schema here
const ArtistType = new GraphQLObjectType({
    name: 'Artist',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        songs: {
            type: new GraphQLList(SongType),
            resolve(parentValue, args) {
                console.log(parentValue)
                return axios.get(`${serverURL}artist/id=${parentValue.id}/songs/?artistID=${parentValue.id}`)
                    .then(res => res.data)
            }
        }
    })
});

const SongType = new GraphQLObjectType({
    name: 'Song',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        duration: { type: GraphQLInt },
        album: { type: GraphQLString },
        artist: {
            type: ArtistType,
            resolve(parentValue, args) {
                return axios.get(`${serverURL}artist/${parentValue.artistID}`)
                    .then(res => res.data)
            }
        }
    })
})

//Defining Root Query i.e. entery point for GraphQL
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        artist: {
            type: ArtistType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`${serverURL}artist/${args.id}`)
                    .then(res => res.data);
            }
        },
        artistList: {
            type: new GraphQLList(ArtistType),
            resolve(parentValue, args) {
                return axios.get(`${serverURL}artist`)
                    .then(res => res.data);
            }
        },
        song: {
            type: SongType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`${serverURL}songs/${args.id}`)
                    .then(res => res.data);
            }
        },
        songsList: {
            type: new GraphQLList(SongType),
            resolve(parentValue, args) {
                return axios.get(`${serverURL}songs`)
                    .then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});