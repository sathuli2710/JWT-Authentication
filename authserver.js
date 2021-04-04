require('dotenv').config()

const express = require('express') 
const app = express()


const jwt = require('jsonwebtoken')

app.use(express.json())

let refreshtokens = []

app.post('/token', (req,res) => {
    const refreshtoken = req.body.token
    if(refreshtoken == null) return res.sendStatus(401)
    if(!refreshtokens.includes(refreshtoken)) return res.sendStatus(403)
    jwt.verify(refreshtoken, process.env.REFRESH_SECRET_TOKEN, (err, user) => {
        if(err) return res.sendStatus(403)
        const accesstoken = generateaccessToken({name: user.name})
        res.json({ accesstoken: accesstoken})
    })
})

app.delete('/logout', (req, res) => {
    refreshtokens = refreshtokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})
app.post('/login', (req, res) =>{
    const username = req.body.username
    const user = { name : username}

    const accesstoken = generateaccessToken(user)
    const refreshtoken = jwt.sign(user, process.env.REFRESH_SECRET_TOKEN)
    refreshtokens.push(refreshtoken)
    res.json({ accesstoken: accesstoken, refreshtoken: refreshtoken})
})

function generateaccessToken(user){
    return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {expiresIn:'20s'})
}

app.listen(4000)
