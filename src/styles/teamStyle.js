import { cardTitle, title } from "./coreStyles.js";
import imagesStyle from "./imagesStyles.js";

const teamStyle = {
  section: {
    padding: "70px 0",
    textAlign: "center",
    backgroundColor: "transparent",
    // backgroundImage: 'url(../assets/images/Background2.jpg)',
    // backgroundPosition: 'center',
    // backgroundSize: 'cover',
    // backgroundAttachment: 'fixed'
    justify: 'center',
    // top: '-100vh',
    position: 'relative',
    
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  title2: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    color: "white"
  },
  description2: {
    color: "white",
  },
  ...imagesStyle,
  itemGrid: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  cardTitle,
  smallTitle: {
    color: "#6c757d"
  },
  description: {
    color: "#999"
  },
  justifyCenter: {
    justifyContent: "center !important"
  },
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
    color: "#999"
  },
  margin5: {
    margin: "5px"
  },
  card: {
    // backgroundColor: '',
  },
  background: {
    minWidth: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat:'no-repeat',
    backgroundPosition:'center center',
    position: 'fixed',
    
    
    // backgroundImage: 'url(../assets/images/Background2.jpg)',
    // backgroundPosition: 'center',
    // backgroundSize: 'cover',
    // backgroundAttachment: 'fixed',
    // height: '100vh',
  },
  head: {
    backgroundColor: '#e53e3e',
    // width: '70vw',
    
  }
};

export default teamStyle;
