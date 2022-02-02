const express = require('express');
const rp = require('request-promise');
const $ = require('cheerio').default;
const { htmlToText } = require('html-to-text');
const mongoose = require('mongoose');
const app = express();
const Candidature = require('./models/Candidature');
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

app.post('/api/candidature', (req, res, next) => {

    const link = req.body.html;
    const words = link.split('?');
    console.log(words);
    const words2 = words[1].split('&');
    console.log(words2);
    var jk ='';
    for(var i = 0; i< words2.length;i++){

      if(words2[i].match('^jk')){
        const words3 = words2[i].split('=');
        jk = words3[1];
      }

    }



    const linkJobDetails = 'https://fr.indeed.com/voir-emploi?viewtype=embedded&jk='+jk;
    console.log(linkJobDetails);
    rp(linkJobDetails)
    .then(function(html){

        var postTitle = $("h1",html).text();

        var typeContract,companyName,lieu,description;
        companyName = $("#viewJobSSRRoot > div > div.icl-Container--fluid.fs-unmask.jobsearch-ViewJobLayout-fluidContainer.is-FR > div > div > div > div.jobsearch-ViewJobLayout-jobDisplay.icl-Grid-col.icl-u-xs-span12.icl-u-lg-span7 > div > div.jobsearch-JobComponent-embeddedHeader > div > div:nth-child(2) > div.jobsearch-CompanyInfoContainer > div > div > div > div:nth-child(2) > div",html).html();
        if(companyName == null){
          companyName = $("#viewJobSSRRoot > div > div.icl-Container--fluid.fs-unmask.jobsearch-ViewJobLayout-fluidContainer.is-FR > div > div > div > div.jobsearch-ViewJobLayout-jobDisplay.icl-Grid-col.icl-u-xs-span12.icl-u-lg-span7 > div > div.jobsearch-JobComponent-embeddedHeader > div > div:nth-child(1) > div.jobsearch-CompanyInfoContainer > div > div > div > div.jobsearch-InlineCompanyRating.icl-u-xs-mt--xs.icl-u-xs-mb--md > div:nth-child(2) > div",html).text();
          typeContract = $("#viewJobSSRRoot > div > div.icl-Container--fluid.fs-unmask.jobsearch-ViewJobLayout-fluidContainer.is-FR > div > div > div > div.jobsearch-ViewJobLayout-jobDisplay.icl-Grid-col.icl-u-xs-span12.icl-u-lg-span7 > div > div.jobsearch-JobComponent-embeddedHeader > div > div:nth-child(2) > div:nth-child(1) > div",html).text();
          lieu = $("#viewJobSSRRoot > div > div.icl-Container--fluid.fs-unmask.jobsearch-ViewJobLayout-fluidContainer.is-FR > div > div > div > div.jobsearch-ViewJobLayout-jobDisplay.icl-Grid-col.icl-u-xs-span12.icl-u-lg-span7 > div > div.jobsearch-JobComponent-embeddedHeader > div > div:nth-child(1) > div.jobsearch-CompanyInfoContainer > div > div > div > div:nth-child(2) > div",html).html();
          
        }else{
          typeContract = $("#viewJobSSRRoot > div > div.icl-Container--fluid.fs-unmask.jobsearch-ViewJobLayout-fluidContainer.is-FR > div > div > div > div.jobsearch-ViewJobLayout-jobDisplay.icl-Grid-col.icl-u-xs-span12.icl-u-lg-span7 > div > div.jobsearch-JobComponent-embeddedHeader > div > div:nth-child(3) > div:nth-child(1) > div > span",html).html();
          companyName = $("#viewJobSSRRoot > div > div.icl-Container--fluid.fs-unmask.jobsearch-ViewJobLayout-fluidContainer.is-FR > div > div > div > div.jobsearch-ViewJobLayout-jobDisplay.icl-Grid-col.icl-u-xs-span12.icl-u-lg-span7 > div > div.jobsearch-JobComponent-embeddedHeader > div > div:nth-child(2) > div.jobsearch-CompanyInfoContainer > div > div > div > div.jobsearch-InlineCompanyRating.icl-u-xs-mt--xs.icl-u-xs-mb--md > div:nth-child(2) > div > a",html).html();
      
        }
        const listItems = $(".jobsearch-jobDescriptionText",html);
        listItems.each(function (idx, el) {
          description += $(el).html();
        });
        description = htmlToText(description);
        // const candidature = new Candidature({
        //   userId : "1",
        //   jobTitle : postTitle,
        //   location : lieu,
        //   nomEntreprise :companyName,
        //   typeDeContrat : typeContract,
        //   descriptionPost : description,
        //   dateCandidature : Date.now.toString(),
        // }) 
        // candidature.save()
        // .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        // .catch(error => res.status(400).json({ error }));


        res.json({ userId: '1', jobTitle :postTitle, location : lieu, nomEntreprise : companyName,typeDeContrat : typeContract,descriptionPost :description });



    })
    .catch(function(err){
        console.log(err);
    });

    
});
app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});



app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
  next();
});






module.exports = app;