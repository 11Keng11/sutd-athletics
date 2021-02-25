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
import ScoreIcon from '@material-ui/icons/Score';

// core components
import CustomDropdown from "./CustomDropdown.js";
import Button from "./Button.js";
import {links, createPrefilledLink} from "../links.js";

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
  const [sidMap, setSidMap] = React.useState(Object());
  const [isLoading, setIsLoading] = React.useState(false);

  // Runner Data
  React.useEffect(() => {
    getRunnerData()
  }, [])

  React.useEffect(() => {
    if(props.openUpload === true) setOpen(true)
  },[props.openUpload])

  const getRunnerData = () => {
    Papa.parse(links.signupDataLink, {
      download: true,
      header: true,
      complete: function(results) {
        var data = results.data;
        var sids = sidMap;
        data.forEach(d => {
          var aloneStatus = d["Are you registering alone or for a group"]
          if (aloneStatus === "Alone") {
            var sid = d["Student / Staff ID "];
            var name = d["Name"];
            sids[sid] = {
              name: name,
              team: "Individual"
            }
          } else if (aloneStatus === "Group") {
            for (var i of ["First", "Second", "Third", "Fourth", "Fifth"] ) {
              sid = d[`${i} Member Student / Staff ID`];
              name = d[`${i} Member Name`];
              var teamName = d["Group Name"];
              sids[sid] = {
                name: name,
                team: teamName,
              }
            }
          }
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
    if (studentID === "" || studentID === undefined || studentID === null) {
      setHasError(true);
      setErrorText("Please enter your Student ID!")
      return
    }
    var sid = studentID;
    getRunnerData();
    setIsLoading(true);
    setTimeout(() => {
      if (sid in sidMap) {
        setIsLoading(false);
        setStudentID("");
        handleClose();
        var teamName = sidMap[sid].team
        var url = createPrefilledLink(sid, teamName)
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
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        fullWidth="70vw"
      >
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color="inherit" />
          <div className={classes.loadText}>Searching For Your Existence...</div>
        </Backdrop>
        <DialogTitle>
          Enter your Student ID:
        </DialogTitle>
        <DialogContent>
          <TextField style={{width: "100%"}} label="Student ID" variant="outlined" color="secondary" helperText={errorText} error={hasError} onChange={onStudentIDChange} value={studentID} onKeyPress={handleEnter} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="danger">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Link
            color="transparent"
            to="/sutd-athletics"
            className={classes.navLink}
          >
            <HomeIcon className={classes.icons} /> Home
          </Link>
        </ListItem>
        
        <ListItem className={classes.listItem}>
          <Link
            color="transparent"
            className={classes.navLink}
            onClick={() => {window.open(links.signupLink, "_blank")}}
            to="#"
          >
              <CreateIcon className={classes.icons} /> Sign Up
          </Link>
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
          <Link to="/scoreboard-page" className={classes.navLink}>
            <ScoreIcon className={classes.icons} /> Scoreboard
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
            <Link to="/faq-page" className={classes.navLink}>
            <LiveHelpIcon className={classes.icons} /> FAQ
            </Link>
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