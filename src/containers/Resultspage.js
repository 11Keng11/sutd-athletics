/*eslint-disable*/
import React from "react";

import Papa from "papaparse";

import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Backdrop, CircularProgress, Chip } from '@material-ui/core';

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

const FirstTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: "#ffb791",
  },
}))(TableRow);

const SecondTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: "#ffd3bc",
  },
}))(TableRow);

const ThirdTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: "#ffece2",
  },
}))(TableRow);


export default function ResultsPage(props) {
  const classes = useStyles();

  const [nameMap, setNameMap] = React.useState(Object());
  const [tableData, setTableData] = React.useState([]);
  const [teamData, setTeamData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    injectIndividualData();
    injectTeamData();
    getRunData()
  }, [])

  const sortRunData = (runData) => {
    var sortedRunData = [];
    Object.keys(runData).forEach(k => {
      sortedRunData.push({
        sid: k,
        name: nameMap[k] === undefined ? 'loading...' : nameMap[k].name,
        distance: runData[k].distance.toFixed(2),
        team: runData[k].team,
      })
    })

    sortedRunData.sort((a, b) => {
      return b.distance - a.distance
    })
    
    if (sortedRunData.length >= tableData.length) {
      setTableData(sortedRunData);
    }
    setTimeout(() => {
      getRunData();
    }, 5000);
  }

  const sortTeamData = (teamDataObj) => {
    var sortedTeamData = [];
    Object.keys(teamDataObj).forEach(k => {
      sortedTeamData.push({
        team: k,
        distance: teamDataObj[k].distance.toFixed(2),
      })
    })

    sortedTeamData.sort((a, b) => {
      return b.distance - a.distance
    })
    
    if (sortedTeamData.length >= tableData.length) {
      setTeamData(sortedTeamData);
    }
    console.log(sortedTeamData);
  }

  const getRunData = () => {
    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vQG3JrF-J-4JASpoqQeU9LZq3mhC7on8_JVmDUh83DU1yZLNoB68rtrUOFuCPXSdCcnvm6ad51zyWhZ/pub?gid=29592829&single=true&output=csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        setIsLoading(false);
        var data = results.data;
        var crrtRunData = Object();
        var teamDataObj = Object();
        data.forEach(d => {
          var teamName = d["Team Name"];
          var sid = d["Student ID"];
          var distance = parseFloat(d["Distance Ran (in km, max 2dp, e.g. 2.40km)"]);
          if (teamName in teamDataObj) {
            teamDataObj[teamName].distance += distance
          } else {
            teamDataObj[teamName] = {
              distance: distance
            }
          }
          if (sid in crrtRunData) {
            crrtRunData[sid].distance += distance
          } else {
            crrtRunData[sid] = {
              team: teamName,
              distance: distance
            }
          }
        })
        sortTeamData(teamDataObj);
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
            height: 200,
            color: "white"
        }}
      />
      
      <div className={classes.scoreboardHeader}>
        <div className={classes.scoreboardTextWrapper}>
          ScoreBoard
        </div>
        <div>The leaderboard is refreshed every 5 seconds.</div>
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
              {tableData.map((d, idx) => {
                if (idx+1 === 1) {
                  return <FirstTableRow key={idx}>
                    <TableCell>{idx+1}</TableCell>
                    <TableCell>{d.name}</TableCell>
                    <TableCell>{d.distance}</TableCell>
                    <TableCell><Chip label={d.team} variant="outlined" /></TableCell>
                  </FirstTableRow>
                } else if (idx+1 === 2) {
                  return <SecondTableRow key={idx}>
                    <TableCell>{idx+1}</TableCell>
                    <TableCell>{d.name}</TableCell>
                    <TableCell>{d.distance}</TableCell>
                    <TableCell><Chip label={d.team} variant="outlined" /></TableCell>
                  </SecondTableRow>
                } else if (idx+1 === 3) {
                  return <ThirdTableRow key={idx}>
                    <TableCell>{idx+1}</TableCell>
                    <TableCell>{d.name}</TableCell>
                    <TableCell>{d.distance}</TableCell>
                    <TableCell><Chip label={d.team} variant="outlined" /></TableCell>
                  </ThirdTableRow>
                } else {
                  return <TableRow key={idx}>
                  <TableCell>{idx+1}</TableCell>
                  <TableCell>{d.name}</TableCell>
                  <TableCell>{d.distance}</TableCell>
                  <TableCell><Chip label={d.team} variant="outlined" /></TableCell>
                </TableRow>
                }
              }
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <div className={classes.scoreboardTitleWrapper}>
          <GroupIcon color="secondary" />
          <Typography variant="h6" style={{marginLeft: 5}} >Team Rank</Typography>
        </div>

        <TableContainer component={Paper}>
          <Table style={{minWidth: 700}}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Rank</StyledTableCell>
                <StyledTableCell>Team Name</StyledTableCell>
                <StyledTableCell>Distance Ran (in km)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamData.map((d, idx) => 
                {
                  if (idx+1 === 1) {
                    return <FirstTableRow key={idx}>
                      <TableCell>{idx+1}</TableCell>
                      <TableCell>{d.team}</TableCell>
                      <TableCell>{d.distance}</TableCell>
                    </FirstTableRow>
                  } else if (idx+1 === 2) {
                    return <SecondTableRow key={idx}>
                      <TableCell>{idx+1}</TableCell>
                      <TableCell>{d.team}</TableCell>
                      <TableCell>{d.distance}</TableCell>
                    </SecondTableRow>
                  } else if (idx+1 === 3) {
                    return <ThirdTableRow key={idx}>
                      <TableCell>{idx+1}</TableCell>
                      <TableCell>{d.team}</TableCell>
                      <TableCell>{d.distance}</TableCell>
                    </ThirdTableRow>
                  } else {
                    return <TableRow key={idx}>
                    <TableCell>{idx+1}</TableCell>
                    <TableCell>{d.team}</TableCell>
                    <TableCell>{d.distance}</TableCell>
                  </TableRow>
                  }
                })
                }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}