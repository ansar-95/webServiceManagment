const indeed = require('indeeddetailscrapper');
exports.findDetailCandidature = async (req, res, next) => {
    
    let key = indeed.IndeedKey(req.body.html)
    indeed.IndeedData(key)
    .then(response => {res.json(response)});
    
};