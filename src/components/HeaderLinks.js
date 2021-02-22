/*eslint-disable*/
import React from "react";

import Papa from "papaparse";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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

function PaperComponent(props) {
  return (
    <Paper {...props} />
  );
}

export default function HeaderLinks(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [studentID, setStudentID] = React.useState('');
  const [hasError, setHasError] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const [teamData, setTeamData] = React.useState([]);
  const [individualData, setIndividualData] = React.useState([]);
  const [sidMap, setSidMap] = React.useState(Object());
  const [isLoading, setIsLoading] = React.useState(false);

  // Teams
  React.useEffect(() => {
    getTeamData()
  }, [])

  // Individuals
  React.useEffect(() => {
    getIndividualData()
  }, [])

  const getTeamData = () => {
    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vQG3JrF-J-4JASpoqQeU9LZq3mhC7on8_JVmDUh83DU1yZLNoB68rtrUOFuCPXSdCcnvm6ad51zyWhZ/pub?gid=465189133&single=true&output=csv", {
      download: true,
      header: true,
      complete: function(results) {
        var data = results.data;
        setTeamData(data);
        var sids = sidMap;
        teamData.forEach(d => {
          for (var i=1; i<=5; i++) {
            var id = `Student ID (Member ${i})`;
            var teamName = "Team Name";
            sids[d[id]] = d[teamName]
          }
        })
        setSidMap(sids);
      }
    })
  }

  const getIndividualData = () => {
    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vQG3JrF-J-4JASpoqQeU9LZq3mhC7on8_JVmDUh83DU1yZLNoB68rtrUOFuCPXSdCcnvm6ad51zyWhZ/pub?gid=1779625534&single=true&output=csv", {
      download: true,
      header: true,
      complete: function(results) {
        var data = results.data;
        setIndividualData(data);
        var sids = sidMap;
        individualData.forEach(d => {
          var id = "Student ID";
          var teamName = "Individual";
          sids[d[id]] = teamName;
        })
        setSidMap(sids);
      }
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
    setErrorText("");
    setHasError(false);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorText("");
    setHasError(false);
  };

  const onStudentIDChange = e => {
    var studentId = e.target.value;
    setStudentID(studentId);
  }

  const handleEnter = e => {
    if (e.code === "Enter") {
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    if (studentID === "") {
      setHasError(true);
      setErrorText("Please enter your Student ID!")
      return
    }
    var sid = studentID;
    getIndividualData();
    getTeamData();
    setIsLoading(true);
    setTimeout(() => {
      if (sid in sidMap) {
        setIsLoading(false);
        setStudentID("");
        handleClose();
        var teamName = encodeURIComponent(sidMap[sid])
        var url = `https://docs.google.com/forms/d/e/1FAIpQLScah9au6KKadhfJ4EmuLWE1tTYnwkYT6XQvLx56Q-7FLVSshw/viewform?usp=pp_url&entry.523247645=${teamName}&entry.1534597416=${sid}`
        window.open(url, "_blank")
      } else {
        setHasError(true);
        setErrorText("Student ID does not exist! Please sign up first!");
        setIsLoading(false);
        setStudentID("");

      }
    }, Math.random(1) * 1000 + 3000);
  }

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
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
      >
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color="inherit" />
          <div className={classes.loadText}>Searching For Your Existence...</div>
        </Backdrop>
        <DialogTitle>
          Enter your Student ID:
        </DialogTitle>
        <DialogContent>
          <TextField style={{width: "20vw"}} label="Student ID" variant="outlined" color="secondary" helperText={errorText} error={hasError} onChange={onStudentIDChange} value={studentID} onKeyPress={handleEnter} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="danger">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Button
            // href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            <InfoIcon className={classes.icons} /> Run Info
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <CustomDropdown
            hoverColor="danger"
            noLiPadding
            buttonText="Sign Up"
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={CreateIcon}
            dropdownList={[
              <Link to="/signup-page" className={classes.dropdownLink}>
                Sign Up Test
              </Link>,
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
            color="transparent"
            className={classes.navLink}
            onClick={handleClickOpen}
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
    </div>
  );
}
