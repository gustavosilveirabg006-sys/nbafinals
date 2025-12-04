import conexao from "../config/conexao.js";

const JogoSchema = conexao.Schema({
    casa:{type:String, required:true},
    visitante:{type:String, required:true},
    arena:{type:String, required:true},
    data:{type:Date, required:true},
    pontoscasa:{type:Number, required:true},
    pontosvisitante:{type:Number, required:true}

})
const Jogo = conexao.model("Jogo", JogoSchema);
export default Jogo