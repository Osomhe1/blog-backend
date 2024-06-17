const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { sequelize } = require('./config/database')

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

const PORT = process.env.PORT || 5000

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => console.log(err))
