import React, { createContext, useState } from 'react'

export const GameContext = createContext()

export const GameProvider = props => {
    const [ games, setGames ] = useState([])
    const [ categories, setCategories ] = useState([])

    const getGames = () => {
        return fetch(`http://localhost:8000/games`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(res => res.json())
            .then(setGames)
    }

    const getCategories = () => {
        return fetch(`http://localhost:8000/categories`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(res => res.json())
            .then(setCategories)
    }

    const getGameById = id => {
        return fetch(`http://localhost:8000/games/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(res => res.json())
    }

    const addGame = game => {
        return fetch(`http://localhost:8000/games`, {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
            .then(res => res.json())
    }

    const updateGame = (id, game) => {
        return fetch(`http://localhost:8000/games/${id}`, {
            method: "PUT",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
    }

    return (
        <GameContext.Provider value={{
            games, getGames, addGame, getGameById, getCategories, categories, updateGame
        }}>
            {props.children}
        </GameContext.Provider>
    )
}