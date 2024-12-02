from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Security, status, Depends, Header
from fastapi.security import APIKeyHeader
from typing import List, Optional
from pydantic import BaseModel
from typing import Dict, Any, Union
from os import environ
import uvicorn
import json
from config import (load_env)

load_env()

from tmc_sales_bot.models.bot import ChatBot
from tmc_sales_bot.hook.update_fixture import update_sql_db, update_video_json
from tmc_sales_bot.services.pinecone import upsert_pinecone, delete_pinecone, upsert_pinecone_vehicle
from tmc_sales_bot.utils import getCompanyInfo

app = FastAPI()

api_keys = [
    environ["FAST_API_KEY"]
]

api_key_header = APIKeyHeader(name="X-API-Key")

def get_api_key(api_key_header: str = Security(api_key_header)) -> str:
    if api_key_header in api_keys:
        return api_key_header
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or missing API Key",
    )


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

bot = ChatBot()
app.bot = bot

class HistoryItem(BaseModel):
    isBot: bool
    text: str
    time: str

class Query(BaseModel):
    query: str
    phone_number: str
    focusedVehicle: Optional[str] = None
    history: List[HistoryItem]
    location: Optional[str] = None
    state: Optional[Dict[str, Any]] = None


class MetaData(BaseModel):
    id: str
    category: str = None


class UpsertSchema(BaseModel):
    text: str
    metadata: MetaData


class DeleteSchema(BaseModel):
    metadata: Dict[str, Union[int, float, str, list, Dict[str, Any]]]


class VehicleSchema(BaseModel):
    vehicle: Dict[str, Union[int, float, str, list, Dict[str, Any]]]
    metadata: MetaData


class Vehicles(BaseModel):
    vehicles: List[VehicleSchema]


@app.get("/")
async def root():
    return {"message": "hello world"}

async def parse_token(authorization: Optional[str] = Header(None)):
    if authorization is None:
        raise HTTPException(status_code=400, detail="No authorization token")
    try :
        with open('./fixture/accounts/accounts.json', "r") as f:
            accounts = json.load(f)
            myAccount = list(filter(lambda x: x["AccessKey"] == authorization, accounts))[0]
            return (authorization, myAccount)
    except Exception as e:
        print (e)
        raise HTTPException(status_code=400, detail="Invalid authorization token")

@app.put("/update-hook")
async def update_db(api_key: str = Security(get_api_key), data = Depends(parse_token)):
    token, _ = data
    update_video_json(getCompanyInfo(token))
    update_sql_db(getCompanyInfo(token))
    return {"status": "success"}

@app.post("/query")
async def query(query: Query, data = Depends(parse_token)):
    token, _ = data
    print ("###", query)
    result = {}
    # print(query)
    app.bot.set_company_info(token)
    if query.state:
        app.bot.update_state(query.state)
    if query.location:
        app.bot.set_location(query.location)
    if query.focusedVehicle is not None:
        # if query.focusedVehicle not in app.bot.state_variables["viewed_vehicles"]:
        #     app.bot.state_variables["viewed_vehicles"].append(query.focusedVehicle)
        app.bot.state_variables["viewed_vehicles"].append(query.focusedVehicle)
    app.bot.update_message_history(query.history)
    if query.phone_number=='guest':
        app.bot.set_chat_mode("guest")
    else:
        app.bot.set_chat_mode("phone")
    res = app.bot.run(query.query)
    # print("#####", res["state"])
    # with open("log.txt", "a") as f:
    #     f.write("\nUser: " + query.query)
    #     f.write("\nAssistant: " + res["text"])

    # return StreamingResponse(app.bot.run(query.query), headers = {
    #     "Cache-Control": "no-cache",
    #     "Content-Type": "text/event-stream",
    #     "Transfer-Encoding": "chunked",
    # })
    return res


@app.post("/upsert_pinecone")
async def query(data: UpsertSchema, auth = Depends(parse_token)):
    print (data)
    token, info = auth
    # try:
    #     with open("./upsert_pinecone.txt", "w") as fp:
    #         fp.write(str(data))
    # except Exception:
    #     pass
    try:
        
        print ("NNNNNNNN", json.loads(data.metadata.model_dump_json()))
        result = upsert_pinecone(data.text, json.loads(data.metadata.model_dump_json()), info)
        return "success"
    except Exception:
        return "failed"


@app.post("/upsert_pinecone_vehicle")
async def query(vehicles: Vehicles, auth = Depends(parse_token)):
    token, info = auth
    # try:
    #     with open("./upsert_pinecone_vehicle.txt", "w") as fp:
    #         fp.write(str(vehicles))
    # except Exception:
    #     pass
    try:
        
        vehicles = json.loads(vehicles.model_dump_json())["vehicles"]
        result = upsert_pinecone_vehicle(vehicles, info)
        return "success"
    except Exception as e:
        print(e)
        return "failed"


@app.post("/delete_pinecone")
async def query(data: DeleteSchema, auth = Depends(parse_token)):
    token, info = auth
    # try:
    #     with open("./delete_pinecone.txt", "w") as fp:
    #         fp.write(str(data))
    # except Exception:
    #     pass
    try:
        delete_pinecone(data.metadata, info)
        return "success"
    except:
        return "failed"


def main():
    uvicorn.run('main:app', port=6400, host="0.0.0.0")
    # os.system("gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:6400 --timeout 40")

if __name__ == "__main__":
    main()
