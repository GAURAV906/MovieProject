import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import {useHistory} from "react-router-dom";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

const Header=(props)=>{ 
    var history = useHistory();
    console.log("This is history",history);

    const handleSignUpClick=()=>{
      history.push("/signup/");
      history.pop;
    }

    const handleHomeClick=()=>{
      history.push("/");
      history.pop;
    }

    const handleSignInClick=()=>{
      history.push("/signin/");
      history.pop;
    }

    const styles = {
        root:{
          flexGrow: 1,
          paddingBottom: 70,
        },
        menuButton: {
          marginRight: 2,
        },
        title: {
          flexGrow: 1,
        },
        background:{
          backgroundColor: "#000ba1",
          position:"fixed"
        }
    }
    
    return (
      <div style={styles.root}>
        <AppBar style={styles.background} position="static">
          <Toolbar>
            <IconButton edge="start" style={styles.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={styles.title}>
            MOVIES
            </Typography>
              { props.isAuthenticated ? 
                <div>
                  <HomeRoundedIcon fontSize="default" style={{marginTop:10}}/>
                  <Button color="inherit" onClick={handleHomeClick} style={{marginBottom:10}}>home</Button>
                  <ExitToAppRoundedIcon fontSize="default" style={{marginTop:10}}/>
                  <Button color="inherit" style={{marginBottom:10}} onClick={props.authLogout}>LOGOUT</Button>
                </div> : 
                <div>
                    <HomeRoundedIcon fontSize="default" style={{marginTop:10}}/>
                    <Button color="inherit" onClick={handleHomeClick} style={{marginBottom:10}}>home</Button>
                    <LockOpenTwoToneIcon fontSize="default" style={{marginTop:10}}/>
                    <Button color="inherit" onClick={handleSignInClick} style={{marginBottom:10}}>Sign-In</Button>
                    <LockTwoToneIcon fontSize="default" style={{marginTop:10}}/>
                    <Button color="inherit" onClick={handleSignUpClick} style={{marginBottom:10}}>Sign-Up</Button>
                </div>
              }     
          </Toolbar>
        </AppBar>
      </div>
    );
  }
 
const mapDispatchToProps = (dispatch) =>{
    return{
        authLogout: () => dispatch(actions.authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Header);