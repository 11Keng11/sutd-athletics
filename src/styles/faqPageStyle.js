import { title } from "./coreStyles.js";

const faqPageStyle = {
    section: {
        // padding: "70px 0",
        textAlign: "left",
        backgroundColor: "black"
        },
    title: {
        ...title,
        marginBottom: "1rem",
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none",
        color: "white"
    },
    description: {
        color: "white"
    }
};

export default faqPageStyle;