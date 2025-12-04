import mongoose from "mongoose";
const url = 
"mongodb+srv://alunogustavosilveira:123@cluster0.v2lr8rf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const conexao = await mongoose.connect(url)
export default conexao