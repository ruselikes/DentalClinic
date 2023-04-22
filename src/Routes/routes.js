import React from 'react';
import {BrowserRouter as Router,  Route, Routes,Navigate} from "react-router-dom"
import Home from "../Pages/Home";
import Doctors from "../Pages/Doctors";
import Prices from "../Pages/Prices";
import AuthPage from "../Pages/AuthPage";
import Header from "../Components/Header/Header";


const useRoutes = (isAuthPacient) => {
    if (isAuthPacient) {
        return (
            <>
            <Header />
            <Router>
                <Routes>
                    <Route exact path="/" element={< Home/>}/>
                    <Route exact path="/doctors" element={<Doctors/>}/>
                    <Route exact path="/prices" element={<Prices/>}/>
                    <Route exact path="/reg" element={<AuthPage />} />
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            </Router>
            </>
        )
    }
    return(
        <>
            <Header />
        <Router>
            <Routes>
            <Route exact path="/" element={< Home/>}/>

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
            </Routes>
        </Router>
            </>
    )
};

export default useRoutes;