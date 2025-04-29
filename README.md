# location_extractor
Location extractor (from chats) that creates a new map with the locations every X mins.


## 📍 Location Extractor to Google Maps

This project reads messages from a text file, extracts address locations using a Python script, and generates a Google Maps link with all the extracted locations.  
It runs automatically every 30 minutes, and can also be triggered manually via a web server.

---

## 🚀 Features

- Run a Python script to extract addresses at `locations_extracted.txt`
- Reads addresses from `locations.txt`
- Build a Google Maps route URL with the addresses
- Auto-run every 30 minutes (cron)
- Simple Express.js web server to trigger extraction manually

---

## 📦 Setup

### Requirements
- **Node.js** (v18+)
- **Python 3.x**
- Python packages: `transformers`, `torch` (for BERT model)

---

## 🛠 Installation

1. Clone the repository:

bash
```git clone https://github.com/your-username/your-repo.git```
```cd your-repo```

    Install Node.js dependencies:

```npm install```

    Install Python dependencies:

```pip install transformers torch```

    Make sure you have a text file with your messages (or locations) ready.

## 🏃 Usage

Run the server:

node index.js

It will:

    Automatically run the extraction every 30 minutes.

    Expose a web server at: http://localhost:3000

Visit http://localhost:3000 to trigger the extraction manually and get the latest Google Maps link.

## 📂 File Structure

/your-project
├── index.js                  # Node.js server and cron job
├── bert_locations_extractor.py # Python script extracting addresses
├── locations.txt              # Input addresses for Python script to read from
├── locations_extracted.txt    # Outputs addresses from Python script
└── README.md                  # This file

🔧 How it Works

    index.js runs bert_locations_extractor.py

    The Python script reads messages from locations.txt and writes addresses into locations_extracted.txt

    Node.js reads this file line-by-line

    Node.js generates a Google Maps multi-destination URL

    URL is shown on the console and through a web request

## 📜 License

MIT License

## ✨ Author

Made with ❤️ by Alexandros Veremis
