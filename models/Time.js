import conexao from "../config/conexao.js";

const TimeSchema = conexao.Schema({
    nome:{type:String, required:true},
    vitorias:{type:Number, required:true},
    derrotas:{type:Number, required:true},
    jogadores:{type:String, required:true},
    titulos:{type:Number, required:true},
    winRate:{type:Number, required:true},   
    foto:{type:Buffer,  
    get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
         }
    }
})
const Time = conexao.model("Time", TimeSchema);
export default Time