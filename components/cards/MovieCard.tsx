interface MovieCardProps{
    image: string
    rating: string
    watchtime: string
    genre: string
}

const MovieCard = ({image,rating,watchtime,genre}:MovieCardProps) => {
   return(
    <section className = "movie-card">
        <div>
            <img src = {image} alt = "Movie Image"/>
        </div>
        
        <div>
            <h3>{rating}</h3>
        </div>
        <div>
            <h3>{watchtime}</h3>
        </div>
        <div>
            <h3>{genre}</h3>
        </div>
    </section>
   )
}

export default MovieCard;