import React, { createContext, useState } from 'react'

export const ReviewContext = createContext()

export const ReviewProvider = props => {
    const [ reviews, setReviews ] = useState([])

    const getReviews = () => {
        return fetch(`http://localhost:8000/reviews`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(res => res.json())
            .then(setReviews)
    }

    const getReviewById = id => {
        return fetch(`http://localhost:8000/reviews/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(res => res.json())
    }

    const getReviewsByGame = gameId => {
        return fetch(`http://localhost:8000/reviews?game_id=${gameId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(res => res.json())
    }

    const addReview = review => {
        return fetch(`http://localhost:8000/reviews`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
    }

    return (
        <ReviewContext.Provider value={{
            reviews, getReviews, getReviewById, addReview, getReviewsByGame
        }}>
            {props.children}
        </ReviewContext.Provider>
    )
}