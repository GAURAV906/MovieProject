import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

const Pages = (props) => {

    const style={
        paginationstyle:{
            paddingTop:25,
            justifyContent:"center", 
            bottom:90,
            position:"fixed"           
        }
    }
    // const [page, setPage] = React.useState(1);

    // const handleChange = (event, value) => {
    //     setPage(value);
    // };

  return (
    <div style={style.paginationstyle}>
        <Pagination count={2} page={props.pageNumber} onChange={props.handleOnChange} variant="outlined" shape="rounded" size="large"/>
    </div>
  );
}

export default Pages;