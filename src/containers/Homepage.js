import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import classNames from "classnames";

// core components
import Header from "../components/Header.js";
import HeaderLinks from "../components/HeaderLinks.js";
import InfoSection from "../components/InfoSection.js";
import Parallax from "../components/Parallax.js";
import AboutSection from "../components/AboutSection.js";


import styles from "../styles/homePageStyle.js";
import backgroundVideo from '../assets/images/Background.mp4'
import "../styles/homePage.css"

import bgImg from "../assets/images/Background.png";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);


export default function HomePage(props) {
    const classes = useStyles();
    const { ...rest } = props;

    const [openDialog, setOpenDialog] = React.useState(false);

    const openUpload = () => {
        setOpenDialog(true);
    }
    
    return (
    <div>
        <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="SUTD Athletics"
        rightLinks={<HeaderLinks openUpload={openDialog} />}
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

        <Parallax image={bgImg}> </Parallax>
        
        <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
                <InfoSection />
            </div>
        </div>
        <AboutSection onUploadClick={openUpload}/>
        
    </div>
    );
}
