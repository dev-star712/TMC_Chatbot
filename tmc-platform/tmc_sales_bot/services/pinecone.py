
# Import required libraries
import os
from pinecone import Pinecone, PodSpec
import uuid

from langchain.text_splitter import CharacterTextSplitter

import openai
from openai import OpenAI
from tmc_sales_bot.utils import embedding, get_vehicle_description
from config import ModelType

openai.api_key = os.getenv('OPENAI_API_KEY')
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
PINECONE_ENV = os.getenv('PINECONE_ENVIRONMENT')

index_name = os.getenv('PINECONE_INDEX_NAME')
embedding_model = ModelType.embedding_v3_large
encoding_name = "cl100k_base"

pc = Pinecone(api_key=PINECONE_API_KEY)
index = pc.Index(index_name)
# index.replace(" ", "").lower()) = pc.index.replace(" ", "").lower())({Company_Name}_name)
text_splitter = CharacterTextSplitter(
    separator="\n",
    chunk_size=1000,
    chunk_overlap=200,
    length_function=len,
    is_separator_regex=False,
)

def upsert_pinecone(text, metadata, info, prop = "general"):
    
    index.delete(filter=metadata, namespace=("Chatbot-"+info["Name"]).replace(" ", "").lower())
    records = []
    metadata["content"] = text
    metadata["prop"] = prop
    records.append(
        {
            "id": str(uuid.uuid4()),
            "values": embedding(text),
            "metadata": dict(metadata)
        }
    )

    upsert_results = index.upsert(vectors=records, namespace=("Chatbot-"+info["Name"]).replace(" ", "").lower())

    return upsert_results


def delete_pinecone(metadata, info):
    index.delete(filter=metadata, namespace=("Chatbot-"+info["Name"]).replace(" ", "").lower())


def upsert_pinecone_vehicle(vehicles, info, prop = "vehicle"):
    records = []
    for vehicle in vehicles:
        text = get_vehicle_description(vehicle["vehicle"], info)
        metadata = vehicle["metadata"]
        index.delete(filter=metadata, namespace=("Chatbot-"+info["Name"]).replace(" ", "").lower())
        
        metadata["content"] = text
        metadata["prop"] = prop
        records.append(
            {
                "id": str(uuid.uuid4()),
                "values": embedding(text),
                "metadata": dict(metadata)
            }
        )
    upsert_results = index.upsert(vectors=records, namespace=("Chatbot-"+info["Name"]).replace(" ", "").lower())
    # print(upsert_results)
    return upsert_results
