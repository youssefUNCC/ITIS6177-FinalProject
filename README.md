# ITIS6177-FinalProject
Final Project for ITIS 6177 using Miscrosoft Azure Face AI


# Instructions
  Face Detection
1. Send a POST request to http://68.183.17.157:3000/detect with a key-value pair in the body.
2. Key: "image", Value: "{YOUR_IMAGE_URL}"

This will result in a string of JSON with various attributes of the persons in the image you have sent.
Ex:
  "[{\"faceId\":\"1e770881-9aff-4991-b387-5ce082ad610c\",\"faceRectangle\":{\"top\":258,\"left\":387,\"width\":458,\"height\":458},\"faceAttributes\":{\"smile\":0.036,\"headPose\":{\"pitch\":-0.5,\"roll\":-0.2,\"yaw\":25.5},\"gender\":\"male\",\"age\":30,\"facialHair\":{\"moustache\":0.6,\"beard\":0.6,\"sideburns\":0.6},\"glasses\":\"NoGlasses\",\"emotion\":{\"anger\":0,\"contempt\":0.001,\"disgust\":0,\"fear\":0,\"happiness\":0.036,\"neutral\":0.956,\"sadness\":0.007,\"surprise\":0},\"blur\":{\"blurLevel\":\"high\",\"value\":1},\"exposure\":{\"exposureLevel\":\"goodExposure\",\"value\":0.29},\"noise\":{\"noiseLevel\":\"low\",\"value\":0},\"makeup\":{\"eyeMakeup\":false,\"lipMakeup\":false},\"accessories\":[],\"occlusion\":{\"foreheadOccluded\":false,\"eyeOccluded\":false,\"mouthOccluded\":false},\"hair\":{\"bald\":0.04,\"invisible\":false,\"hairColor\":[{\"color\":\"black\",\"confidence\":0.99},{\"color\":\"brown\",\"confidence\":0.97},{\"color\":\"gray\",\"confidence\":0.5},{\"color\":\"other\",\"confidence\":0.19},{\"color\":\"blond\",\"confidence\":0.03},{\"color\":\"red\",\"confidence\":0.03},{\"color\":\"white\",\"confidence\":0}]}}}]"

  Face Verification
1. Send a POST request to http://68.183.17.157:3000/verify with two key-value pairs in the body.
2. key: "faceId1", Value: "{YOUR_FACEID_FOR_FIRST_IMAGE}"
3. key: "faceId2", Value: "{YOUR_FACEID_FOR_SECOND_IMAGE}"

This will result in a string of JSON with two attributes, "isIdentical" and "confidence". "isIdentical" is a boolean value that returns true or false based on if the two faces you have sent match. "confidence" is a numerical value that returns the confidence level from 0 to 1 where the lower value is low confidence and high value is high confidence in the "isIdentical" result that is given.
Ex:

{
    "isIdentical": true,
    "confidence": 0.74658
}
