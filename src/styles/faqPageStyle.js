
import { container, title } from "./coreStyles.js";

const faqPageStyle = (theme) => ({
    root: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    section: {
        // padding: "70px 0",
        textAlign: "left",
        backgroundColor: 'transparent',
        padding: "70px 20px",
        
    },
    title: {
        marginBottom: "1rem",
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none",
        color: "black",

    },
    description: {
        color: "black",

    },
    background: {
        minWidth: '100vw',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center center',
        position: 'fixed',
    },
    main: {
        // background: "#FFFFFF",
        background: "#ffebee99",
        position: "relative",
        zIndex: "3",
    },
    mainRaised: {
        margin: "0px 150px 0px",
        borderRadius: "6px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    container: {
        zIndex: "9",
        color: "#FFFFFF00",
        
        ...container
    },

});

export default faqPageStyle;