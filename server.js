const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var path = require('path')

const app = express();

const FilmRoute = require('./public/routes/film')
const UsuariRoute = require('./public/routes/usuari')
const RessenyaRoute = require('./public/routes/ressenya')

mongoose.connect('mongodb://localhost:27017/films-db', {
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useNewUrlParser: true,
    useFindAndModify: false
})

const db = mongoose.connection


db.on('error', (err)=> {
    console.log(err);
})

db.once('open', ()=>{
    console.log('Database is connected')
})

const TWO_HOURS = 1000*60*60*2;
const NODE_ENV = 'development';
const IN_PROD = NODE_ENV === 'production'

app.set('views', './public/views')
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
app.use(session({
    name: 'sid',
    secret: 'ssh!quiet,it\'asecret!',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: TWO_HOURS,
        sameSite: true,
        secure: IN_PROD
    }
}))

const PORT = process.env.PORT || 3000

app.use(cookieParser());
const Usuari = require('./public/models/Usuari')
const redirectLogin = (req,res,next) => {
    if(!req.session.userId){
        res.redirect('/login')
    }else{
        next()
    }
}

const redirectHome = (req,res,next) => {
    if(req.session.userId){
        res.redirect('/home')
    }else{
        next()
    }
}
app.get('/',(req,res)=> {
    const { userId } = req.session
    if (userId) res.redirect('/home')
    else res.redirect('/login')
})

app.get('/home', redirectLogin, (req,res)=> {
    res.render('ressenyaFilms', { username : req.session.userId })
})

app.get('/home/:nom/add', (req,res) => {
    //console.log(req.params.nom)
    res.render('afegirRessenya', { username : req.session.userId, nomFilm : req.params.nom })
})

app.get('/home/:nom', (req,res) => {
    //console.log(req.params.nom)
    res.render('mostraFilm', { nomFilm : req.params.nom , username : req.session.userId })
})

app.get('/login', redirectHome, (req,res)=> {
    res.render('login');
})

app.get('/register', redirectHome, (req,res)=> {
    res.render('register');
})

app.post('/login', redirectHome, (req,res)=> {
    const { name, password } = req.body
    if (name && password){
        const user = Usuari.find({$and:[{nom:name},{contrasenya:password}]})
        Usuari.find({$and:[{nom:name},{contrasenya:password}]})
        .then(response => {
            if(response.length === 1){
                req.session.userId = name
                res.redirect('/home')
            } else {
                res.redirect('/login')
            }
        })
        .catch(error => {
            res.json({
                message: 'Hi ha hagut un error!'
            })
        })
    }
})

app.post('/register', redirectHome, (req,res)=> {
    const { name, password, email, edat } = req.body
    if (name && password && email && edat){
        Usuari.find({$or:[{nom:name},{contrasenya:password}]})
        .then(response => {
            if(response.length === 0){
                req.session.userId = name
                res.redirect('/home')
            } else {
                res.redirect('/register')
            }
        })
        .catch(error => {
            res.json({
                message: 'Hi ha hagut un error!'
            })
        })
    }
})

app.get('/logout',redirectLogin,(req,res)=> {
    req.session.destroy(err => {
        if (err){
            return res.redirect('/home')
        }
        res.clearCookie('sid')
        res.redirect('/login')
    })
})

app.use('/api/films', FilmRoute)
app.use('/api/usuaris', UsuariRoute)
app.use('/api/ressenyes', RessenyaRoute)
app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
})