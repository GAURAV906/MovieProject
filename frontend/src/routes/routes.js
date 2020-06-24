import React from 'react';
import { Route } from 'react-router-dom';
import MovieContainer from '../components/MovieContainer/MovieContainer';
import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';

const BaseRouter = () =>{
    return(
        <div>
            <Route exact path='/' strict component={SignIn}/>
            <Route exact path='/signup/' strict  component={SignUp}/>
            <Route exact path='/home/' strict  component={MovieContainer}/>
        </div>
    )
}

export default BaseRouter;