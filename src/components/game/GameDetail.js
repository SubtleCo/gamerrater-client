import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './GameDetail.css'
import { GameContext } from './GameProvider'

export const GameDetail = () => {
    const [ game, setGame ] = useState({})
    const { getGameById } = useContext(GameContext)
    const { gameId } = useParams()

    useEffect(() => {
        getGameById(gameId)
            .then(setGame)
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
            </table>
            <h4>Categories</h4>
            <div className="GameDetail__categories">
                {
                    game.categories?.map(cat => cat.label).join(", ")
                }
            </div>
        </section>
    )
}