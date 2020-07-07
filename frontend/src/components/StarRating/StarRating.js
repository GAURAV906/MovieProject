import React from 'react';
import { Rating } from '@material-ui/lab';
  

const StarRating = (props) => {
    const styles = {
        root: {
            width: 200,
            display: 'flex',
            alignItems: 'center',
            paddingTop:14
          },
    }

    return(
        <div style={styles.root}>
            <Rating
                name="hover-feedback"
                value={props.starRating}
                readOnly={true}
                precision={1}
            />
        </div>
    )    
}


export default StarRating;


