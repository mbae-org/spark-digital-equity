import allData from "./final_data.json"

function totalData() {
    return allData;
}
const lower = allData[0]["SY"];
const upper = allData[allData.length - 1]["SY"];
const YearList = [];
for (let i = lower; i <= upper; i++) {
    YearList.push(i);
}
export { YearList };
export default totalData();
