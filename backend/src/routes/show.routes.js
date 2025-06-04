import {Router} from 'express'
import {verifyJWT} from '../middleware/auth.middleware.js'
import {upload} from '../middleware/multer.middleware.js'
import {createShow,deleteShow,getAllShows,getShowById,getShowByMovieId,getShows,testAggregation} from '../controllers/show.controller.js'
import { deleteTheater } from '../controllers/theater.controller.js'





const router = new Router()

router.use(upload.none())

router.post("/",createShow)
router.get('/',getShows)
 router.get("/test-aggregation/:id", testAggregation)
 router.get("/all", getAllShows),
 router.get('/:showId',getShowById)
 router.delete('/:showId',deleteShow)
 router.get('/show/:movieId',getShowByMovieId)

export default router