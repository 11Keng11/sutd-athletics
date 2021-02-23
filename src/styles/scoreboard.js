const scoreboardStyle = theme => ({
  scoreboardHeader: {
    height: "15rem",
    width: "100%",
    background: 'linear-gradient(155deg, rgba(191,0,0,1) 0%, rgba(233,85,11,1) 37%, rgba(217,154,98,1) 72%)',
    boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
    textAlign: 'center',
    color: "white",
    fontWeight: 200,
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  scoreboardTextWrapper: {
    fontSize: "4rem",
    color: "white",
    fontVariant: "all-petite-caps",
    fontFamily: "Avenir, source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
  },
  scoreboardContentWrapper: {
    marginTop: 30,
    marginBottom: 80,
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    width: "90vw"
  },
  scoreboardTitleWrapper: {
    marginTop: 20,
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "20 20 20 20"
  },
  unverifiedText: {
    color: "rgba(0,0,0,0.5)"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 999999,
    color: '#fff',
  },
  loadText: {
    ...theme.typography.button,
    marginLeft: 10,
  },
  inputWrapper: {
    marginBottom: 10,
  },
  inputField: {
    width: "70vw",
    paddingLeft: 10
  }
})
export default scoreboardStyle