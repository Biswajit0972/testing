import cookieParser from "cookie-parser";
import express from  "express";
import cors from  "cors";
import jwt from "jsonwebtoken"
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true, limit: "64kb"}));
app.use(cors({
    origin:  "https://testing-frontend-sepia.vercel.app",
    credentials: true,
}));

const myToken =  jwt.sign({text:"hello world"}, "1245774nbnvfyfdsdfsdf", {
    expiresIn: "10m"
});

const cookieOptions  = {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 *7,
    sameSite: "strict"
}

app.get("/", (req, res) => {
      res.status(200).cookie("myToken", myToken, cookieOptions).send("<h1>Hello from backend</h1>")
})

app.post("/signin", (req,res)  => {
const { email, password } = req.body;
if (email === 'test@gmail.com' && password === '12345678') {

   return res.status(200).cookie("myToken", myToken, cookieOptions).send({id: "User logged  in"})
}
res.status(400).send({id: "User not found"});
})

export {app}
