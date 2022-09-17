// extra files
const axios = require('axios');
const colors =  require('colors');
colors.enable();
const gs = require('../../googleassistant.js');


const homedir = require('homedir')
const deviceCredentials = require(`${homedir()}/.config/google-oauthlib-tool/credentials.json`);

const CREDENTIALS = {
    client_id: deviceCredentials.client_id,
    client_secret: deviceCredentials.client_secret,
    refresh_token: deviceCredentials.refresh_token,
    type: "authorized_user"
};

const {GoogleAssistant} = require('../../googleassistant.js');
const assistant = new GoogleAssistant(CREDENTIALS);

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



module.exports.getAssistantResponse = (request, response) => {
    console.log(request.body.query);
    assistant.assist(request.body.query)
        .then(({ text }) => {
            if (text) {
                console.log(text); 
                response.status(200).json({msg : text});
            }
            else {
                let tempResponse = "Ummm I do not understand, maybe say something else... \n type `search: your question` and I will search for you!";
                console.log(tempResponse);
                response.status(202).json({msg : tempResponse});
            }
        })
        .catch(err => {
            let tempResponse =  "Something is off while getting the response..."
            response.status(400).json({msg : tempResponse});

        });
}