const express = require('express');
const axios = require('axios').default;
const app = express();
const port = 3000;
const subscriptionKey = 'SECRET_CODE'
const endpoint = 'TOP_sECRET_END_POINT' + '/face/v1.0/detect'

app.use(express.urlencoded({extended: true}));

app.get('/', (req,res)=>{
    res.send('POST a url image to the standard path "\/\" ');
});

app.post('/', (req,res, next)=>{


let imageUrl = req.body.image;

axios({
    method: 'post',
    url: endpoint,
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