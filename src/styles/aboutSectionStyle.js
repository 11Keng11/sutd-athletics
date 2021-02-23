import { defaultFont } from "./coreStyles.js";
import { title } from "./coreStyles.js";


const aboutSectionStyle = theme => ({
    section: {
        // padding: "70px 0",
        textAlign: "left"
    },
    title: {
        ...title,
        marginBottom: "1rem",
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none"
    },
    light: {
        backgroundColor: "#ffebee",
        height: "40vh",
        
    },
    header: {
        textAlign: "center",
    },
    dividerHor: {
        border: '2px solid #f44336',
        marginTop: '0',
        marginBottom: '0',
        width: '15px',
        height: '15px'
    },
    
});

export default aboutSectionStyle;
