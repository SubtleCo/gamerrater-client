import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList"
import { GameProvider } from "./game/GameProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            Application views

            <GameProvider>
                <Route exact path="/games">
                    <GameList />
                </Route>

            </GameProvider>
        </main>
    </>
}
