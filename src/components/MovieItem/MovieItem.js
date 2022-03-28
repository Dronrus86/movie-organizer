import React, { Component } from 'react';
import store from '../Redux/Store';
import './MovieItem.css';

export default class MovieItem extends Component {
    state = { 
        movies: this.props
    };

    addToFavorites = () => {
        store.dispatch({
            type: 'ADD_MOVIES',
            payload: {
                myFavouriteMovies: this.props
            }
        })
    };

    render() {
        const { Title, Year, Poster } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button onClick={this.addToFavorites} type="button" className="movie-item__add-button">Добавить в список</button>
                </div>
            </article>
        );
    }
}
