import React, { Component } from 'react';
import './ListPage.css';

export default class ListPage extends Component {
    state = {
        movies: []
    };

    componentDidMount() {
        const id = this.props.match.params.id;

        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({ title: data.title });
            const description = [];
            data.movies.forEach(element => {
                fetch(`http://www.omdbapi.com/?i=${element}&apikey=640ec5e5`)
                .then(res => res.json())
                .then(data => {
                    description.push(data);
                    this.setState({ movies: description })
                });
            })
        })
        .catch((err) => console.log(err));
    };

    render() { 
        const { title } = this.state;
        return (
            <div className="list-page">
                <h1 className="list-page__title">{title}</h1>
                <ul className="list__favorites">
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href={'https://www.imdb.com/title/' + item.imdbID} target="_blank" rel="noopener noreferrer">{item.Title} ({item.Year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}