import { useState } from "react"

export default function Movie({title, year, poster}){
    

    return (
        
            <div className="movie_container">
                <img src={poster} alt="poster de pelicula" />
                <h1>{title}</h1>
                <p>{year}</p>
            </div>
        
    )

}