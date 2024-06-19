### Navigate to the project directory:

cd backend-server

### Install the dependencies:
Make sure you have installed all the required dependencies.
npm init -y
npm install
npm install express body-parser
npm install --save-dev typescript @types/node @types/express ts-node

### Compile TypeScript:
  Compile the TypeScript files into JavaScript.
   npm run build
   
### Start the server:
    Run the server using ts-node to directly execute TypeScript.
    npm start

### End points

- GET /ping
- POST /submit
- GET /read
- DELETE /delete
- PUT /update

  ### db.json
  we used a JSON file (name  as "db.json") as a database for storing the submissions. 
