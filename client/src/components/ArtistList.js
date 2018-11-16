import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

class ArtistList extends React.Component {
    renderArtist() {
        return this.props.data.artistList.map((artist, i) => {
            return (
                <ListGroupItem key={i} className="collection-item">
                    <Link
                        to={`/artist/${artist.id}`}
                    >
                        {artist.name}
                    </Link>
                </ListGroupItem>
            )
        })
    }

    render() {
        if(this.props.data.loading) { return ( <div>loading... </div>)}
        return (
            <ListGroup className="collection">{this.renderArtist()}</ListGroup>
        )
    }
}


const query = gql`
  {
    artistList{
      id
      name
    }
  }
`;

export default  graphql(query)(ArtistList);