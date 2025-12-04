import { createServer } from 'http';
import express from 'express'
const app = express();
//Importar os modelos 
import Jogador from '../models/Jogador.js';
import Time from '../models/Time.js';
import Arena from '../models/Arena.js';
import Jogo from '../models/Jogo.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

//Confiram se tem essa linha aqui também
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')

//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Converte o caminho do arquivo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + '../public'))

//rotas
app.get('/', (req, res) => {
    res.render("index")
})

app.get('/jogadores/lst', async (req, res) => {
    const jogadores = await Jogador.find()
    res.render("jogadores/lst", {Jogadores: jogadores})
})

app.get('/jogadores/add', (req, res) => {
    res.render("jogadores/add")
})
app.post('/jogadores/add', async (req, res) => {
  await Jogador.create(req.body);
  res.redirect('/jogadores/lst');
});


app.post('/jogadores/add/ok',upload.single('foto'), async (req, res) => {
    Jogador.create({
        foto: req.file.buffer,
        nome: req.body.nome,
        idade: req.body.idade,
        camisa: req.body.camisa,
        altura: req.body.altura,
        peso: req.body.peso,
        posicao: req.body.posicao,
    });
    res.render("jogadores/addok")
})

app.get('/time/lst', async (req, res) => {
    const times = await Time.find()
    res.render("time/lst", {times:times})
})


app.post('/time/lst', async (req, res) => {
    //busca as marcar no banco de dados
    const pesquisa = req.body.pesquisa
    const times = await Time.find({nome:{$regex:pesquisa, $options:'i'}})
    res.render("time/lst", {times:times})
})

app.post('/time/add/ok', upload.single('foto'), async (req, res) => {
    Time.create({
        foto: req.file.buffer,
        nome: req.body.nome,
        cidade: req.body.cidade,
    });
    res.render("time/addok")
})

app.get('/time/add', (req, res) => {
    res.render("time/add")
})

app.post('/time/add', async (req, res) => {
  await Time.create(req.body);
  res.redirect('/time/lst');
});

app.get('/arena/lst', async (req, res) => {
    const arenas = await Arena.find()
    res.render("arena/lst", {arenas:arenas})
})


app.post('/arena/lst', async (req, res) => {
    //busca as marcar no banco de dados
    const pesquisa = req.body.pesquisa
    const arenas = await Arena.find({nome:{$regex:pesquisa, $options:'i'}})
    res.render("arena/lst", {arenas:arenas})
})

app.post('/arena/add/ok', upload.single('foto'), async (req, res) => {
    Arena.create({
        foto: req.file.buffer,
        nome: req.body.nome,
        cidade: req.body.cidade,
        endereco: req.body.endereco,
    });
    res.render("arena/addok")
})

app.get('/arena/add', (req, res) => {
    res.render("arena/add")
})

app.post('/arena/add', async (req, res) => {
  await Arena.create(req.body);
  res.redirect('/arena/lst');
});


app.get('/jogo/lst', async (req, res) => {
    const jogos = await Jogo.find()
    res.render("jogo/lst", {jogos:jogos})
})


app.post('/jogo/lst', async (req, res) => {
    //busca as marcar no banco de dados
    const pesquisa = req.body.pesquisa
    const jogos = await Jogo.find({nome:{$regex:pesquisa, $options:'i'}})
    res.render("jogo/lst", {jogos:jogos})
})

app.post('/jogo/add/ok', async (req, res) => {
    //grava no banco
    await Jogo.create(req.body)
    res.render("jogo/addok" )
})

app.get('/jogo/add', (req, res) => {
    res.render("jogo/add")
})
app.post('/jogo/add', async (req, res) => {
  await Jogo.create(req.body);
  res.redirect('/jogo/lst');
});
app.get('/jogadores/edt/:id', async (req, res) => {
    const jogador = await Jogador.findById(req.params.id);
    res.render('jogadores/edt', {jogador: jogador});
});

app.post('/jogadores/edt/:id', upload.single('foto'), async (req, res) => {
    const updateData = { ...req.body };
    
    if (req.file) {
        updateData.foto = req.file.buffer;
    }
    
    await Jogador.findByIdAndUpdate(req.params.id, updateData, {runValidators: true});
    res.render('jogadores/edtok');
});

app.get('/time/edt/:id', async (req, res) => {
    const time = await Time.findById(req.params.id);
    res.render('time/edt', {time: time});
});

app.post('/time/edt/:id', upload.single('foto'), async (req, res) => {
    const updateData = { ...req.body };
    
    if (req.file) {
        updateData.foto = req.file.buffer;
    }
    
    await Time.findByIdAndUpdate(req.params.id, updateData, {runValidators: true});
    res.render('time/edtok');
});

app.get('/arena/edt/:id', async (req, res) => {
    const arena = await Arena.findById(req.params.id);
    res.render('arena/edt', {arena: arena});
});

app.post('/arena/edt/:id', upload.single('foto'), async (req, res) => {
    const updateData = { ...req.body };
    
    if (req.file) {
        updateData.foto = req.file.buffer;
    }
    
    await Arena.findByIdAndUpdate(req.params.id, updateData, {runValidators: true});
    res.render('arena/edtok');
});


app.get('/jogadores/del/:id', async (req, res) => {
    await Jogador.findByIdAndDelete(req.params.id);
    res.redirect('/jogadores/lst');
});
app.get('/times/del/:id', async (req, res) => {
    await Time.findByIdAndDelete(req.params.id);
    res.redirect('/time/lst');
});

app.get('/time/edt/:id', async (req, res) => {
    const time = await Time.findById(req.params.id);
    res.render('time/edt', {time: time});
});

app.post('/time/edt/:id', async (req, res) => {
    await Time.findByIdAndUpdate(req.params.id, req.body);
    res.render('time/edtok');
});
app.get('/arenas/del/:id', async (req, res) => {
    await Arena.findByIdAndDelete(req.params.id);
    res.redirect('/arena/lst');
});

app.get('/arena/edt/:id', async (req, res) => {
    const arena = await Arena.findById(req.params.id);
    res.render('arena/edt', {arena: arena});
});

app.post('/arena/edt/:id', async (req, res) => {
    await Arena.findByIdAndUpdate(req.params.id, req.body);
    res.render('arena/edtok');
});
app.post('/jogadores/lst', async (req, res) => {
    //busca as marcar no banco de dados
    const pesquisa = req.body.pesquisa
    const jogadores = await Jogador.find({nome:{$regex:pesquisa, $options:'i'}})
    res.render("jogadores/lst", {jogadores:jogadores, pesquisa:pesquisa})
})

app.get('/site', (req, res) => {
    res.render("site/index")
})
app.listen(3000)