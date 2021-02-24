import { defaultFont } from "./coreStyles.js";
import { title } from "./coreStyles.js";


const aboutSectionStyle = theme => ({
    section: {
        // padding: "0 20px",
        textAlign: "left"
    },
    title: {
        ...title,
        marginBottom: "1rem",
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none",
        textAlign: "center",

    },
    light: {
        backgroundColor: "#ffebee",
        height: "45vh",
        padding: "0 2vw",
        textAlign: "center",
        
    },
    white: {
        height: "45vh",
        padding: "0 2vw",
        textAlign: "center",
    },
    header: {
        textAlign: "center",
        padding: "0 2vw",
    },
    dividerHor: {
        border: '2px solid #f44336',
        marginTop: '0',
        marginBottom: '0',
        width: '15px',
        height: '15px'
    },
    icons:{
        display: "inline-flex",
        position: "relative",
        height: "10vh",
    },
    navLink: {
        color: "white",
        position: "relative",
        padding: "0.9375rem",
        fontWeight: "400",
        fontSize: "12px",
        textTransform: "uppercase",
        borderRadius: "3px",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex",
        "&:hover,&:focus": {
          color: "inherit",
          background: "rgba(255, 121, 97, 0.5)"
        },
    },
    description: {
        color: '#999'
    }
    
});

export default aboutSectionStyle;
