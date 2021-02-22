import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


// core components
import Header from "../components/Header.js";
import HeaderLinks from "../components/HeaderLinks.js";

import styles from "../styles/homePage.js";
import backgroundVideo from '../assets/images/Background.mp4'
import "../styles/homePage.css"

const dashboardRoutes = [];

const useStyles = makeStyles(styles);


export default function HomePage(props) {
    const classes = useStyles();
    const { ...rest } = props;
    return (
    <div>
        <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="SUTD Athletics"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
            height: 400,
            color: "white"
        }}
        {...rest}
        />
        <video className = "background-video" autoPlay muted loop>
          <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
        </video>
        <div className="home">
        </div>
        
    </div>
    );
}
