Requirements
------------
Node - 6.2.2
npm - 3.9.5
MongoDB - 3.2.7

How To Setup
------------
1. install all dependencies :
 npm install
2. to run app :
 node app.js
3. Your app will be running on port 3000.
4. Check it by making a GET request to localhost:3000/ping. The response should be 'Pong'.

Run Tests
_________

1. To run all Jasmine Spec files :
  npm test


Local Build
___________

1.  To perform a local build :
  npm run build
2.  If successful, your app will be running on port 3000.
3.  Check it by making a GET request to localhost:3000/ping. The response should be 'Pong'.

Common issues :
-----------
1. typings cannot find module
'npm install typings' is putting typings module but not making entry in typings.json
using './node_modules/typings/dist/bin.js' to install the typing. 
