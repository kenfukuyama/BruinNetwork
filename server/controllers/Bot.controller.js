// extra files
const axios = require('axios');
const colors =  require('colors');
colors.enable();

const envKeyG =process.env.g;
const envKeyC =process.env.c;

module.exports.getSearchResult = (request, response) => {

    axios.get(`https://www.googleapis.com/customsearch/v1?key=${envKeyG}&cx=${envKeyC}&q=${request.body.query}`)
    .then( res => {
        response.status(200).json(res.data);
    })
    .catch(err => response.status(400).json(err));

    // .then( res => response.status(200).json(res))
    // .catch(err => response.status(400).json(err));
    // response.status(200).json({msg : 'ok'});
}
