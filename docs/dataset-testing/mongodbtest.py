from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

client = MongoClient('mongodb+srv://jarrettcura:PlQTnvjsFcm91UdB@cluster222.vduea3l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster222')  # Replace with your MongoDB connection URL
db = client['Course_Data']  # database name
collection = db['geneds']  # collection name

result = collection.delete_many({'Subject': ""})

print('Number of documents deleted:', result.deleted_count)