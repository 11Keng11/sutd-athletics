import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../styles/faqPageStyle.js"
import Header from "../components/Header.js";
import HeaderLinks from "../components/HeaderLinks.js";
import GridContainer from "../components/GridContainer.js";
import GridItem from "../components/GridItem.js";
import backgroundImg from "../assets/images/Background2.jpg";
import classNames from "classnames";

const useStyles = makeStyles(styles);

const dashboardRoutes = [];
export default function Faqpage(props) {
    const { ...rest } = props;
    const classes = useStyles();
    return (
        <div className={classes.root}> 
            <Header
                color="transparent"
                routes={dashboardRoutes}
                brand="SUTD Athletics"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 20,
                    color: "white"
                }}
                {...rest}
            />
            <img className={classes.background} src={backgroundImg} />
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <div className={classes.section}>
                        <GridContainer >
                            <GridItem xs={12} sm={12} md={9}>
                                <h1 className={classes.title}>FAQ</h1>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={9}>
                                <h2 className={classes.title}>How do I enter a distance towards the challenge? </h2>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={9}>
                                <h4 className={classes.description}>Manually – via the upload run button in the navigation bar above. Create an activity after each run, add a distance and time taken and date of run, upload a screenshot of the run and a post-run photo (for validation purpose) and you’re done. </h4>
                            </GridItem>

                            <GridItem xs={12} sm={12} md={9}>
                                <h2 className={classes.title}>What does it take to complete this challenge? </h2>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={9}>
                                <h4 className={classes.description}>You have 21 days (7 March to 28March) for you or your team to complete this challenge. Adjust accordingly to your fitness level, pace yourself and build a long-lasting habit!  </h4>
                            </GridItem>

                            <GridItem xs={12} sm={12} md={9}>
                                <h2 className={classes.title}>What's stopping someone from cheating? </h2>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={9}>
                                <h4 className={classes.description}>We do have a few ways to detect cheaters, however we do realise that no matter what we do people are always going to be able to find a way to cheat if that’s what they really want to do. E.g. Put their Fitbit on their dog! 
                                There are no prizes for first place. If someone wants to cheat, then they are only really cheating themselves and wasting their time.  
                                </h4>
                            </GridItem>

                            <GridItem xs={12} sm={12} md={9}>
                                <h2 className={classes.title}>When can I register for the challenge? </h2>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={9}>
                                <h4 className={classes.description}>From now until the start of the challenge, you can register via the sign up button in the navigation bar above! If you missed the date but want to hop onto the journey with us, contact @jeff_lai98 (telegram).  </h4>
                            </GridItem>

                            <GridItem xs={12} sm={12} md={9}>
                                <h2 className={classes.title}>Can I enter multiple activities at once?   </h2>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={9}>
                                <h4 className={classes.description}>We strongly encourage you to upload your activity after each run. As you can only upload one activity for each submission, it will be a pain in the ass to key in your results at once closer to the end. </h4>
                            </GridItem>

                            <GridItem xs={12} sm={12} md={9}>
                                <h2 className={classes.title}>How do I enter a distance towards the challenge? </h2>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={9}>
                                <h4 className={classes.description}>Manually – via this (link) to a web. Create an activity after each run, add a distance and time taken and date of run, upload a screenshot of the run and a post-run photo (for validation purpose) and you’re done. 
                                Most importantly, we will appreciate if you can upload your run timely as it helps to keep the leader board alive. </h4>
                            </GridItem>

                            <GridItem xs={12} sm={12} md={9}>
                                <h2 className={classes.title}>How do teams work?  </h2>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={9}>
                                <h4 className={classes.description}>Teams are a fun way to take part in Virtual Run. 
                                **Note that each team member is required to  submit their own activities. Each team member will receive their own Finisher T-shirt** 
                                Basically, you share the distance with the other people in your team. 
                                Your team will also be represented on the leader board. 
                                You (as in you personally) will also be able to see information about your own achievements and rankings separate from the team. 
                                The distance doesn’t have to be divided evenly among team members. You can team up with guru athletes and people just starting out! 
                                So, round up your friends or workmates and join the fun! </h4>
                            </GridItem>

                            <GridItem xs={12} sm={12} md={9}>
                                <h2 className={classes.title}>How do I access the challenge after I've signed up?  </h2>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={9}>
                                <h4 className={classes.description}>SUTD Athletics Virtual Run is powered by our own web created by the students. 
                                When you sign up for the challenge, your name will automatically be set up in the SUTD Athletics Virtual Run leader board. 
                                Besides, you will be submitting your run activities on the website too. </h4>
                            </GridItem>

                        </GridContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}