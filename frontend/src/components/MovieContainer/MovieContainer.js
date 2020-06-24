import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import MovieIcon from '@material-ui/icons/Movie';
import StarRating from '../StarRating/StarRating';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import IconButton from '@material-ui/core/IconButton';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Pages from '../Pages/Pages';
import axios from 'axios';

class MovieContainer extends Component{
  
    constructor(props){
        super(props)
        this.state = {
            movies: [], 
            network: true,
            isRatingDisabled: false,
            pageNo: 1,
        };
    }

    componentDidMount(){
        this.getData('GET');
    }

    async getData(value, method){
        try{
            if(value === undefined){
                console.log(" inside getData Before",value);
                value = 1;
                console.log("inside getData Before",value);
            }
            axios.get('http://127.0.0.1:8000/movies/?page='+value)
            .then( res => {
                console.log("Data from axios",res.data)
                this.setState(
                    this.state.movies = res.data,
                )
            })
            // const movies = await res.json();
            // console.log("This is in getData pgno",value)
            // console.log(res);

           
            
        } catch( exception ) {
            this.setState({
                network:false,
            });
            console.log("This is exception",exception)
        }
    }

    async onDeleteHandler(item){
        
        console.log("Inside Ondelete handler", item );
        const res = await fetch('http://127.0.0.1:8000/movies/'+ item +'/delete/',
        {method: 'DELETE'});
        const movies = await res.json();
        console.log("This is res on delete ",movies);

        this.setState({
            movies
        });
    }

    render(){
        const style = {
            div:{
                height: "25%",
                padding: 10,
                marginLeft: 50,
                marginRight: 50,
                marginTop: 10,
                marginBottom: 10,
                textAllign: "center"
            },
            avatar:{
                width: 60,
                height: 60,
                marginRight:40
            },
            noNetwork:{
                textAllign:"center",
                justifyContent:"center",
                padding:100,
                margin:30,
            },
            paperStyle:{
                padding:10,
            },
        }

        // const onDeleteHandler=(item)=>{
        //     console.log("Inside Ondelete handler", item );
        //     const res =fetch('http://127.0.0.1:8000/movies/'+ item +'/delete/',
        //     {method: 'DELETE'});
        //     // window.location.reload();
        // }

        const onRatingChangeHandler=(event, item)=>{

            var intValue = parseInt(event.target.value);
            console.log("event.target.value", intValue);
            console.log("Inside onRatingChangeHandler with item Value ", item);

            // var movieClicked = fetch('http://127.0.0.1:8000/movies/'+ item + '/update/',
            // {method: 'POST'});

            // console.log("This is movieclicked", movieClicked);

            this.setState({
                isRatingDisabled:false,
            });
        }

        const onPageChangeHandler = (event, value) => {
            this.setState({
                pageNo:value
            });
            console.log("In in onPagechange",value);

            if(this.state.pageNo !== value){
                this.getData(value);
            }
        };

        return(
            <div>
                {this.state.network ?
                <div>
                    <div>
                    {this.state.movies.map(item => (
                        <div style={style.div} key={item.id}>
                            <Paper variant="elevation" elevation={3} style={style.paperStyle}>
                                <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar variant="rounded" style={style.avatar}>
                                        <MovieIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.title}
                                    secondary={
                                    <React.Fragment>
                                        {item.description}
                                    </React.Fragment>
                                    }
                                />
                                <div>
                                    <StarRating starRating={item.rating} onChangeActive={(event)=>{onRatingChangeHandler(event, item.id)}} rate={this.state.isRatingDisabled}/>
                                </div>
                                <IconButton edge="start" color="primary" aria-label="menu">
                                    <EditRoundedIcon/>
                                </IconButton>
                                <IconButton edge="start" color="primary" aria-label="menu" onClick={()=>{this.onDeleteHandler(item.id)}} >
                                    <DeleteRoundedIcon />
                                </IconButton>
                                </ListItem>   
                            </Paper>
                            <Divider variant="inset"/>
                        </div>
                    ))}
                    </div>
                        <div>
                            <Pages handleOnChange={onPageChangeHandler} pageNumber={this.state.pageNo}/>
                        </div> 
                    </div>                   
                    :
                    <div >
                        <Paper variant="elevation"  elevation={3} style={style.noNetwork}>Make sure the backend server is on</Paper>
                    </div>
                }  
            </div>
            
        );
    }
}

export default MovieContainer;

