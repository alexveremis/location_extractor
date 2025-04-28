const { spawn } = require('child_process');
const fs = require('fs');
const readline = require('readline');
const cron = require('node-cron');
const express = require('express');

function runEvery30Mins(){
	return new Promise((resolve, reject) => {
		// Run Python script
		const pythonProcess = spawn('python', ['bert_locations_extractor.py']);

		// Read data coming from Python script
		pythonProcess.stdout.on('data', (data) => {
			console.log(`Python says: ${data.toString()}`);
		});

		// Handle errors
		pythonProcess.stderr.on('data', (data) => {
			console.error(`Python error: ${data.toString()}`);
		});

		// Handle process close
		pythonProcess.on('close', (code) => {
			console.log(`Python process exited with code ${code}`);
		});



		// Create a readable stream
		const fileStream = fs.createReadStream('locations_extracted.txt');

		// Create an interface for reading lines
		const rl = readline.createInterface({
		  input: fileStream,
		  crlfDelay: Infinity, // Recognize all line breaks
		});

		const locations = [];
		// Read line by line
		rl.on('line', (line) => {
		  console.log(`Line: ${line}`);
		  locations.push(line);
		});

		rl.on('close', () => {
		  console.log('Finished reading file.');
		  // Generate the Google Maps multi-location link
		  const mapUrl = `https://www.google.com/maps/dir/${locations.map(l => l.replace(/\s+/g, '+')).join('/')}`;
		  console.log(`Map link with all locations:\n${mapUrl}`);
		  //const open = require('open');
		  //window.open(mapUrl, '_blank');
		  //open(mapUrl);
		  resolve(mapUrl);
		});
	});
}








cron.schedule('*/30 * * * *', () => {
  console.log('⏰ Running task every 30 minutes');
  // Your function here (e.g., read file, generate map, etc.)
  runEvery30Mins();
});


const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
  const result = await runEvery30Mins();
  res.send('You just reruned the function that extracts the location from a txt file! \n\n' + result);
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});