import express from "express"
import { count, loginAdmin ,logoutAdmin,adminMessage ,createCoupon} from "../controller/admin.js";
import { checkAdmin } from "../middlewares/auth.js";


const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", logoutAdmin)

adminRouter.post("/coupons", createCoupon )

adminRouter.get("/check", checkAdmin, adminMessage)

adminRouter.get("/count", count);

export default adminRouter