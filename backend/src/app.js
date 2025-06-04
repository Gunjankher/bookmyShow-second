import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'



  


const app = express()






const allowedOrigins = [
  'https://bookmy-show-9wtr.vercel.app',
  'http://localhost:5173',
  ];
  
  // app.use(cors({
  //   origin: function (origin, callback) {
  //     if (!origin || allowedOrigins.includes(origin)) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   credentials: true,
  // }));

  app.use(cors({
    origin: allowedOrigins,
    credentials: true,
  }));
  



  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'", // needed if you're injecting inline scripts (e.g., from some frontend libs)
          "blob:",
          "filesystem:",
          "cdn.jsdelivr.net",
        ],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        imgSrc: ["'self'", "data:", "blob:"],
        connectSrc: [
          "'self'",
          "blob:",
          "https://bookmy-show-9wtr.vercel.app", // your Vercel frontend
          "https://your-backend-service.onrender.com", // your backend Render URL
        ],
      },
    })
  );

  // app.options('*', cors({
  //   origin: allowedOrigins,
  //   credentials: true,
  // }));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())



import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'
import movieRouter from './routes/movie.routes.js'
import theaterRouter from './routes/theater.routes.js'
import showRouter from './routes/show.routes.js'
import bookingRouter from './routes/booking.routes.js'
import paymentRouter from './routes/payment.routes.js'
import artistRouter from './routes/artist.routes.js'
import characterRoute from  './routes/character.routes.js'
import revenueRoute from  './routes/revenue.routes.js'

app.use("/api/v1/users",userRouter)
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/movie",movieRouter)
app.use("/api/v1/theater",theaterRouter)
app.use("/api/v1/shows",showRouter)
app.use("/api/v1/booking",bookingRouter)
app.use("/api/v1/payment", paymentRouter)
app.use('/api/v1/artist',artistRouter)
app.use('/api/v1/character',characterRoute)
app.use('/api/v1/revenue', revenueRoute)



export {app}



/* 

{
    "title": "Inception",
    "genre": "Sci-Fi",
    "releseDate": "2010-07-16T00:00:00.000Z",
    "formats": ["IMAX", "3D"],
    "numOfRatings": 0,
    "description": "A mind-bending thriller.",
    "cast": "67de8fcbd66ec6f9089c8fb1",
    "characters": "67de9082d66ec6f9089c8fb3"
}
*/