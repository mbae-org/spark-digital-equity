## spark-digital-equity

## Before installations

1. Ensure you have node and npm installed
npm.version >= 6.13.4
node.version >= v10.18.1

2. Ensure you have git installed

## installation

    git clone https://github.com/arorashu/spark-digital-equity.git    
    cd spark-digital-equity
    npm install
    npm start
    
    
## Generate Static Build

To generate a static production website build, run the following build command:
    
    npm run build
 
This will generate html, minified js and css in the `build` folder, the contents of this folder can then be served by any production server.
Refrences : https://create-react-app.dev/docs/deployment/
