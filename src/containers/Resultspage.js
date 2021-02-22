/*eslint-disable*/
import React from "react";

import Papa from "papaparse";

import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Backdrop, CircularProgress } from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';

import Header from "../components/Header.js";
import HeaderLinks from "../components/HeaderLinks.js";
import styles from "../styles/scoreboard.js";
import { withStyles, makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(styles);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


export default function ResultsPage(props) {
  const classes = useStyles();

  const [nameMap, setNameMap] = React.useState(Object());
  const [tableData, setTableData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    injectIndividualData();
    injectTeamData();
    setInterval(getRunData.bind(this), 2000);
  }, [])

  const sortRunData = (runData) => {
    var crrtRunData = runData;
    var sortedRunData = [];
    Object.keys(crrtRunData).forEach(k => {
      sortedRunData.push({
        sid: k,
        name: nameMap[k] === undefined ? 'loading...' : nameMap[k].name,
        distance: runData[k] === undefined ? 0.00 : runData[k].distance.toFixed(2),
        team: runData[k] === undefined ? 'loading...' : runData[k].team,
      })
    })
    sortedRunData.sort((a, b) => {
      return b.distance - a.distance
    })
    
    if (sortedRunData.length >= tableData.length) setTableData(sortedRunData);
  }

  const getRunData = () => {
    setIsLoading(false);
    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vQG3JrF-J-4JASpoqQeU9LZq3mhC7on8_JVmDUh83DU1yZLNoB68rtrUOFuCPXSdCcnvm6ad51zyWhZ/pub?gid=29592829&single=true&output=csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        var data = results.data;
        var crrtRunData = Object();
        data.forEach(d => {
          var teamName = d["Team Name"];
          var sid = d["Student ID"];
          var distance = parseFloat(d["Distance Ran (in km, max 2dp, e.g. 2.40km)"]);
          if (sid in crrtRunData) {
            crrtRunData[sid].distance += distance
          } else {
            crrtRunData[sid] = {
              team: teamName,
              distance: distance
            }
          }
        })
        sortRunData(crrtRunData);
      }
    })
  }

  const injectTeamData = () => {
    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vQG3JrF-J-4JASpoqQeU9LZq3mhC7on8_JVmDUh83DU1yZLNoB68rtrUOFuCPXSdCcnvm6ad51zyWhZ/pub?gid=465189133&single=true&output=csv", {
      download: true,
      header: true,
      fastMode: true,
      skipEmptyLines: true,
      complete: function(results) {
        var data = results.data;
        var crrtNameMap = nameMap;
        data.forEach(d => {
          for (var i=1; i<=5; i++) {
            var id = d[`Student ID (Member ${i})`];
            var name = d[`Name (Member ${i})`];
            var email = d[`Email (Member ${i})`];
            if (!(id in crrtNameMap)) {
              crrtNameMap[id] = {
                name: name,
                email: email,
              }
            }
          }
        })
        setNameMap(crrtNameMap);
      }
    })
  }

  const injectIndividualData = () => {
    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vQG3JrF-J-4JASpoqQeU9LZq3mhC7on8_JVmDUh83DU1yZLNoB68rtrUOFuCPXSdCcnvm6ad51zyWhZ/pub?gid=1779625534&single=true&output=csv", {
      download: true,
      header: true,
      fastMode: true,
      skipEmptyLines: true,
      complete: function(results) {
        var data = results.data;
        var crrtNameMap = nameMap;
        data.forEach(d => {
          var sid = d["Student ID"];
          var name = d["Name"];
          var email = d["Email address"]
          if (!(sid in crrtNameMap)) {
            crrtNameMap[sid] = {
              name: name,
              email: email,
            }
          }
        })
        setNameMap(crrtNameMap);
      }
    })
  }

  return (
    <div style={{display: "flex", flexFlow: "column", alignItems: "center"}}>
      <Header
        color="transparent"
        brand="SUTD Athletics"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
            height: 400,
            color: "white"
        }}
        />
      <div className={classes.scoreboardHeader}>
        <div className={classes.scoreboardTextWrapper}>
          ScoreBoard
        </div>
      </div>
      <div className={classes.scoreboardContentWrapper}>
        <div className={classes.scoreboardTitleWrapper}>
          <PersonIcon color="secondary" />
          <Typography variant="h6" style={{marginLeft: 5}} >Individual Rank</Typography>
        </div>
        <TableContainer component={Paper}>
          <Backdrop className={classes.backdrop} open={isLoading}>
            <CircularProgress color="inherit" />
            <div className={classes.loadText}>Working hard to update the rank...</div>
          </Backdrop>
          <Table style={{minWidth: 700}}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Rank</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Distance Ran (in km)</StyledTableCell>
                <StyledTableCell>Team</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((d, idx) => 
                (<TableRow key={idx}>
                  <TableCell>{idx+1}</TableCell>
                  <TableCell>{d.name}</TableCell>
                  <TableCell>{d.distance}</TableCell>
                  <TableCell>{d.team}</TableCell>
                </TableRow>)
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <div className={classes.scoreboardTitleWrapper}>
          <GroupIcon color="secondary" />
          <Typography variant="h6" style={{marginLeft: 5}} >Team Rank</Typography>
        </div>
      </div>
    </div>
  )
}