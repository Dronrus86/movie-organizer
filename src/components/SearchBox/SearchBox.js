import React, { Component } from 'react';
import store from '../Redux/Store';
import './SearchBox.css';

export default class SearchBox extends Component {
    state = {
        searchLine: ''
    };

    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    };

    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        fetch(`http://www.omdbapi.com/?s=${this.state.searchLine}&apikey=103381a1 `)
        .then(response => response.json())
        .then(data => {
            if(!data.Search) {
                alert('RESULT: No movies found on request');
                return;
            }
            const movieList = data.Search;
            store.dispatch({
                type: 'SHOW_MOVIES',
                payload: {
                    movieList: movieList
                }
            });
        })
        .catch((err) => console.log(err));
    };

    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                    Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}
