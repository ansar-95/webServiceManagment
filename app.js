const express = require('express');
const mongoose = require('mongoose');
const app = express();
const candidatureRoutes = require('./routes/Candidature');
const userRoutes = require('./routes/user');
const offreEmploi = require('./routes/OffreEmploi')
app.use(express.json());

mongoose.connect('mongodb+srv://cand:bbQBpvaLylhwFi9I@cluster0.kq9xy.mongodb.net/myFirstDatabase',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use('/api/candidature',candidatureRoutes)
app.use('/api/offreEmploie',offreEmploi)
app.use('/api/auth', userRoutes);


module.exports = app;