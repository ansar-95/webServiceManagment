const Candidature = require('../models/Candidature');


exports.SaveCandidature = (req, res, next) => {



        const candidature = new Candidature({
            userId : req.body.userId,
            jobTitle : req.body.jobTitle,
            location : req.body.location,
            nomEntreprise : req.body.nomEntreprise,
            typeDeContrat : req.body.typeDeContrat,
            descriptionPost : req.body.descriptionPost,
            dateCandidature : req.body.date,
        }) 
        candidature.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !', data : candidature}))
        .catch(error => res.status(400).json({ error }));
};


exports.findAllById = (req, res, next) => {

    Candidature.find({ userId: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));

    
};


