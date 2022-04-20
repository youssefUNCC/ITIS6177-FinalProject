const express = require('express');
const axios = require('axios').default;
const app = express();
const port = 3000;
const subscriptionKey = 'TOP_SECRET_CODE';
const detectEndpoint = 'https://itis6177-finalproject.cognitiveservices.azure.com/' + '/face/v1.0/detect';
const verifyEndpoint = 'https://itis6177-finalproject.cognitiveservices.azure.com/' + '/face/v1.0/verify';

app.use(express.urlencoded({extended: true}));

app.get('/', (req,res)=>{
    res.send('Visit the path "\/detect\" or "\/verify\" for directions');
});

app.get('/detect', (req,res)=>{
    res.send('POST a url image to the path "\/detect\" where the key is "\image\" and the value is "\{YOUR_IMAGE_URL}\" ');
});

app.get('/verify', (req,res)=>{
    res.send('POST a faceID taken from the "\/detect\" endpoint, where the first key is "faceId1\" and the value is "\{YOUR_FACEID_FOR_FIRST_IMAGE}\" and the second key is "faceId2\" and the second value is "\{YOUR_FACEID_FOR_SECOND_IMAGE}\" ');
});

app.post('/detect', (req,res, next)=>{


let imageUrl = req.body.image;

axios({
    method: 'post',
    url: detectEndpoint,
    params : {
		detectionModel: 'detection_01',
        returnFaceId: true,
        returnFaceAttributes: 'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
    },
    data: {
        url: imageUrl,
    },
    headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
}).then(function (response) {
    console.log('Status text: ' + response.status);
    console.log('Status text: ' + response.statusText);
    console.log();
    console.log(JSON.stringify(response.data));
    console.log(response.data[0].faceAttributes.emotion);
    console.log(response.data[0].faceId);
    res.json(JSON.stringify(response.data));
}).catch(function (error) {
    console.log(error)
    next();
});
});

app.post('/verify', (req,res, next)=>{
    
    let face1 = req.body.faceId1;
    let face2 = req.body.faceId2;

    
    
    axios({
        method: 'post',
        url: verifyEndpoint,
        params : {
            
        },
        data: {
            faceId1: face1,
            faceId2: face2
        },
        headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
    }).then(function (response) {
        console.log('Status text: ' + response.status);
        console.log('Status text: ' + response.statusText);
        console.log();
        console.log(response.data);
        res.json(response.data);
    }).catch(function (error) {
        console.log(error)
        next();
    });
    });


app.listen(port, ()=>{
    console.log(`App listening at http://localhost:${port}`);
})
