import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import { useHistory } from 'react-router-dom';


const SignUp =(props)=>{  

    const [values, setValues] = useState({
        userName: '',
        email: '',
        password1: '',
        password2: '',
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
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit=()=>{
        console.log("Values",values);
        
        props.onAuth(values.userName, values.email, values.password1, values.password2);
        history.push("/");
    }

    return(
    <div>
        { props.loading ? 
        <CircularProgress/> 
        :
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={styles.paper}>
            <Avatar style={styles.avatar}>
            <LockTwoToneIcon fontSize="large"/>
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign Up
            </Typography>
            <form style={styles.form} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    label="First Name"
                    autoFocus
                    onChange = {handleChange('firstName')}
                    value={values.firstName}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange = {handleChange('lastName')}
                    value={values.lastName}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="User Name"
                    name="userName"
                    autoComplete="uname"
                    onChange = {handleChange('userName')}
                    value={values.userName}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange = {handleChange('email')}
                    value={values.email}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    onChange = {handleChange('password1')}
                    value={values.password1}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    onChange = {handleChange('password2')}
                    value={values.password2}
                />
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                style={styles.submit}
                onClick={handleSubmit}
            >
                Sign Up
            </Button>
            </form>
        </div>
        </Container>
        }
        </div>
    )
}


const mapStateToProps =(state) =>{
    return{
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onAuth: (username, email, password1, password2 ) => dispatch(actions.authSignUp(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);