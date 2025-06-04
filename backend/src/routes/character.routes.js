import { Router } from "express";
import { createCharacter, updateCharacter,getAllCharacters,getCharacterById,deleteCharacter } from "../controllers/character.controller.js";



const router = Router()



router.route("/").post(createCharacter)
router.route("/").get(getAllCharacters)
router.route("/:id").get(getCharacterById)
router.route("/:id").put(updateCharacter)
router.route("/:id").delete(deleteCharacter)


export default router