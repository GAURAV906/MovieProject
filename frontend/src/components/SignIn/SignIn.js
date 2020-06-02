import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import {useHistory} from "react-router-dom";

const SignIn =(props)=> {

    const [values, setValues] = useState({
        userName: '',
        password: '',
        showPassword: false,
    });

    const history = useHistory(); 

    const styles = {
        paper: {
            marginTop: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin:10,
            backgroundColor: "#000ba1",
            height:90,
            width:90
        },
        form: {
            width: '100%', 
            marginTop: 10,
        },
        submit: {
            margin: 1,
            marginTop:20,
            backgroundColor:  "#000ba1",
            height:60
        },
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit=()=>{
        console.log("values", values);
        
        props.onAuth(values.userName, values.password);
        history.push("/");
    }

    return (
        <div>
        { props.loading ? 
            <CircularProgress/>
        :
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={styles.paper}>
            <Avatar style={styles.avatar}>
            <LockOpenTwoToneIcon fontSize="large"/>
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign In
            </Typography>
            <form style={styles.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
                onChange = {handleChange('userName')}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {handleChange('password')}
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                style={styles.submit}
                onClick={handleSubmit}
            >
                Sign In
            </Button>
            </form>
        </div>
        </Container>
        }
        </div>
    );
}

const mapStateToProps =(state) =>{
    return{
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);