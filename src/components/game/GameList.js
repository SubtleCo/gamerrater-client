import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { GameContext } from "./GameProvider.js"
import "./GameList.css"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)
    const history = useHistory()

    useEffect(() => {
        getGames()
    }, [])

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title"><span 
                                                        className="gameDetailLink" 
                                                        onClick={() => history.push(`/games/${game.id}`)}>
                                                            {game.title}</span></div>
                        <div className="game__creator">by {game.designer}</div>
                        <div className="game__players">{game.player_min} players needed</div>
                        <div className="game__skillLevel">Age level is {game.age_min} +</div>
                    </section>
                })
            }
        </article>
    )
}