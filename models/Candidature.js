const mongoose = require('mongoose');


const candidatureSchema = mongoose.Schema({

  userId: { type: String, required: true },
  jobTitle: { type: String, required: true },
  location: { type: String, required: true },
  nomEntreprise: { type: String, required: true },
  typeDeContrat: { type: String, required: true },
  descriptionPost: { type: String, required: true },
  dateCandidature: { type: String, required: true },
});

module.exports = mongoose.model('Candidature', candidatureSchema);