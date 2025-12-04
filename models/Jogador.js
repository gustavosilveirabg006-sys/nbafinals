import conexao from "../config/conexao.js";

const JogadorSchema = conexao.Schema({
    nome:{type:String, required:true},
    posicao:{type:String, required:true},
    time:{type:String, required:true},
    pontos:{type:Number, required:true},
    assistencias:{type:Number, required:true},
    rebotes:{type:Number, required:true},
    foto:{type:Buffer,
    get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
         }
    }
})

const Jogador = conexao.model("Jogador", JogadorSchema);
export default Jogador