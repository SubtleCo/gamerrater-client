import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { ReviewContext } from '../review/ReviewProvider'
import './GameDetail.css'
import { GameContext } from './GameProvider'

export const GameDetail = () => {
    const [game, setGame] = useState({})
    const [gameReviews, setGameReviews] = useState([])
    const { getGameById } = useContext(GameContext)
    const { getReviewsByGame } = useContext(ReviewContext)
    const { gameId } = useParams()
    const history = useHistory()

    useEffect(() => {
        getGameById(gameId)
            .then(setGame)
        getReviewsByGame(gameId)
            .then(setGameReviews)
    }, [])


    return (
        <section className="GameDetail">
            <h2 className="GameDetail__title">{game.title}</h2>
            <h4 className="GameDetail__designer">A game by {game.designer}</h4>
            <p className="GameDetail__description">{game.description}</p>
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