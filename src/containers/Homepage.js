import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "../components/Header.js";
import HeaderLinks from "../components/HeaderLinks.js";
import Parallax from "../components/Parallax.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
// import Button from "components/CustomButtons/Button.js";

import styles from "../styles/homePage.js";

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
        <hi>Hi</hi>.
        <Parallax filter image={require("../assets/images/temp.jpg")}>
            <div className={classes.container}>
            {/* <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Your Story Starts With Us.</h1>
                <h4>
                    Every landing page needs a small description after the big bold
                    title, that{"'"}s why we added this text here. Add here all the
                    information that can make you or your product create the first
                    impression.
                </h4>
                <br />
                <Button
                    color="danger"
                    size="lg"
                    href="https://sutdapac-my.sharepoint.com/personal/pinnean_lai_mymail_sutd_edu_sg/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fpinnean%5Flai%5Fmymail%5Fsutd%5Fedu%5Fsg%2FDocuments%2FAUTD%20ATHLETICS%20INTRO%202021%20%281%29%2Emp4&parent=%2Fpersonal%2Fpinnean%5Flai%5Fmymail%5Fsutd%5Fedu%5Fsg%2FDocuments&originalPath=aHR0cHM6Ly9zdXRkYXBhYy1teS5zaGFyZXBvaW50LmNvbS86djovZy9wZXJzb25hbC9waW5uZWFuX2xhaV9teW1haWxfc3V0ZF9lZHVfc2cvRWRzZ0FsZWwyS0ZPcTBLUFBmaXoxSlFCU0tiOV9KQW9HSk1XckhqQ0ZGQXlYUT9ydGltZT12WEZ5WTlIVDJFZw"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fas fa-play" />
                    Watch video
                </Button>
                </GridItem>
            </GridContainer> */}
            </div>
        </Parallax>
    </div>
    );
}
