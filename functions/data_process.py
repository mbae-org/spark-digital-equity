import pandas as pd
import numpy as np
from os import listdir
from os.path import isfile, join


class Data_process:
    def __init__(self, data_path, data_files):
        self.data_path = data_path
        self.data_files = data_files
        self.data_array = []
        self.data_by_year = []

    def clean_up_data(self):
        for i in range(len(self.data_array)):
            self.data_array[i] = self.data_array[i].applymap(
                lambda x: np.nan if not x else x)

    def set_up_data(self):
        for i in range(len(self.data_files)):
            self.data_array.append(pd.read_json(
                self.data_path+"/"+self.data_files[i]))
        self.clean_up_data()
        self.school_names = [d["School Name"]
                             for d in self.data_array]
        self.allschoolnames = pd.concat(
            self.school_names).drop_duplicates().reset_index(drop=True)

    def merge_data(self):
        tempYear = self.data_array[1].at[0, 'SY']
        currentYear = pd.merge(
            self.data_array[0], self.allschoolnames, on='School Name', how="outer")
        currentYear['SY'] = tempYear
        self.data_by_year.append(currentYear)

        all_merged = pd.concat(self.data_by_year)
        all_merged.to_json(
            self.data_array[1], orient='records')
        all_merged.to_json("src/data/final_data2.json", orient='records')


def main(dataPath, dataFile):
    data = Data_process(dataPath,
                        dataFile)
    data.set_up_data()
    data.merge_data()


if __name__ == "__main__":
    main()
