import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { GameContext } from './GameProvider'
import './GameForm.css'

export const GameForm = () => {
    const { getGameById, categories, getCategories, addGame, updateGame } = useContext(GameContext)
    const [checkedCategories, setCheckedCategories] = useState([])
    const { gameId } = useParams()
    const history = useHistory()
    const [game, setGame] = useState({
        title: "",
        released: 0,
        description: "",
        player_min: 0,
        player_max: 0,
        age_min: 0,
        designer: "",
        categories: []
    })

    useEffect(() => {
        getCategories()
        if (gameId) {
            getGameById(gameId)
                .then(game => {
                    setGame(game)
                    const gameCategories = game.categories.map(cat => parseInt(cat.id))
                    setCheckedCategories(gameCategories)
                })
        }
    }, [])

    useEffect(() => {
        const changedGame = { ...game }
        changedGame.categories = checkedCategories
        setGame(changedGame)
    }, [checkedCategories])

    const handleInputChange = e => {
        const changedGame = { ...game }

        if (e.target.name.includes("category")) {
            const currentCategories = [...checkedCategories]
            if (e.target.checked) {
                currentCategories.push(parseInt(e.target.value))
            } else {
                const index = currentCategories.indexOf(parseInt(e.target.value))
                currentCategories.splice(index, 1)
            }
            setCheckedCategories(currentCategories)
        }
        if (!e.target.name.includes("category")) {
            changedGame[e.target.name] = e.target.value
            if (e.target.name.includes("Id") ||
                e.target.name.includes("released") ||
                e.target.name.includes("min") ||
                e.target.name.includes("max")) {
                changedGame[e.target.name] = parseInt(e.target.value)
            }
        }
        setGame(changedGame)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (gameId) {
            updateGame(gameId, game)
                .then(game => history.push(`/games/${gameId}`))
        } else {
            addGame(game)
                .then(game => history.push(`/games/${game.id}`))
        }
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required className="form-control"
                        value={game.title}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="released">Year of Release: </label>
                    <input type="number" name="released" required className="form-control"
                        value={game.released}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required className="form-control"
                        value={game.description}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="player_min">Minimum Players: </label>
                    <input type="number" name="player_min" required className="form-control"
                        value={game.player_min}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="player_max">Maximum Players: </label>
                    <input type="number" name="player_max" required className="form-control"
                        value={game.player_max}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="age_min">Age Minimum: </label>
                    <input type="number" name="age_min" required className="form-control"
                        value={game.age_min}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" required className="form-control"
                        value={game.designer}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <h3> Categories:</h3>
                    {
                        categories.map(c => {
                            return <div key={c.id} className="categoryCheckbox">
                                <input type="checkbox"
                                    name={`category ${c.id}`}
                                    value={c.id}
                                    checked={checkedCategories.includes(c.id)}
                                    onChange={handleInputChange}
                                ></input>
                                <label htmlFor={c.id}> {c.label}</label>
                            </div>
                        })
                    }
                </div>
            </fieldset>
            <button type="submit" onClick={handleSubmit}>{gameId ? "Edit" : "Create"}</button>
        </form>
    )

}