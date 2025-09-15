import express from "express";
import dotenv from "dotenv";
import carrosRoutes from "./routes/carrosRoutes.js"
import carros from "./models/dados.js";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3001;

app.get("/", (req,res) => {
    res.send(carros)
})

app.use("/Carros", carrosRoutes);

app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});