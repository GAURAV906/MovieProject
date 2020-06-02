import React, { Component } from "react";

class Footer extends Component{
    render(){
        const styles = {
            root:{
                backgroundColor: "#000ba1",
                height:65,
                width:"100%",
                bottom:0,
                position:"fixed",
            }
        }
        return(
            <div style={styles.root}/>
        );
    }
}

export default Footer;