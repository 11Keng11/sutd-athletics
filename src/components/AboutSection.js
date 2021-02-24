import React from "react";
import GridContainer from "./GridContainer.js";
import GridItem from "./GridItem.js";
import styles from "../styles/aboutSectionStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import FinisherT from "../assets/images/FinisherT.png";
import Button from "./Button.js";
import {CloudUpload} from "@material-ui/icons";
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import InstagramIcon from '@material-ui/icons/Instagram';
import WifiIcon from '@material-ui/icons/Wifi';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import {links} from "../links.js" ;

const useStyles = makeStyles(styles);

export default function AboutSection(props){

    const openUpload = () => {
        props.onUploadClick()
    }

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
                        <DirectionsRunIcon className={classes.icons} fontSize = "large"> </DirectionsRunIcon>
                        <h4 className={classes.description}>You can track all your mileage (in kilometres) with a range of IOS and Android apps, Such as [Garmin, Polar, Fitbit, Strava, UA running App, Adidas running App, Nike run club, Amazfit].
                        You need to submit your activity here by entering - Distance, Run time, Date and a screenshot from your running app showing us the distance you ran.</h4>
                        <Button className={classes.navlink} color='danger' onClick={openUpload} > <CloudUpload/> Upload Run</Button>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6} className={classes.white}>
                        <h2 className={classes.title}>Lucky Draw </h2>
                        <CardGiftcardIcon className={classes.icons} fontSize = "large">></CardGiftcardIcon>
                        <h4 className={classes.description}> We will be holding a lucky draw!  
                        To stand a chance to win, simply post running pictures on instagram photos/stories, #hashtag  #SUTDVIRTUALRUN and tag @sutd.athletics. Feel free to caption and share 
                        your interesting experiences with us. We will be featuring some of your stories on our instagram page to. So do give us a follow <a href = "https://www.instagram.com/sutd.athletics/">here</a>  to stay up to date!
                        </h4>
                        <Button className={classes.navlink} color='danger' disabled="true"> <InstagramIcon/> Stories</Button>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6} className={classes.white}>
                        <h2 className={classes.title}>Finisher T-shirt </h2>
                        <img src={FinisherT}  className={classes.icons}/>
                        <h4 className={classes.description}>To earn your Virtual Run Finisher Tee, individuals have to complete 12km while teams have to collectively complete 60km across the race period. For teams, every member must run a minimum of 8km individually. </h4>
                        
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6} className={classes.light}>
                        <h2 className={classes.title}>Connect With Us </h2>
                        <WifiIcon className={classes.icons} fontSize = "large">></WifiIcon>
                        <h4 className={classes.description}>Join our virtual run telegram group <a href = "https://t.me/joinchat/SMJYoOIsHSczOWRl"> here</a> and follow our Instagram @sutdathletics. Words cannot describe how awesome our community is... Seriously they can’t. 
                        You will meet people who are motivated. We will share stories, wins and posts with you. And make you feel a part of our tribe. 
                        You will also get direct updates. Pease do ask any questions regarding any problems, if you have any, we will response ASAP. 
                        </h4>

                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}