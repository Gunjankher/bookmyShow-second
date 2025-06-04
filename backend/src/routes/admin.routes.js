import { Router } from "express";

  import { upload } from "../middleware/multer.middleware.js";
  import {adminVerifyJWT} from "../middleware/admin.middleware.js";
  import { refreshAccessToken } from "../controllers/user.controller.js";
import { getCurrentAdmin, loginAdmin, logoutAdmin, registerAdmin,changeAdminPassword,updateAdminDetails, updateAdminAvatar, updateAdminCoverImage} from "../controllers/admin.controller.js";
  
  



const router = Router()




router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },

    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),

  registerAdmin,
);

router.route("/login").post(upload.none(),loginAdmin);

//secured routes
router.route("/logout").post(adminVerifyJWT, upload.none(),logoutAdmin);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(adminVerifyJWT, changeAdminPassword);
router.route("/current-user").get(adminVerifyJWT, getCurrentAdmin);
router.route("/update-account").patch(adminVerifyJWT, updateAdminDetails);

router
  .route("/avatar")
  .patch(adminVerifyJWT, upload.single("avatar"), updateAdminAvatar);
router
  .route("/cover-image")
  .patch(adminVerifyJWT, upload.single("coverImage"), updateAdminCoverImage);




export default router