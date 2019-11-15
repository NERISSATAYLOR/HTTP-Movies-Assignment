import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
    id: "",
    title: '',
    director: '',
    metascore: "",
    stars: []
};
const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);
    const changeHandler = event => {
        event.persist();
        let value = event.target.value;
        if (event.target.name === "metascore") {
            value = parseInt(value, 10);
        }
        setMovie({ ...movie, [event.target.name]: event.target.value });
    };
    useEffect(() => {
        if (props.movies.length > 0) {
            const newMovie = props.movies.find(
                thing => `${thing.id}` === props.match.params.id
            );
            console.log(newMovie);
            setMovie(newMovie);
        }
    }, [props.movies, props.match.params.id]);

    const handleSubmit = event => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(response => {
                console.log(response);
                props.UpdateMovies(response.data);
                props.history.push("/movie-list");
            })
            .catch(err => console.log(err));
    }
    if (props.movies.length === 0) {
        return <h2>Loading data ...</h2>;
    }
    return (
        <div>
            <h2>
                Update Movie
                    </h2>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    name="id" onChange={changeHandler} placeholder="id" value={movie.id} />
                <input type="text"
                    name="title" onChange={changeHandler} placeholder="title" value={movie.title} />
                <input type="text"
                    name="director" onChange={changeHandler} placeholder="director" value={movie.director} />
                <input type="number"
                    name="metascore" onChange={changeHandler} placeholder="metascore" value={movie.metascore} />
                <button>Update</button>


            </form>
        </div>
    )

}

export default UpdateMovie;