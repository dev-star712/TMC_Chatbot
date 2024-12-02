from enum import Enum
from os.path import join
from json import loads
from dotenv import load_dotenv

TOP_K = 5
PROJECT_ROOT = ""

class ModelType(str, Enum):
    gpt4 = 'gpt-4-turbo'
    gpt3 = 'gpt-3.5-turbo'
    embedding = 'text-embedding-ada-002'
    embedding_v3_small = "text-embedding-3-small"
    embedding_v3_large = "text-embedding-3-large"
    encoding = "cl100k_base"
    palm2 = 'palm/chat-bison-001'
    codey = 'palm/codechat-bison-001'

class ModelChoice(Enum):
    OPENAI = "gpt-4-0125-preview"
    # OPENAI = "gpt-6-0613"
    ANTHROPIC = "anthropic/claude-3-opus-20240229"

class PromptTemplate(Enum):
    AIO_PROMPT = "AIO.txt"
    SYSTEM_PROMPT = "system.txt"
    USER_CONTACT_INFO = "user_contact_info.txt"
    USER_VEHICLE_INFO = "user_vehicle_info.txt"
    USER_LOCATION_INFO = "user_location_info.txt"
    USER_FINANCE_INFO = "user_finance_info.txt"
    REFERENCE_VEHICLE_COST = "reference_vehicle_cost.txt"
    REFERENCE_VEHICLE_WITH_VIDEO_COST = "reference_vehicle_with_video_cost.txt"
 
class FunctionTemplate(Enum):
    DETERMINE_PARAMS = "determine_params.json"
    DETERMINE_ACTIONS = "determine_actions.json"

def load_env():
    load_dotenv(join(PROJECT_ROOT, ".env"), override=True)

def get_prompt_template(prompt_template: PromptTemplate):
    with open(join(PROJECT_ROOT, "prompt_templates", prompt_template.value), "rt") as f:
        return f.read()

def get_function_template(function_template: FunctionTemplate):
    with open(join(PROJECT_ROOT, "function_templates", function_template.value), "r") as f:
        return loads(f.read())


FIXTURES = join(PROJECT_ROOT, 'fixture')
SQL_DB = join(FIXTURES, "accounts")

VEHICLE_WITH_VIDEO_JSON = join(FIXTURES, "accounts")
CALC_DISTANCE = "http://localhost:8000/api/main/calcRoadDistance"
VALIDATE_POSTCODE = "http://localhost:8000/api/main/validatePostcode"