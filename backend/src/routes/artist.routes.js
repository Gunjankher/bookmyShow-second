import { Router } from "express";
import { createArtist, deleteArtist, getAllArtists, getArtistById, updateArtist } from "../controllers/artist.controller.js";
import { upload } from "../middleware/multer.middleware.js";




const router = Router()

router.route("/").post(
     upload.fields([
        {
          name: "avatar",
          maxCount: 1,
        },
      ]),
    createArtist)
router.route("/").get(getAllArtists)
router.route("/:id").get(getArtistById)
router.route("/:id").put(updateArtist)
router.route("/:id").delete(deleteArtist)


export default router


