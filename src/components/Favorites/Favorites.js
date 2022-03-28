import React, { Component } from 'react';
import store from '../Redux/Store';
import './Favorites.css';

export default class Favorites extends Component {
    state = {
        searchLine: '',
        movies: [],
        listId: '',
        disabledInput: false,
        showButton: 'block',
        showLink: 'none'
    };

    componentDidMount() {
        store.subscribe(() => {
            const state = store.getState();
            this.setState({ 
                movies: state.favouriteMovies
            })
        })
    };

    deleteFromFavorites = (item) => {
        store.dispatch({
            type: 'DELETE_MOVIES',
            payload: {
                imdbID: item
            }
        })
    };

    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    };

    favoritesSubmitHandler = (e) => {
        e.preventDefault();
        const favoritesInfo = {
            "title": this.state.searchLine,
            "movies": this.state.movies.map((item) => {
                return item.imdbID})
        };
        fetch('https://acb-api.algoritmika.org/api/movies/list', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
              },
            body: JSON.stringify(favoritesInfo)
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ 
                listId: `http://localhost:3000/list/${data.id}`,
                disabledInput: true, 
                showButton: 'none',
                showLink: 'inline-block'
            });
        })
        .catch((err) => console.log(err));
    };
 
    render() { 
        const { searchLine, listId, disabledInput, showButton, showLink } = this.state;

        return (
            <div className="favorites">
                <form className="favorites__form" onSubmit={this.favoritesSubmitHandler}>
                
                    <input
                        value={searchLine}
                        type="text"
                        className="favorites__name" 
                        placeholder="Введите название фильма"
                        onChange={this.searchLineChangeHandler}
                        disabled={disabledInput}
                    />
                    <ul className="favorites__list">
                        {this.state.movies.map((item) => {
                            return <li key={item.imdbID}>{item.Title} ({item.Year})
                                <span>
                                    <button 
                                    key={item.imdbID} 
                                    type="button" 
                                    className="favorites__delete" 
                                    onClick={() => this.deleteFromFavorites(item.imdbID)}
                                    disabled={disabledInput}
                                >
                                    &#10008;
                                    </button>
                                </span>
                            </li>;
                        })}
                    </ul>
                    <button 
                        type="submit" 
                        className="favorites__save" 
                        disabled={!searchLine}
                        style={{ display: showButton }}
                    >
                        Сохранить список
                    </button>
                    <a style={{ display: showLink }} className="favoritesLink" href={listId}>Перейти к списку</a>
                </form>
            </div>
        );
    }
}