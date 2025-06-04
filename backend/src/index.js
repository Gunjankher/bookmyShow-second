import {connectDB} from './db/index.js'
import {app} from './app.js'
import dotenv from 'dotenv'



dotenv.config({
    path :"./.env"
})

connectDB()
.then(()=>{

app.on("error",(error)=>{
console.log(`ERR`, error);
throw error
})


app.listen(process.env.PORT ||8000,()=>{
    console.log(`server is running ar the port of ${process.env.PORT}`);
    
})

}).catch((err)=>{
console.log(`MONGODB CONNECTION FAILED`, err)
})