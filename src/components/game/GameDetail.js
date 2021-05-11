import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { ReviewContext } from '../review/ReviewProvider'
import './GameDetail.css'
import { GameContext } from './GameProvider'
import { createRating } from './RatingProviders'

export const GameDetail = () => {
    const [game, setGame] = useState({})
    const [gameReviews, setGameReviews] = useState([])
    const [ rating, setRating ] = useState({})
    const { getGameById } = useContext(GameContext)
    const { getReviewsByGame } = useContext(ReviewContext)
    const { gameId } = useParams()
    const history = useHistory()
    const userId = parseInt(localStorage.getItem("userId"))

    useEffect(() => {
        getGameById(gameId)
            .then(game => {
                setGame(game)
                setRating({
                    score: 0,
                    game_id: game.id
                })
            })
        getReviewsByGame(gameId)
            .then(setGameReviews)
    }, [])

    const handleCreateRating = e => {
        e.preventDefault()
        createRating(rating)
    }

    const handleInputChange = e => {
        e.preventDefault()
        const newRating = {...rating}
        newRating.score = parseInt(e.target.value)
        setRating(newRating)
    }

    const handleEditRequest = e => {
        // check if the current user is the creator of the game

        e.preventDefault()
        history.push(`/games/${gameId}/edit`)

    }


    return (
        <section className="GameDetail">
            <h2 className="GameDetail__title">{game.title}</h2>
            {userId === game.user?.id ? <button className="GameDetail__editButton" onClick={handleEditRequest}>Edit this game</button> : ""}
            <h4 className="GameDetail__designer">A game by {game.designer}</h4>
            <p className="GameDetail__description">{game.description}</p>
            <p className="GameDetail__averateRating"> Rating: {game.average_rating ? game.average_rating : "not yet rated"}</p>
            <table className="GameDetail__details">
                <thead>
                    <tr>
                        <th colSpan="2">Game Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Released</td>
                        <td>{game.released}</td>
                    </tr>
                    <tr>
                        <td>Player Minimum</td>
                        <td>{game.player_min}</td>
                    </tr>
                    <tr>
                        <td>Player Maximum</td>
                        <td>{game.player_max}</td>
                    </tr>
                    <tr>
                        <td>Age Recommendation</td>
                        <td>{game.age_min} +</td>
                    </tr>
                </tbody>
            </table>
            <div className="rating">
                <section className="createRating form-group">
                    <label htmlFor="score">Add a rating</label>
                    <input type="range" min="1" max="10" value={rating.score} name="score" onChange={handleInputChange}></input>
                    <p>{rating.score}</p>
                    <button onClick={handleCreateRating}>Add Rating</button>
                </section>
            </div>
            <h4>Categories</h4>
            <div className="GameDetail__categories">
                {
                    game.categories?.map(cat => cat.label).join(", ")
                }
            </div>
            <section className="reviews">
                <h4>Reviews</h4>
                {
                    gameReviews.map(review => {
                        return (
                            <article className="review" key={review.id}>
                                <p className="review__text">{review.text}</p>
                                <h5 className="review__author">{review.user.first_name} {review.user.last_name}</h5>
                            </article>
                        )
                    })
                }
                <button className="reviewButton" onClick={() => history.push(`/games/${gameId}/review`)}>Write A Review</button>
            </section>


        </section>
    )
}