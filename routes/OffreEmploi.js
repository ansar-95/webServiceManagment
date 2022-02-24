const express = require('express');
const router = express.Router();
const offreEmploiController = require('../Controllers/OffreEmploi')

router.post('/indeed', offreEmploiController.findDetailCandidature);

module.exports = router;