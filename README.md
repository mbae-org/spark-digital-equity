## spark-digital-equity

## Adding new year of data

### 1. Access the repository

1. Download Github Desktop
    https://desktop.github.com 
2. Open Github Desktop and select Clone repository from internet
3. Sign In using Github.com account
4. Repositories should be shown now, including jpjosephh/spark-digital-equity. Click that link and clone.

### 2. Getting data in usuable form

There is examples of what the final CSV file should look like in the repository. To access them:
1. In Github Desktop, have the spark-digital-equity repository open
2. Click on view files in respository in Finder (may be different option for non macOS users)
3. Click into the src folder, then the data folder, and finally the Excel folder
4. 2017.csv is the format that all CSV files should be in. You can create this csv file manually from all of the excel sheets given. If there is someone expereienced with python and pandas, there is a juypter notebook in the data-processing folder that can be used to take the different CSV files and turn it into one.
5. Manually add in the Massachusettes row by summing all the colums. Refer to the 2017.CSV file to see the format
5. Go to http://convertcsv.com/csv-to-json.htm and in input, select the CSV file you are adding
6. Select the option CSV to JSON Array
7. Download the Results and save as <Year>.json, assume for this example we are assing 2019 data, so 2019.json
8. Ensure that empty fields are saved as null, not {}. If empty field values are saved as {}, use Find and Replace to replace with null.
    
### 3. Editing the repository

1. Go back to where the project is saved on the computer
2. In the folder spark-digital-equity/src/data/new data, add the 2019.json file
3. In the folder spark-digital-equity/src/data, and open TotalData.js
4. Add the following line to import data from the 2019.json file
```
import nineteenData from "./new data/2019.json"
```
5. Add 2019 to YearList
```
export const YearList = [2016,2017, 2018, 2019];
```
6. Add nineteenData to be added to the combined data variable
```
let combined = seventeenData.concat(eighteenData).concat(nineteenData)
```
7. Save changes

### 4. Pushing changes to the live site

1. Go back to the Github Desktop application
2. The changes you have made to the repository should show up under changes
3. On the top, click on "Pull Orgin"/ "Fetch Orgin"
4. Click on "commit to master"
5. Click on "Push remote"

Finished!
