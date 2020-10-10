from google.cloud import storage
import tempfile as tempfile
import numpy as np
import pandas as pd
import requests
import os


async def data_process(event, context):
    """Background Cloud Function to be triggered by Cloud Storage.
       This generic function logs relevant data when a file is changed.

    Args:
        event (dict):  The dictionary with data specific to this type of event.
                       The `data` field contains a description of the event in
                       the Cloud Storage `object` format described here:
                       https://cloud.google.com/storage/docs/json_api/v1/objects#resource
        context (google.cloud.functions.Context): Metadata of triggering event.
    Returns:
        None; the output is written to Stackdriver Logging
    """
    print(event['name'])
    if event['name'] == "newDataFile":
        tempFilePath = tempfile.mkdtemp()
        storage_client = storage.Client()

        bucket = storage_client.bucket("digital-equity.appspot.com")
        blobNew = bucket.blob("newDataFile")
        blobNew.download_to_filename(tempFilePath+"/newDataFile.json")
        blobOld = bucket.blob("totalDataFile")
        blobOld.download_to_filename(tempFilePath+"/totalDataFile.json")

        # cleaning up the data
        data_array = [pd.read_json(
            tempFilePath+"/newDataFile.json"), pd.read_json(tempFilePath+"/totalDataFile.json")]
        if 'School Name' in data_array[0].columns:
            print('data not found')
            data_array[0] = data_array[0].applymap(
                lambda x: np.nan if not x else x)
            school_names = [d["School Name"] for d in data_array]
            allschoolnames = pd.concat(
                school_names).drop_duplicates().reset_index(drop=True)
            currentYear = pd.merge(
                data_array[0], allschoolnames, on='School Name', how="outer")
            data_array[0] = currentYear
            currentTempYear = currentYear['SY'][0]
            all_merged = pd.concat(data_array)
            all_merged.to_json(
                tempFilePath+"/totalDataFile2.json", orient='records')
            tempYear = all_merged.at[len(data_array[1])-1, 'SY']
            renameYear = max(currentTempYear, tempYear)
            # renaming the old
            new_blob = bucket.rename_blob(
                blobOld, "totalDataFile"+str(renameYear))

            print("Blob {} has been renamed to {}".format(
                blobOld.name, new_blob.name))

            # uploading new file
            updatedTotal = bucket.blob("totalDataFile")
            updatedTotal.upload_from_filename(
                tempFilePath+"/totalDataFile2.json")

            print(
                "File {} uploaded to {}.".format(
                    tempFilePath+"/totalDataFile2.json", "totalDataFile"
                )
            )
            data = {"downloadURL": updatedTotal.public_url}
            headers = {"Accept":  "application/vnd.github.everest-preview+json",
                       "Content-Type": "application/json",
                       "Authorization": "token" + os.environ.get('access_token')}
            requests.post(
                "https://api.github.com/repos/mbae-org/spark-digital-equity/actions/workflows/build.yml/dispatches", headers=headers, data=data)
    else:
        print("did not update")
