import * as express from 'express';
import * as httpClient from 'http';

const userTokenCookieName = 'user_token';

export class AuthenticationService{  
  userToken: string;
  sessionHashJSON: JSON;
  constructor(request: express.Request) {
    this.userToken = request.cookies[userTokenCookieName];
  }

  authenticate(response:express.Response, next: any) {
    response['authentication_service'] = this;
    var request = httpClient.request(this.userServiceGetCurrentUserParams(response),function(userResponse){
      console.log('Got status: ' + userResponse.statusCode);
      if(userResponse.statusCode == 200) {
        
        userResponse.on('data', function(userData) {
          console.log('User Data: ' + userData);
          response['userData'] = userData;
          next(); 
        });
      } else {
        response.writeHead(userResponse.statusCode);  
        response.end();
      }
      // userResponse.resume();
    }).on('error', function(error) {
        console.log('Got error: ' + error.message);
        response.writeHead(403);
        if(process.env.NODE_ENV != 'production') {
          response.end(JSON.stringify(error));
        } else {
          response.end();
        }
    });
    request.end();
  }

  userServiceGetCurrentUserParams(response:express.Response) {
    var discoveryService = response['discovery_service'];
    var params = discoveryService.serviceParams('user_service');
    var hostname = params ? params['ServiceAddress'] : '127.0.0.1';
    var port = params ? params['ServicePort'] : '3000';
    return {method: 'GET', hostname: hostname, port: port, path: '/current_user', headers: {'Cookie': userTokenCookieName + '=' + this.userToken}};
  }
}

