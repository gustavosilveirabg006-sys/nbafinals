import conexao from "../config/conexao.js";

const ArenaSchema = conexao.Schema({
    nome:{type:String, required:true},
    cidade:{type:String, required:true},
    capacidade:{type:Number, required:true},
    anoInauguracao:{type:Number, required:true},
    // timeDaCasa: nome do time que joga na arena (campo adicionado)
    timeDaCasa:{type:String},
    foto:{type:Buffer, get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
         }
    }
});
const Arena = conexao.model("Arena", ArenaSchema);
export default Arena    