import React, { createContext, useState } from 'react'

export const GameContext = createContext()

export const GameProvider = props => {
    const [ games, setGames ] = useState([])

    const getGames = () => {
        return fetch(`http://localhost:8000/games`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(res => res.json())
            .then(setGames)

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

    return (
        <GameContext.Provider value={{
            games, getGames, addGame
        }}>
            {props.children}
        </GameContext.Provider>
    )
}