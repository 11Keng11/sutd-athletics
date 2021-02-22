/*eslint-disable*/
import React from "react";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import {CloudUpload} from "@material-ui/icons";
import CreateIcon from '@material-ui/icons/Create';
import InfoIcon from '@material-ui/icons/Info';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import HomeIcon from '@material-ui/icons/Home';

// core components
import CustomDropdown from "./CustomDropdown.js";
import Button from "./Button.js";

import styles from "../styles/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          // href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <HomeIcon className={classes.icons} /> Home
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Sign Up"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={CreateIcon}
          dropdownList={[
            // <Link to="/results-page" className={classes.dropdownLink}>
            //   Results
            // </Link>,
            <Link to="/signup-page" className={classes.dropdownLink}>
              Sign Up Test
            </Link>,
            // <Link to="/upload-page" className={classes.dropdownLink}>
            //   Upload Run
            // </Link>,
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfUD74OcYc7EbseXOV76P7tzyrLNVzsECin9LsARVfEQFfHLw/viewform?usp=sf_link"
              target="_blank"
              className={classes.dropdownLink}
            >
              Team
            </a>
            ,
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeXqvnAZfdSZ4hqwttJkPezMqE_yjFkGqcMU_UqVq9p8AIETQ/viewform?usp=sf_link"
              target="_blank"
              className={classes.dropdownLink}
            >
              Individual
            </a>
            
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <CloudUpload className={classes.icons} /> Upload Run
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          // href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <LiveHelpIcon className={classes.icons} /> FAQ
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/sutd.athletics/?hl=en"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
