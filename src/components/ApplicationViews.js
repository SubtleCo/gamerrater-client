import React from "react"
import { Route } from "react-router-dom"
import { GameDetail } from "./game/GameDetail"
import { GameForm } from "./game/GameForm"
import { GameList } from "./game/GameList"
import { GameProvider } from "./game/GameProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>

            <GameProvider>
                <Route exact path="/games">
                    <GameList />
                </Route>

                <Route exact path="/games/:gameId(\d+)">
                    <GameDetail />
                </Route>
                
                <Route exact path="/games/new">
                    <GameForm />
                </Route>

            </GameProvider>
        </main>
    </>
}
