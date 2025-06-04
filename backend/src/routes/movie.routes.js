import {Router} from 'express'
import {upload} from '../middleware/multer.middleware.js'
import {verifyJWT} from '../middleware/auth.middleware.js'
import {assignMovieToTheaters, createMovie, deleteMovie, getAllMovies, getMovieById, updateMovie} from '../controllers/movie.controller.js'
import { adminVerifyJWT } from '../middleware/admin.middleware.js'



const router = Router()

router
.route("/")
.post(adminVerifyJWT,
    upload.fields([
        {name:"trailer", maxCount:1},
        {name:"poster", maxCount:1},
        {name:"coverPoster", maxCount:1}
    ]),
    createMovie
)

router
.route("/m/:movieId")
.patch(
adminVerifyJWT,
upload.fields([
    {name:"poster", maxCount:1},
    {name:"coverPoster", maxCount:1},
    {name:"trailer", maxCount:1}
]),


updateMovie
)

router.route('/m/:movieId')
.delete(adminVerifyJWT,upload.none(),deleteMovie)

router.route("/:id").get(getMovieById)

router.route("/").get(getAllMovies)

router.route("/assign-movie").post(assignMovieToTheaters)

export default router