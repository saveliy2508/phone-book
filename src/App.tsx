import React from 'react';
import Header from "./components/Header";
import Container from "./components/Container";
import LoginPage from "./pages/LoginPage";
import {Navigate, Route, Routes} from "react-router-dom";
import ContactsPage from "./pages/ContactsPage";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./redux/store";
import {restoreSession} from "./redux/slices/authentication/slice";

function App() {
    const {isAuth} = useSelector(({authenticationSlice}: RootState) => authenticationSlice)

    const dispatch = useDispatch<AppDispatch>()

    React.useEffect(() => {
        const userData = localStorage.getItem('userData')
        if (userData) {
            const data = JSON.parse(userData)
            dispatch(restoreSession(data))
        }
    }, []);


    return (
        <div className="App">
            <Container>
                <Header/>
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
