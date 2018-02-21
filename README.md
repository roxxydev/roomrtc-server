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
curl -X POST -H "Content-Type: application/json" -d '{"room":"1234", "username":"John", "sdpOffer":"sdp offer string value"}' http://localhost:8088/call
curl -X POST -H "Content-Type: application/json" -d '{"room":"1234", "username":"Mark", "sdpAnswer":"sdp answer string value"}' http://localhost:8088/call/answer
curl -X POST -H "Content-Type: application/json" -d '{"room":"1234", "username":"Mark"}' http://localhost:8088/call/reject
curl -X POST -H "Content-Type: application/json" -d '{"room":"1234", "username":"John"}' http://localhost:8088/call/end
curl -X POST -H "Content-Type: application/json" -d '{"room":"1234", "username":"John", "ice": {"sdp":"your sdp value", "sdpMLineIndex": 0, "sdpMid": "sdpMid value"}}' http://localhost:8088/iceCandidate
curl -X POST -H "Content-Type: application/json" -d '{"message":"Hello world!", "blacklist":["John"]}' http://localhost:8088/msg
```
