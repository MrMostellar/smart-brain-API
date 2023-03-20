const fetch = require('node-fetch');
const handleApiCall = (req, res) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '1be12b20d7574e88b1de317e782e7353';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'mostellar';       
    const APP_ID = 'SmartBrain';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = req.body.input;
        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": IMAGE_URL
                        }
                    }
                }
            ]
        });
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };
    
        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result){
                console.log(res.json());
                return res.json(result);
            } else{
                console.log(res.json());
                return res.status(400).json('No image');
            }
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports = {handleApiCall};