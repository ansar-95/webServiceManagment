const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const candidatureController = require('../Controllers/Candidature')

router.post('/',auth,candidatureController.SaveCandidature);
router.get('/:id',auth, candidatureController.findAllById);

module.exports = router;