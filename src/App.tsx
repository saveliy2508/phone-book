import React, {useCallback, useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import Header from "./components/Header";
import Container from "./components/Container";
import LoginPage from "./pages/LoginPage";
import ContactsPage from "./pages/ContactsPage";
import {AppDispatch, RootState} from "./redux/store";
import {endSession, restoreSession} from "./redux/slices/authentication/slice";

function App() {
    const dispatch = useDispatch<AppDispatch>()

    const {isAuth} = useSelector(({authenticationSlice}: RootState) => authenticationSlice)

    useEffect(() => {
        dispatch(restoreSession())
    }, []);

    const callbacks = {
        handleEndSession: useCallback(() => dispatch(endSession()), [])
    }

    return (
        <div className="App">
            <Container>
                <Header isAuth={isAuth} handleEndSession={callbacks.handleEndSession}/>
                <Routes>
                    <Route path='*' element={<Navigate to="/login"/>}/>
                    <Route path='/login' element={isAuth ? <Navigate to="/contacts"/> : <LoginPage/>}/>
                    <Route path='/contacts' element={isAuth ? <ContactsPage/> : <Navigate to="/login"/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
