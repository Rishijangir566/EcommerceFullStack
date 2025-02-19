import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "uploads");
    },
    filename: (req, file, callback) => {
        const filename = `${Date.now()} - ${Math.round(Math.random() * 1000000)}`
        const ext = `${path.extname(file.originalname)}`
        callback(null, filename + ext)
    }
})

export const upload = multer({ storage: storage })