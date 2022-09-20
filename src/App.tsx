import React from 'react';
import Header from "./components/Header";
import Container from "./components/Container";
import LoginPage from "./pages/LoginPage";
import {Routes, Route, Navigate} from "react-router-dom";
import ContactsPage from "./pages/ContactsPage";

function App() {
    return (
        <div className="App">
            <Container>
                <Header/>
                <Routes>
                    <Route path='*' element={<Navigate to="/login" />}/>
                    <Route path='/login' element={<LoginPage />}/>
                    <Route path='/contacts' element={<ContactsPage />}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
