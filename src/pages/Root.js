import { Outlet } from "react-router-dom"
import Nav from "../components/shared/Nav"
const RootPage = ()=>{
    return (
        <>
            <Nav />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default RootPage;