const express = require('express')
const app = express()

app.use(express.json())

const {sequelize,User,Post} = require('./models')


app.post('/users', async (req,res)=>{
    const {name,email,role} = req.body;
    console.log(req.body);
    try {
        const user = await User.create({name,email,role})
        res.json(user)
        
    } catch (error) {
        console.log('error', error.message)
        res.status(500).json(error)
    }
})


app.get('/users', async(req,res)=>{
    try {
        const users = await User.findAll();
        res.send(users)
    } catch (error) {
        console.log('error', error.message)
        res.status(500).json(error)
    }
})


app.get('/users/:id', async(req,res)=>{
    const uuid = req.params.id;
    try {
        const user = await User.findOne({
            where: {uuid}
        });
        res.send(user)
    } catch (error) {
        console.log('error', error.message)
        res.status(500).json(error)
    }
})

app.post('/posts',async(req,res)=>{
    const {useruuid,body} = req.body;
    try {
        const user = await User.findOne({
            where: {uuid: useruuid}
        })
        console.log(user.id);
        const post = await Post.create({ body, userId: user.id })
        res.send(post)
    } catch (error) {
        console.log('error', error.message)
        res.status(500).json(error)
    }
})

app.listen({port: 5000},async ()=>{
    console.log("Server is listing in http://localhost:5000/");
    try {
        await sequelize.authenticate()
    } catch (error) {
        console.log('error', error.message)
    }
    console.log("Database Connected");
})