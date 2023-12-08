import motor.motor_asyncio
MONGO_DETAILS = "mongodb+srv://hadi27767:2rgyQdmSqdKPm4zL@cluster0.uwztvpn.mongodb.net/?retryWrites=true&w=majority"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client['resumematching']
