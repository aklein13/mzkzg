import gzip
import json
import os

downloaded_path = './downloaded'

for file in os.listdir(downloaded_path):
    if not file.endswith('json'):
        continue
    with open(os.path.join(downloaded_path, file), encoding='utf8') as input_file:
        data = json.load(input_file)
    output_path = os.path.join(downloaded_path, file.replace('.json', '.json.gz'))
    with gzip.GzipFile(output_path, 'w') as output_file:
        output_file.write(json.dumps(data).encode('utf-8'))
