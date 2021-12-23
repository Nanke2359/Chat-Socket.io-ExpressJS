/*
 * @Description: 
 * @Author: NanKe
 * @Date: 2021-12-21 22:44:39
 * @LastEditTime: 2021-12-22 23:16:30
 * @LastEditors: NanKe
 * @Cnblogs: https://www.cnblogs.com/NanKe-Studying/
 * @FilePath: \Chat-Socket.io-ExpressJS\server\server.js
 */

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: true });
let connectedUser = []
//实时通讯的连接
io.on('connection', (socket) => {
    //已连接
    console.log('连接成功');
    updateUserName()
    //监听客户端Login
    let userName = "";
    socket.on('Login', (name, callback) => {
        if (name.trim().length === 0) return
        callback(true)
        userName = name
        connectedUser.push(userName)
        updateUserName()
    })

    //监听客户端message
    socket.on('SendMessage', (msg, callback) => {
        if (msg.trim().length === 0) return
        io.emit('output', {
            userName,
            msg
        })
        callback(true)
    })
    //断开连接
    socket.on('disconnect', () => {
        console.log('断开连接');
        let index = connectedUser.indexOf(userName)
        if (index != -1) {
            connectedUser.splice(index, 1)
        }
        updateUserName()
    });
    //将用户列表发送回客户端
    function updateUserName() {
        io.emit("updateUser", connectedUser)
    }
});

let port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});  