/*eslint-disable*/
import React from "react";

import Papa from "papaparse";

import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Backdrop, CircularProgress, Chip, InputBase, IconButton } from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import SearchIcon from '@material-ui/icons/Search';


import Header from "../components/Header.js";
import HeaderLinks from "../components/HeaderLinks.js";
import styles from "../styles/scoreboard.js";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { links } from "../links.js";

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

const UnverifiedTableCell = withStyles((theme) => ({
  root: {
    backgroundColor: "#e0e0e0",
    color: "#6d6d6d"
  },
}))

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

  const [timestamp, setTimestamp] = React.useState(0);
  const [nameMap, setNameMap] = React.useState(Object());
  const [tableData, setTableData] = React.useState([]);
  const [displayData, setDisplayData] = React.useState([]);
  const [individualSearch, setIndividualSearch] = React.useState('');
  const [teamData, setTeamData] = React.useState([]);
  const [displayTeamData, setDisplayTeamData] = React.useState([]);
  const [teamSearch, setTeamSearch] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    injectRunnerData(nameMap);
    getRunData();
    setIsLoading(true);
    var s = setInterval(() => {
      setTimestamp(timestamp => timestamp + 1);
    }, 1000);
    return () => clearInterval(s)
  }, [])

  React.useEffect(() => {
    injectRunnerData(nameMap);
    getRunData();
  }, [nameMap])

  React.useEffect(() => {
    if (timestamp % 300 === 0) {
      injectRunnerData(nameMap);
      getRunData();
    }
  }, [timestamp])

  React.useEffect(() => {
    setDisplayData(filterData(tableData, individualSearch, "individual"))
  }, [tableData])

  React.useEffect(() => {
    setDisplayTeamData(filterData(teamData, teamSearch, "team"))
  }, [teamData])

  const sortRunData = (runData) => {
    var sortedRunData = [];
    Object.keys(runData).forEach(k => {
      sortedRunData.push({
        sid: k,
        name: nameMap[k] === undefined ? 'loading...' : nameMap[k].name,
        distance: runData[k].distance.toFixed(2),
        unverifiedDistance: runData[k].unverifiedDistance.toFixed(2),
        team: runData[k].team,
      })
    })

    sortedRunData.sort((a, b) => {
      return b.distance - a.distance
    })

    for (var rank=1; rank<=sortedRunData.length; rank++) {
      sortedRunData[rank-1].rank = rank
    }
    setTableData(sortedRunData);
  }

  const sortTeamData = (teamDataObj) => {
    var sortedTeamData = [];
    Object.keys(teamDataObj).forEach(k => {
      sortedTeamData.push({
        team: k,
        distance: teamDataObj[k].distance.toFixed(2),
        unverifiedDistance: teamDataObj[k].unverifiedDistance.toFixed(2),
      })
    })

    sortedTeamData.sort((a, b) => {
      return b.distance - a.distance
    })

    for (var rank=1; rank<=sortedTeamData.length; rank++) {
      sortedTeamData[rank-1].rank = rank
    }
    
    setTeamData(sortedTeamData);
  }

  const getRunData = () => {
    Papa.parse(links.uploadRunLink, {
      download: true,
      header: true,
      skipEmptyLines: true,
      escapeChar: '"',
      complete: function(results) {
        setIsLoading(false);
        var data = results.data;
        var crrtRunData = Object();
        var teamDataObj = Object();
        data.forEach(d => {
          var timestamp = d["Timestamp"];
          if (timestamp === "" || timestamp === undefined || timestamp === null) {}
          else {
            var teamName = d["Team Name "];
            var sid = d["Student/Staff ID"];
            var distance = parseFloat(d["Distance clocked"]);
            var verified = d["Verified"] // TRUE or FALSE
            if (teamName in teamDataObj) {
              if (verified === "TRUE") {
                teamDataObj[teamName].distance += distance
              } else {
                teamDataObj[teamName].unverifiedDistance += distance
              }
            } else {
              if (teamName !== "Individual")
                if (verified === "TRUE") {
                  teamDataObj[teamName] = {
                    distance: distance,
                    unverifiedDistance: 0.00
                  }
                } else {
                  teamDataObj[teamName] = {
                    distance: 0.00,
                    unverifiedDistance: distance
                  }
                }
            }
            if (sid in crrtRunData) {
              if (verified === "TRUE") {
                crrtRunData[sid].distance += distance
              } else {
                crrtRunData[sid].unverifiedDistance += distance
              }
            } else {
              if (verified === "TRUE") {
                crrtRunData[sid] = {
                  team: teamName,
                  distance: distance,
                  unverifiedDistance: 0.00,
                }
              } else {
                crrtRunData[sid] = {
                  team: teamName,
                  distance: 0.00,
                  unverifiedDistance: distance,
                }
              }
            }
          }
        })
        sortTeamData(teamDataObj);
        sortRunData(crrtRunData);
      }
    })
  }

  const injectRunnerData = (nameMap) => {
    Papa.parse(links.signupDataLink, {
      download: true,
      header: true,
      fastMode: true,
      skipEmptyLines: true,
      complete: function(results) {
        var data = results.data;
        data.forEach(d => {
          var aloneStatus = d["Are you registering alone or for a group"]
          if (aloneStatus === "Alone") {
            var sid = d["Student / Staff ID "];
            var name = d["Name"];
            var email = d["Email"]
            if (!(sid in nameMap)) {
              nameMap[sid] = {
                name: name,
                email: email,
              }
            }
          } else if (aloneStatus === "Group") {
            for (var i of ["First", "Second", "Third", "Fourth", "Fifth"] ) {
              sid = d[`${i} Member Student / Staff ID`];
              name = d[`${i} Member Name`];
              email = d[`${i} Member Email`];
              if (!(sid in nameMap)) {
                nameMap[sid] = {
                  name: name,
                  email: email,
                }
              }
            }
          }
        })
        setNameMap(nameMap);
      }
    })
  }

  const filterData = (data, search, type) => {
    if (search === "" || search === null || search === undefined) return data;
    if (type === "individual") {
      var filteredData = data.filter(d => {
        return d.sid.includes(search) || d.name.toLowerCase().includes(search)
      });
      return filteredData
    }
    if (type === "team") {
      return data.filter(d => {
        return d.team.toLowerCase().includes(search)
      });
    }
  }

  const handleIndividualSearch = e => {
    var val = e.target.value === undefined ? "" : e.target.value;
    var searchVal = val.toLowerCase();
    setIndividualSearch(searchVal);
    var filteredData = filterData(tableData, searchVal, "individual");
    setDisplayData(filteredData);
  }

  const handleTeamSearch = e => {
    var val = e.target.value === undefined ? "" : e.target.value;
    var searchVal = val.toLowerCase();
    setTeamSearch(searchVal);
    var filteredData = filterData(teamData, searchVal, "team");
    setDisplayTeamData(filteredData);
  }

  return (
    <div style={{display: "flex", flexFlow: "column", alignItems: "center"}}>
      <Header
        color="transparent"
        brand="SUTD Athletics"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
            height: 100,
            color: "white"
        }}
      />
      
      <div className={classes.scoreboardHeader}>
        <div className={classes.scoreboardTextWrapper}>
          ScoreBoard
        </div>
        <Typography variant="body1">The leaderboard is refreshed every 5 minutes.</Typography>
      </div>
      <div className={classes.scoreboardContentWrapper}>
        <div className={classes.scoreboardTitleWrapper}>
          <PersonIcon color="secondary" />
          <Typography variant="h6" style={{marginLeft: 5}} >Individual Rank</Typography>
        </div>
        <Paper className={classes.inputWrapper}>
          <InputBase placeholder="Search by Student ID or Name..." className={classes.inputField} onChange={handleIndividualSearch} defaultValue="" />
          <IconButton onClick={handleIndividualSearch}>
            <SearchIcon />
          </IconButton>
        </Paper>
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
                <StyledTableCell>Unverified Distance (in km)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayData.map((d, idx) => {
                if (d.rank === 1) {
                  return <FirstTableRow key={idx}>
                    <TableCell>{d.rank}</TableCell>
                    <TableCell>{d.name}</TableCell>
                    <TableCell>{d.distance}</TableCell>
                    <TableCell><Chip label={d.team} variant="outlined" /></TableCell>
                    <TableCell><span className={classes.unverifiedText}>{d.unverifiedDistance}</span></TableCell>
                  </FirstTableRow>
                } else if (d.rank === 2) {
                  return <SecondTableRow key={idx}>
                    <TableCell>{d.rank}</TableCell>
                    <TableCell>{d.name}</TableCell>
                    <TableCell>{d.distance}</TableCell>
                    <TableCell><Chip label={d.team} variant="outlined" /></TableCell>
                    <TableCell><span className={classes.unverifiedText}>{d.unverifiedDistance}</span></TableCell>
                  </SecondTableRow>
                } else if (d.rank === 3) {
                  return <ThirdTableRow key={idx}>
                    <TableCell>{d.rank}</TableCell>
                    <TableCell>{d.name}</TableCell>
                    <TableCell>{d.distance}</TableCell>
                    <TableCell><Chip label={d.team} variant="outlined" /></TableCell>
                    <TableCell><span className={classes.unverifiedText}>{d.unverifiedDistance}</span></TableCell>
                  </ThirdTableRow>
                } else {
                  return <TableRow key={idx}>
                  <TableCell>{d.rank}</TableCell>
                  <TableCell>{d.name}</TableCell>
                  <TableCell>{d.distance}</TableCell>
                  <TableCell><Chip label={d.team} variant="outlined" /></TableCell>
                  <TableCell><span className={classes.unverifiedText}>{d.unverifiedDistance}</span></TableCell>
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
        <Paper className={classes.inputWrapper}>
          <InputBase placeholder="Search by Team Name..." className={classes.inputField} onChange={handleTeamSearch} defaultValue="" />
          <IconButton onClick={handleTeamSearch}>
            <SearchIcon />
          </IconButton>
        </Paper>
        <TableContainer component={Paper}>
          <Table style={{minWidth: 700}}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Rank</StyledTableCell>
                <StyledTableCell>Team Name</StyledTableCell>
                <StyledTableCell>Distance Ran (in km)</StyledTableCell>
                <StyledTableCell>Unverified Distance (in km)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayTeamData.map((d, idx) => 
                {
                  if (d.rank === 1) {
                    return <FirstTableRow key={idx}>
                      <TableCell>{d.rank}</TableCell>
                      <TableCell>{d.team}</TableCell>
                      <TableCell>{d.distance}</TableCell>
                      <TableCell><span className={classes.unverifiedText}>{d.unverifiedDistance}</span></TableCell>
                    </FirstTableRow>
                  } else if (d.rank === 2) {
                    return <SecondTableRow key={idx}>
                      <TableCell>{d.rank}</TableCell>
                      <TableCell>{d.team}</TableCell>
                      <TableCell>{d.distance}</TableCell>
                      <TableCell><span className={classes.unverifiedText}>{d.unverifiedDistance}</span></TableCell>
                    </SecondTableRow>
                  } else if (d.rank === 3) {
                    return <ThirdTableRow key={idx}>
                      <TableCell>{d.rank}</TableCell>
                      <TableCell>{d.team}</TableCell>
                      <TableCell>{d.distance}</TableCell>
                      <TableCell><span className={classes.unverifiedText}>{d.unverifiedDistance}</span></TableCell>
                    </ThirdTableRow>
                  } else {
                    return <TableRow key={idx}>
                    <TableCell>{idx+1}</TableCell>
                    <TableCell>{d.team}</TableCell>
                    <TableCell>{d.distance}</TableCell>
                    <TableCell><span className={classes.unverifiedText}>{d.unverifiedDistance}</span></TableCell>
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