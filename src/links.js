export const links = 
    {
        signupDataLink: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTTQJzLxVBDiQqFoFcmeUQ29bjCu9-Dc4N6aJ3CaT44PorzTvtQ20-5YrqmNaVCuJv48gM5PVbaz_XX/pub?gid=979440635&single=true&output=csv",
        uploadRunLink: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSbdwcsvMI-LPl8Xkgesi8bPSlUMYbi6t0K2L78bg1M4SxQrA8EKPvJ5TrrN8aJrvVTKsfhg8ESJM-p/pub?gid=268085058&single=true&output=csv",
        signupLink: "https://docs.google.com/forms/d/e/1FAIpQLScuCxVXkI5Y_vd83atIciQqierdJvN0mBdjCzDWD4TdXRAlBw/viewform?usp=sf_link"
    };

export function createPrefilledLink(studentID, teamName) {
    return `https://docs.google.com/forms/d/e/1FAIpQLSeZoovgvZi1xNoAohdf2eioVsJU0FJ9Yf1dzzDm953qcAXfHQ/viewform?usp=pp_url&entry.605302557=${studentID}&entry.339169974=${encodeURIComponent(teamName)}`
}