import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import InputFields  from '../InputFields/InputFields';
import Tooltip from '@material-ui/core/Tooltip';

const TransistionModal = (props) => {

  const [open, setOpen] = React.useState(false);

  const styles = {
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
    },
    paper: {
      backgroundColor: "white",
      border: '2px solid #000',
      boxShadow: 200,
      padding: 30,
      width:500,
      height:500
    },
    button: {
      marginLeft: 10,
      marginRight: 10,
      marginTop:10,
      backgroundColor:  "primary",
      height:35
    },
    text: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Edit">
        <IconButton edge="start" color="primary" aria-label="menu" onClick={handleOpen}>
          <EditRoundedIcon/>
        </IconButton>
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={styles.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
      <Fade in={open}>
        <div style={styles.paper}>
          <Typography style={styles.text}>Edit the Movie</Typography>
          <InputFields item={props.itemId}/>
        </div>
      </Fade>
      </Modal>
    </div>
  );
}

export default TransistionModal;