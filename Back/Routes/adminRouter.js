import express from "express"
import { count, loginAdmin ,logoutAdmin,adminMessage} from "../controller/admin.js";
import { checkAdmin } from "../middlewares/auth.js";


const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", logoutAdmin)

adminRouter.get("/check", checkAdmin, adminMessage)

adminRouter.get("/count", count);

export default adminRouter