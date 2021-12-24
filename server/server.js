/*
 * @Description: 
 * @Author: NanKe
 * @Date: 2021-12-21 22:44:39
 * @LastEditTime: 2021-12-24 11:38:40
 * @LastEditors: NanKe
 * @Cnblogs: https://www.cnblogs.com/NanKe-Studying/
 * @FilePath: \Chat-Socket.io-ExpressJS\server\server.js
 */

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: true });
const dayjs = require('dayjs')
let connectedUser = []
//实时通讯的连接
io.on('connection', (socket) => {
    socket.emit("isConnection", "欢迎进入NanKe's Chat")
    updateUserList()
    //监听客户端Login
    let userName = "";
    socket.on('Login', (name, callback) => {
        if (name.trim().length === 0) return
        if (connectedUser.length > 0 && connectedUser.indexOf(name) != -1) {
            socket.emit('duplicateName', `用户${name}已存在！`)
            return
        }
        callback(true)
        userName = name
        connectedUser.push(userName)
        updateUser(`欢迎${userName}加入聊天室`)
        updateUserList()
    })

    //监听客户端message
    socket.on('SendMessage', (msg, callback) => {
        if (msg.trim().length === 0) return
        io.emit('output', {
            userName,
            msg,
            time: dayjs().format('HH:mm:ss')
        })
        callback(true)
    })
    //监听客户端deleteUser
    socket.on('deleteUser', (name, callback) => {
        if (name.trim().length === 0) return
        let index = connectedUser.indexOf(name)
        if (index != -1) {
            connectedUser.splice(index, 1)
        }
        updateUser(`用户${userName}退出聊天室`)
        updateUserList()
        callback(true)
    })
    //断开连接
    socket.on('disconnect', () => {
        let index = connectedUser.indexOf(userName)
        if (index != -1) {
            connectedUser.splice(index, 1)
        }
        updateUserList()
    });
    //将用户列表发送回客户端
    function updateUserList() {
        io.emit("updateUserList", connectedUser)
    }
    function updateUser(msg) {
        io.emit("updateUser", msg)
    }
});

let port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});  