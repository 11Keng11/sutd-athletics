import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


// core components
import GridContainer from "./GridContainer.js";
import GridItem from "./GridItem.js";
import styles from "../styles/infoSectionStyle.js";
import Button from "./Button.js";
import CreateIcon from '@material-ui/icons/Create';
import {links} from "../links.js" ;

const useStyles = makeStyles(styles);

export default function InfoSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={9}>
          <h1 className={classes.title}>SUTD Virtual Run</h1>
          <h3 className={classes.description}>
            The SUTD Virtual Run is here to ignite your spirits and boost your energy levels for the second half of the term! 
            All you have to do is cover a distance of 12km individually, or 60km as a group of 5, over a span of 3 weeks. The event will take place from the 7th to the 28th of March.
            So what are you waiting for? Hurry and sign up now! Lots of attractive prizes to be won!
          </h3>
        </GridItem>
        <GridItem xs={12} sm={8} md={4}>
          <Button className={classes.navlink} href = {links.signupLink} color = 'danger' size = 'lg'> <CreateIcon></CreateIcon>Sign Up</Button>
        </GridItem>
        
      </GridContainer>
      
    </div>
  );
}
