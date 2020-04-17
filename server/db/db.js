const mongoose = require('mongoose')

const {name} = require('./config').db

module.exports = {
    open(){
        return (
            mongoose.connect(name,{ useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
                console.log('链接数据库成功')
            })
        )
    },
    close(){
        return (
            mongoose.connection.close()
        )
    }
}