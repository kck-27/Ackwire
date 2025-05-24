import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { config } from 'dotenv'
import connectToDB from './config/mongo.js'
import cloudinaryConfig from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import serviceRouter from './routes/serviceRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'

// App config

const app = express()
const port = process.env.PORT || 3536
connectToDB()
cloudinaryConfig()

// Middleware

app.use(express.json())
app.use(cors())

// API endpoints
app.use('/api/user', userRouter)
app.use('/api/products', productRouter)
app.use('/api/services', serviceRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)

app.get('/', (req, res) => {
res.send("Endpoint up")
})

// Starting server

app.listen(port, () => console.log(`Listening on port: ${port}`))
