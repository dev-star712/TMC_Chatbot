import requests
import json
from os.path import join
from config import (VEHICLE_WITH_VIDEO_JSON)
from tmc_sales_bot.sql_utils import create_database, read_vehicle_data


def update_video_json(info):
    payload = {}
    headers = {}
    response = requests.request("GET", info["URLS"]["GET_STOCK_URL"], headers=headers, data=payload)
    result = response.json()
    with open(join(VEHICLE_WITH_VIDEO_JSON, info["Name"]+".json"), 'w') as f:
        json.dump(result, f, indent=4)


def update_sql_db(info):
    data = read_vehicle_data(info)
    create_database(data, info)
