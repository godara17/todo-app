
class Util {
    constructor(props) {
    }

    getDateString(date) {
        let dateObj = new Date(date);
        return dateObj.toLocaleDateString() + " " + dateObj.toLocaleTimeString("en-US") + " ";
    }
}

const util = new Util();
export default util;
