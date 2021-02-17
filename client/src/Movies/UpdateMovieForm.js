import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
}

const UpdateMovieForm = props => {
    const { push, goBack } = useHistory();
    const { id } = useParams();
    const [movie,setMovie] = useState(initialMovie);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
         .then(res => {console.log(`UPDATEMOVIEFORM Movie data:`, res)
          setMovie(res.data)
          })
         .catch(err => console.log(err))
  }, [id]);

  const changeHandler = e => {
    e.persist();
    setMovie({
        ...movie, [e.target.name]:e.target.value
    });
  };
  const handleSubmit = e =>{
    e.prevetDefault();
    axios.put(`http://localhost:5000/api/movies/${id}`, movie)
         .then(res => {console.log(`HandleSubmit:res:`, res)
         props.setMovie(res.data)
         push('/');    
         })
         .catch(err => {console.log(err)})
  };

  return (
    <div>
    <h2>Update Movie</h2>
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
          <input
          type='text'
          name='title'
          onChange={changeHandler}
          placeholder='Title'
          value={movie.title}
          />

      <label>Director:</label>
          <input
          type='number'
          name='director'
          onChange={changeHandler}
          placeholder='Director'
          value={movie.director}
          />

      <label>Metascore:</label>
      <input
        type= 'number'
        name='metaScore'
        onChange={changeHandler}
        placeholder='MetaScore'
        value={movie.metaScore}
      />
      <label>Stars:</label>
      <input
        type='string'
        name='stars'
        onChange={changeHandler}
        placeholder='Stars'
        value={movie.stars}
      />

      <button>Update</button>

    </form>
  </div>
  );
}
export default UpdateMovieForm;