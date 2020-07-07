import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import StarRating from '../StarRating/StarRating';

const InputFields = (props) => {
  
  const [values, setValues] = React.useState({
    movieTitle: '',
    movieDesc: '',
    rating: 0,
  });

  const [isDisabled, setIsDisabled] = React.useState(false);
  const [responseData, setResponseData] = React.useState({
    id: '',
    title: '',
    description: '',
    rating: ''
  });

  const styles = {
    form: {
      width: '100%', 
      marginTop: 10,
    },
  }
  
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    if(event.target.value > 5) {
      setValues({rating: 5})
    } else if(event.target.value < 0) {
      setValues({rating: 0})
    }
  };


  const handleSubmit=(item)=>{

    const data = {
      "title": values['movieTitle'],
      "desc": values['movieDesc'],
      "rating": values['rating']
    }

    axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/movies/' + item.id + '/update/',
      data: data,
      headers: {'Content-Type': 'application/json' }
      })
      .then(function (response) {
        setResponseData({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          rating: response.data.rating
        });
      })
      .catch(function (response) {
          console.log(response);
      });
     console.log("data",responseData);
  }

  const isButtonDisabled=()=>{
    console.log('is Button Disabled');
    if ( values['movieTitle'] !== null && values['movieTitle'].trim() !== '' ) {
      setIsDisabled(false);
    }  
  } 
  
  return(
    <div>
      <form style={styles.form} noValidate>
      <Grid item xs={12} style={{padding:15}}>
      <TextField
          variant="outlined"
          required
          fullWidth
          label="Title"
          name="movieTitle"
          autoComplete="mTitle"
          onChange = {handleChange('movieTitle')}
          value={values.movieTitle}
      />
      </Grid>
      <Grid item xs={12} style={{padding:15}}>
      <TextField
          variant="outlined"
          required
          fullWidth
          label="Description"
          name="desc"
          multiline
          rows={5}
          autoComplete="desc"
          onChange = {handleChange('movieDesc')}
          value={values.movieDesc}
      />
      </Grid>
      <Grid item xs={12} style={{padding:15}}>
      <TextField
          variant="outlined"
          required
          fullWidth
          label="Rating"
          type="number"
          inputProps={{ min: "0", max: "5", step: "1" , maxLength: "1"}}
          onChange = {handleChange('rating')}
          value={values.rating}
        />
      </Grid>
      <Grid item xs={12} style={{padding:15}}>
        <Button
            center
            variant="contained"
            color="primary"
            onClick={()=>{handleSubmit(props.item)}}
            style={{color: isDisabled ? "#f4f4f4": "white", backgroundColor: isDisabled ? "#87adff" : "#000ba1", marginLeft: 200, marginTop:60, height: 50}}
        >
          Submit
        </Button>
      </Grid>
      </form>
    </div>
  );
}

export default InputFields;