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
5. Go to http://convertcsv.com/csv-to-json.htm and in input, select the CSV file you are adding
6. Select the option CSV to JSON Array
7. Download the Results and save as <Year>.json, so like 2019.json
    
### 3. Editing the repository

1. Go back to where the project is saved on the computer
2. In the folder spark-digital-equity/src/data/new data, add the <Year>.json file
3. In the folder spark-digital-equity/src, open the Constants.js file
4. The first line should look like: 
    ```export const YearList = [2017];```
5. Change the line by adding the new year: 
    ```export const YearList = [2017, 2019];```
6. Save file
    
### 4. Pushing changes to the live site

1. Go back to the Github Desktop application
2. The changes you have made to the repository should show up under changes
3. Click on "commit to master"

Finished!
