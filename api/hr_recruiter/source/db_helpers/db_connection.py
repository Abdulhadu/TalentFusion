import motor.motor_asyncio
MONGO_DETAILS = ""

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client['resumematching']
