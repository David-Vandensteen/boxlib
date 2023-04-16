[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/en/download/)

# BoxLib
BoxLib is a collection of NodeJS libraries and utility functions that can be used across multiple projects.  
The libraries have been designed with ease of use and flexibility in mind, and are regularly tested and maintained.

## Running Tests
BoxLib includes a suite of unit tests that can be run using the following command:
```
npm test
```

## License
BoxLib is licensed under the MIT License.

***
### - MIDIControllerStore
This class manages MIDI controller values.
It provides a way to store and retrieve MIDI controller values for different channels.  
The class uses a private Map to cache the controller values.  
`getInstance` is provided to retrieve a singleton.  

```javascript
const store = MIDIControllerStore.getInstance();

store.set({ controller: 1, channel: 0, value: 127 }); // Set controller 1 on channel 0 to 127
store.set({ controller: 2, channel: 0, value: 64 }); // Set controller 2 on channel 0 to 64
store.set({ controller: 1, channel: 1, value: 100 }); // Set controller 1 on channel 1 to 100

console.log(store.getValue({ controller: 1, channel: 0 })); // Output: 127
console.log(store.getValue({ controller: 2, channel: 0 })); // Output: 64
console.log(store.getValue({ controller: 1, channel: 1 })); // Output: 100

store.clear(); // Reset all values

console.log(store.getValue({ controller: 1, channel: 0 })); // Output: 0 (default value)
```

### - MIDINormalizer
This provides utility methods to normalize MIDI messages, channels, controllers, and values.  
The message method takes a MIDI message object and normalizes its properties within their respective ranges.  
The controller, channel, and value methods take a numeric input and normalize it to a valid MIDI value.  

```javascript
const message = {
  velocity: 130,
  channel: 14,
  value: -10,
  note: 128,
  controller: 200,
};

console.log('Original Message:', message);

const normalizedMessage = MIDINormalizer.message(message);
console.log('Normalized Message:', normalizedMessage);

const normalizedController = MIDINormalizer.controller(150);
console.log('Normalized Controller:', normalizedController);

const normalizedChannel = MIDINormalizer.channel(-1);
console.log('Normalized Channel:', normalizedChannel);

const normalizedValue = MIDINormalizer.value(200);
console.log('Normalized Value:', normalizedValue);
```
```yaml
Original Message: {velocity: 130, channel: 14, value: -10, note: 128, controller: 200}
Normalized Message: {velocity: 127, channel: 14, value: 0, note: 127, controller: 127}
Normalized Controller: 127
Normalized Channel: 0
Normalized Value: 127
```


### - package
The code exports the contents of the `package.json` file and some of its properties.  
The exported properties are `name`, `author`, `version`, and `license`
```javascript
import { name, author, version, license } from './package';

console.log(`Name: ${name}`);
console.log(`Author: ${author}`);
console.log(`Version: ${version}`);
console.log(`License: ${license}`);
```

### - TCPServer
The TCPServer class creates a TCP server that listens on a specified host and port.  
```javascript
// Create a new TCPServer instance
const server = new TCPServer({ host: '127.0.0.1', port: 7070 });

// Listen for the 'connection' event
server.on('connection', (socket) => {
  console.log(`New client connected: ${socket.remoteAddress}:${socket.remotePort}`);

  // Send a welcome message to the client
  socket.write('Welcome to my TCP server!\n');
});

// Listen for the 'data' event
server.on('data', (data) => {
  console.log(`Received data: ${data.toString()}`);
});

// Start the server
server.start();

// Gracefully shut down the server after 10 seconds
setTimeout(() => {
  console.log('Shutting down server...');
  server.close();
}, 10000);
```

### - YAMLLoader
This function reads and parses YAML configuration files.  
The function searches for the specified YAML file and returns the corresponding configuration object.  
If the YAML file is not found, it looks for fallback files in the provided order and returns the configuration object from the first found file.  
If no file is found, an error is thrown.  

```javascript
try {
  const config = YAMLLoader('config.yaml', { fallBack: ['config.production.yaml', 'config.default.yaml'] });
  console.log('Database configuration:', config.db);
  // Use the config object to connect to the database
} catch (err) {
  console.error('Error loading configuration:', err);
}
```
