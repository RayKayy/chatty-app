Hi Chat! App
=====================

A real time multi-client SPA using React.js and Websockets.

### About

This is a single page application developed using React.js and complimented with
Websockets(WS) to provide a platorm for real time transfer of messages between all clients connected to the WS server.

### Getting Started

1. Clone this repo and install all dependencies.
```bash
$ git clone https://github.com/RayKayy/hichat-app.git
$ npm install
```
> Webpack might take some time to compile for the first time.

2. Clone this dependent repo and install dependencies for setting up the Websocket server.
```bash
$ git clone https://github.com/RayKayy/hichat-server.git
$ npm install
```

3. Start and run the application:
    - `cd` to the hichat-server directory and then run `npm start`
    - `cd` to the hichat-app directory and then run `npm start`
> The application default websocket server address is *ws://localhost:3001*;


4. Navigate to *localhost:3000* on your browser of choice and enjoy chatting realtime with your friends.
> Change the server settingd for the hicaht-app/hichat-server according to your setup!

### Features

- Realtime messages between all clients.
- Auto scroll on new message.
- Url referring to images within message content will be parsed and render on screen.
- Each user is assigned a unique color represented on the username. (will not change on username change)
- Messages is saved locally on each clients state; no persistent messages on server.

### Screenshots



### Dependencies

* hichat-server
* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)