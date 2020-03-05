import sixteenData from "./new data/2016.json"
import seventeenData from "./new data/2017.json"
import eighteenData from "./new data/2018.json"

export const YearList = [2016, 2017, 2018];

function totalData() {

    let combined = sixteenData.concat(seventeenData).concat(eighteenData)
    console.log(combined)
    return combined
}
export default totalData();