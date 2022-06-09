require('dotenv').config()
const express = require('express')
const port = process.env.PORT || 5000
const cors = require('cors')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/routes')
const errorMiddleware = require('./middleware/ErrorMiddleware')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
app.use(errorMiddleware)

app.get('/', (request, response) => {
    response.status(200).json({ message: 'It works' })
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(port, () => console.log(`Server started on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()
