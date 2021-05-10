import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { GameContext } from '../game/GameProvider'
import { ReviewContext } from './ReviewProvider'

export const ReviewForm = () => {
    const { getGameById } = useContext(GameContext)
    const { addReview } = useContext(ReviewContext)
    const { gameId } = useParams()
    const history = useHistory()
    const [game, setGame] = useState({})
    const [review, setReview] = useState({
        game_id: parseInt(gameId),
        text: ""
    })

    useEffect(() => {
        getGameById(gameId)
            .then(setGame)
    }, [])

    const handleInputChange = e => {
        const newReview = {...review}
        newReview.text = e.target.value
        setReview(newReview)
    }

    const handleSubmit = e => {
        e.preventDefault()
        addReview(review)
        history.push(`/games/${gameId}`)
    }


    return (
        <>
            <h1>New Review</h1>
            <form className="reviewForm">
                <fieldset>
                    <div className="form-Group">
                        <label htmlFor="reviewText">What do you think of {game.title}?</label>
                        <input type="textarea" name="reviewText" className="form-control" required value={review.text} onChange={handleInputChange}></input>
                    </div>
                </fieldset>
                <input type="submit" onClick={handleSubmit}></input>
            </form>
        </>
    )
}



