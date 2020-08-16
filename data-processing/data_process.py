import pandas as pd
import numpy as np
from os import listdir
from os.path import isfile, join

class Data_process:
    def __init__(self, data_path):
        self.data_path = data_path
        self.data_array ={}
        self.data_by_year =[]
    def clean_up_data(self):
        for key in self.data_array.keys():
            if 'NONBINARY' not in self.data_array[key]:
                self.data_array[key]['NONBINARY'] = np.nan
            if 'STUDENTS_ENROLLED' in self.data_array[key]:
                self.data_array[key] = self.data_array[key].drop(columns=['STUDENTS_ENROLLED'])
            self.data_array[key] = self.data_array[key].applymap(lambda x: np.nan if not x else x)

    def set_up_data(self):
        data_files = [f for f in listdir(self.data_path) if isfile(join(self.data_path, f)) and len(f) <= 10]
        data_files = sorted(data_files)
        for i in range(len(data_files)):
            self.data_array[data_files[i]] = pd.read_json(self.data_path+"/"+data_files[i])
        self.clean_up_data()
        self.school_names = [d["School Name"] for d in self.data_array.values()] 
        self.allschoolnames = pd.concat(self.school_names).drop_duplicates().reset_index(drop=True)

    def merge_data(self):
        for year, data in self.data_array.items():
            currentYear = pd.merge(data, self.allschoolnames, on='School Name', how="outer")
            currentYear['SY'] = int(year[0:4])
            self.data_by_year.append(currentYear)

        all_merged = pd.concat(self.data_by_year)
        all_merged_json = all_merged.to_json("initial_data/final_data.json", orient='records')
        all_merged_json2 = all_merged.to_json("../src/data/final_data.json", orient='records')
    
def main():
    data = Data_process("initial_data")
    data.set_up_data()
    data.merge_data()

if __name__ == "__main__":
    main()
        
