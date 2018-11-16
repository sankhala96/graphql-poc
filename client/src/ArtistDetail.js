import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Jumbotron, ListGroupItem } from 'react-bootstrap'

class ArtistDetails extends React.Component {
    onComponentDidMount() {
        let id = this.props.match.params.id;

        const params = { id: id }
    }
    renderSongs() {
        return this.props.data.artist.songs.map((song, i) => {
            return (
                <ListGroupItem key={i} className="collection-item">
                    <p>{song.title}</p>
                    <p>{song.album}</p>
                </ListGroupItem>
            )
        })
    }
    render() {
        if (this.props.data.loading) { return (<div>loading... </div>) }
        console.log(this.props.data)
        let data = this.props.data.artist;
        return (
            <div style={{marginTop: "80px"}}>
                <Jumbotron>
                    <h1>{data.name}</h1>
                    {this.renderSongs()}
                </Jumbotron>
            </div>
        )
    }
}

const query = gql`
  query Artist($id: String) {
    artist(id: $id){
        id
        name
        songs {
            title
            album
        }
    }
  }
`;

export default graphql(query, {
    options: (props) => {return { variables: { id: props.match.params.id}}}
})(ArtistDetails);