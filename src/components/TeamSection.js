import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "./GridContainer.js";
import GridItem from "./GridItem.js";
import Button from "./Button.js";
import Card from "./Card.js";
import CardBody from "./CardBody.js";
import CardFooter from "./CardFooter.js";
import TelegramIcon from '@material-ui/icons/Telegram';

import styles from "../styles/teamStyle.js";

import Jeff from "../assets/images/Jeff.png";
import Wuarn from "../assets/images/Wuarn.png";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div>
      <div className={classes.section}>
        <GridContainer justify="center"  >
          <GridItem xs={12} sm={12} md={4} className={classes.head}>
            <h2 className={classes.title2}>Contact Us</h2>
            <h4 className={classes.description2}> If you have enquiries relating to the virtual run or the athletics fifth row, feel free to contact our team.</h4>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer justify="center">>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain className={classes.card}>
                <GridItem xs={12} sm={12} md={4} className={classes.itemGrid}>
                  <img src={Jeff} alt="..." className={imageClasses} />
                </GridItem>
                <br />
                <h4 className={classes.cardTitle}>
                  Jeff Lai
                  <br />
                  <small className={classes.smallTitle}>President</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                  For me, running is both exercise and a metaphor of life. It trains me to exert myself to the fullest within individual limits. 
                  Pushing myself beyond the comfort zone,  demanding more from myself. I started running long distance a year ago for achieving 
                  a healthy mental state. I run consistently because I believe that if I can embrace the challenge for going out on  long runs, 
                  everything else will be a breeze .
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <p className={classes.description}>
                    @jeff_lai98
                  </p>
                  <TelegramIcon/> 
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain className={classes.card}>
                <GridItem xs={12} sm={12} md={4} className={classes.itemGrid}>
                  <img src={Wuarn} alt="..." className={imageClasses} />
                </GridItem>
                <br />
                <h4 className={classes.cardTitle}>
                  Wuarn Hong
                  <br />
                  <small className={classes.smallTitle}>Vice President</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                  Running has taught me that I am capable of so much more than I can imagine. I hated running as a 
                  child but I still ran, and the more I ran, the easier it became. Before I knew it, I began to love the sport. Running has allowed me to set goals and achieve them. I may not be 
                  there yet, but after every run, I’ll be closer than where I was before. 
                  So run fast, run slow, run far, run close, just don’t stop running :^)
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  
                  <p className={classes.description}>
                    @wuarnhong
                  </p>
                  <TelegramIcon/> 
                  
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
          
        </div>
      </div>
    </div>
  );
}
