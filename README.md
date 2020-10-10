# spark-digital-equity

[![Actions Status](https://github.com/mbae-org/spark-digital-equity/workflows/Build/badge.svg)](https://github.com/mbae-org/spark-digital-equity/actions)
[![License](http://img.shields.io/badge/License-MIT-brightgreen.svg)](./LICENSE)

## Adding new year of data

### 1. Access the repository

1. Download Github Desktop
    <https://desktop.github.com>
2. Open Github Desktop and select Clone repository from internet
3. Sign In using Github.com account
4. Repositories should be shown now, including jpjosephh/spark-digital-equity. Click that link and clone.

### 2. Getting data in usable form

There is examples of what the final CSV file should look like in the repository. To access them:

1. In Github Desktop, have the spark-digital-equity repository open
2. Click on view files in respository in Finder (may be different option for non macOS users)
3. Click into the src folder, then the data folder, and finally the Excel folder
4. 2017.csv is the format that all CSV files should be in. You can create this csv file manually from all of the excel sheets given. If there is someone experienced with python and pandas, there is a juypter notebook in the data-processing folder that can be used to take the different CSV files and turn it into one.
5. Manually add in the Massachusetts row by summing all the columns. Refer to the 2017.CSV file to see the format
6. Go to <http://convertcsv.com/csv-to-json.htm> and in input, select the CSV file you are adding
7. Select the option CSV to JSON Array
8. Download the Results and save as Year.json, assume for this example we are assing 2019 data, so 2019.json
9. Ensure that empty fields are saved as null, not {}. If empty field values are saved as {}, use Find and Replace to replace with null.
10. - the json file should be formatted with following following columns
        - STUDENTS_ENROLLED
        - AA 
        - AS 
        - District 
        - ELL
        - EcoDis
        - FEMALE
        - HI
        - MALE
        - MR
        - NA
        - NH_PI
        - NONBINARY
        - ORG_CODE
        - SWD
        - SY
        - School Code
        - School Name
        - Score=1
        - Score=2
        - Score=3
        - Score=4
        - Score=5
        - Tests Taken
        - WH
    ```

### 3. Uploading the file
    
3. On the website, there is a section for admin login on the left hand side. After logging with admin credentials, there is a upload file button. IMPORTANT: Make sure select the correct json file, with the proper columns and is the right year. Click submit to upload the file. 

### 4. Pushing changes to the live site

4. After clicking submit, it will take around 5 - 10 for the change to reflect on the live site. If the changes are not being made, then either the wrong formatted file are being uploaded, or something went wrong check back with tech team. 

Finished!
