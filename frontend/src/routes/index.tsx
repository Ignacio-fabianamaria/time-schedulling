import { BrowserRouter, Route, Routes } from "react-router-dom"

export const RouteApp = ()=>{
    return(
        
        <Routes>
            <Route path='/' element={
            <>
            <h1>Rota de Login</h1>
            </>
            }/>
        </Routes>
       
    )
}