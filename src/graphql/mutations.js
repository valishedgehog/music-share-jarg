import { gql } from "apollo-boost";

export const INSERT_SONG = gql`
  mutation insertSong(
    $title: String!
    $artist: String!
    $thumbnail: String
    $duration: Float
    $url: String
  ) {
    insert_songs(
      objects: {
        title: $title
        artist: $artist
        url: $url
        thumbnail: $thumbnail
        duration: $duration
      }
    ) {
      affected_rows
    }
  }
`;

export const ADD_OR_REMOVE_FROM_QUEUE = gql`
  mutation addOrRemoveFromQueue($input: SongInput!) {
    addOrRemoveFromQueue(input: $input) @client
  }
`
