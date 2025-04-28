from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline

# Load a BERT model fine-tuned for NER
model_name = "dslim/bert-base-NER"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForTokenClassification.from_pretrained(model_name)

# Create the pipeline
ner_pipeline = pipeline("ner", model=model, tokenizer=tokenizer, aggregation_strategy="simple")

def extract_locations(text):
    results = ner_pipeline(text)
    locations = [item['word'] for item in results if item['entity_group'] == 'LOC']
    return locations


def extract_locations_from_file(file_path):
    locations = []

    with open(file_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue  # skip empty lines

            # First try to find full addresses
            addresses = ", ".join(extract_locations(line))
            locations.append(addresses)
    
    return locations

if __name__ == "__main__":
    file_path = "locations.txt"  # <-- your text file here
    locations_found = extract_locations_from_file(file_path)

    print("Locations detected:")
    for loc in locations_found:
        print(f"- {loc}")
    with open("locations_extracted.txt", "w") as file:
        for location in locations_found:
            file.write(location + "\n")  # write each location in a new line