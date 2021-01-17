const express = require('express')
const path = require('path')
const router = express.Router()

if (process.env.APP_ENV === "production") {
    router.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname+'/../client/build/index.html'));
    });
} else {
    router.get('/', (req, res) => {
        res.send('Server is up and running')
    })
}

module.exports = router