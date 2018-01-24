Server for RoomRtc iOS app demo of WebRTC

### Installing
To download package dependencies, run
```sh
npm install
```

### Running
```sh
npm start
```

### Try it out
```sh
curl -X POST -H "Content-Type: application/json" -d '{"room":"1234", "username":"John"}' http://localhost:8088/room/enter
curl -X POST -H "Content-Type: application/json" -d '{"room":"1234", "username":"John"}' http://localhost:8088/room/leave
curl -X POST -H "Content-Type: application/json" -d '{"message":"Hello world!", "blacklist":["John"]}' http://localhost:8088/msg
```
