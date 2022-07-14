
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    endpoint: 'https://s3.filebase.com',
    region: 'us-east-1',
    s3ForcePathStyle: true
    , signatureVersion: 'v4'
  });
  
export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');

//---- other code

//Preflight CORS handler
  if(request.method === 'OPTIONS') {
      return response.status(200).json(({
          body: "OK"
      }))
  }
      const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: request.body.name,
          Expires: 60 * 6000,
          ContentType: request.body.type
          };
          const url = await s3.getSignedUrlPromise("putObject", params);
      

    response.status(200).json({
      body: url,
  
    });
  }
