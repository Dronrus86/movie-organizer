import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import store from '../Redux/Store';
import './Movies.css';

export default class Movies extends Component {
    state = { 
        movies: []
    };

    componentDidMount() {
        store.subscribe(() => {
          const state = store.getState();
          this.setState({ 
            movies: state.movies
          });
        })
    };
    
    render() { 
        return ( 
            <ul className="movies">
                {this.state.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} />
                    </li>
                ))}
            </ul>
        );
    }
}
