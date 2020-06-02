import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/header';
// import MovieContainer from './components/MovieContainer/MovieContainer';
import Footer from './components/Footer/footer';
import BaseRouter from './routes/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Header {...this.props}/>
              <BaseRouter/>
          <Footer/>
        </Router>
      </div>
    );
  }
}

const mapStateToProps =(state)=>{
  return{
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps =(dispatch) =>{
  return {
    onTryAutoSignUp: () => {
      dispatch(actions.authCheckState())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
