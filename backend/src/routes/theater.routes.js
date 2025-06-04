import {Router} from 'express'
import {verifyJWT} from '../middleware/auth.middleware.js'
import {upload} from '../middleware/multer.middleware.js'
import { assignMovieScreen, createTheater, deleteTheater, getAllTheaters, getTheaterById, getTheatersByMovie, removeMovieFromScreen, updateTheater } from '../controllers/theater.controller.js'



const router = new Router()

router.use(upload.none())

router.route("/").post(createTheater).get(getAllTheaters)
router.route("/:theaterId")
.patch(updateTheater)
.delete(deleteTheater)
.get(getTheaterById)


router.route("/assign-movie").put(assignMovieScreen)
router.route("/remove-movie").put(removeMovieFromScreen)
router.route("/by-movie/:movieId").get(getTheatersByMovie)



export default router