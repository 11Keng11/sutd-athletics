import React from "react";
import GridContainer from "./GridContainer.js";
import GridItem from "./GridItem.js";
import styles from "../styles/aboutSectionStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(styles);

export default function AboutSection(){
    const classes = useStyles();
    return (
        <div> 
            <div className={classes.section} >
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12} className={classes.header}>
                        <br></br>
                        <h1 className={classes.title} >What you need to know? </h1>
                        <br></br>
                    </GridItem>
                    {/* <hr className={classes.dividerHor}/> */}
                    <GridItem xs={12} sm={12} md={6} className={classes.light}>
                        <h2 className={classes.title}> Submit Run Details </h2>
                        <h4>You can track all your mileage (in kilometres) with a range of IOS and Android apps, Such as [Garmin, Polar, Fitbit, Strava, UA running App, Adidas running App, Nike run club, Amazfit].
                        You need to submit an activity onto our website (link) by entering - Distance, Run time, Date and a screenshot from your running app showing us the distance you ran.</h4>
                    </GridItem>
                    
                    <GridItem xs={12} sm={12} md={6}>
                        <h2 className={classes.title}>Finisher T-shirt </h2>
                        <h4>For teams and individuals who have completed their target distance (60km and 12km respectively), you will be awarded with the SUTD Athletics Virtual Run finisher dry-fit T-SHIRT! </h4>
                        
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6} >
                        <h2 className={classes.title}>Lucky Draw </h2>
                        <h4>To make it more exciting, we will conduct a lucky draw at the end of the challenge.  
                        To gain a lucky draw entry, simply #hashtag us with running photos @ #SUTDVIRTUALRUN and tag SUTD Athletics Instagram page for a chance to win lucky draw prizes. 
                        Participants can also share their experience on any interesting newly explored running routes or their experience such as seeing nice sights e.g. “I ran around Bedok reservoir today and each round was 2km, it was easy to maintain pace as the sight of the reservoir has a calming effect...”.  
                        We will be filtering and featuring some of the aspiring post on our Instagram. Participants may send in an interesting photo (image of reservoir) with short message. We will upload the top 3 submissions each week. This can also inform people or our audience of interesting new places to visit while running. 
                        </h4>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6} className={classes.light}>
                        <h2 className={classes.title}>Connect With Us </h2>
                        <h4>Join our virtual run telegram group(link) and follow our Instagram @sutdathletics. Words cannot describe how awesome our community is... Seriously they can’t. 
                        You will meet people who are motivated. We will share stories, wins and posts with you. And make you feel a part of our tribe. 
                        You will also get direct updates if there is any. Or please do ask any questions regarding any problems, if you have any, we will response ASAP. 
                        </h4>

                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}