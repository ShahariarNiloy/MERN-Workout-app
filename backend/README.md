# MERN-Workout-App ( backend )

## Configuration
***
> Create an .env file as like .env.example
You need to set 3 variables there.
1. `PORT` 
2. `MONGO_URI`
3. `SECRETE`

### `PORT`
By default PORT is set to 4000, But if you want to change the port number, you can. Give any port whichever you like.
But the port number has a dependency in the frontend side. If you change the port number, then you must need to change the proxy in the package.json under frontend directory for resolving "CORS" issue,

```bash
|-- backend
|-- frontend
    |-- package.json
```

Change the following line,
```bash
{
  "proxy": "http://localhost:4000", <-- give the port number, you have given in the .env file
  ...}
```

### `MONGO_URI`

As this project use Mongodb, that is why you need to do some mongodb configuration on your local machine.

> 1. Go to your browser and browse Mongodb Atlas Dashboard, and go to the first link saying, "MongoDB Dashboard".
> 2.  Sign Up fro Atlas.
> 3.  Login to your account.
> 4.  "Build a Cluster" and then "Create new Cluster" better go for the free plan. Setup your cluster by giving proper information of yours.
> 5.  Under your created cluster, go to the "collection" tab, and create your database by clicking "Add My Own Data".
> 6.  Create your database by giving database name and collection name.
> 7.  Now you have to give your database access to an user. So that on sidebar of the page , select "Database Access" and then create an user.
> 8.  Now go back to your "Clusters" section and under your cluster click in the "connect" button to get your connection string.

Then replace MONGO_URI in the _.env_ file,
```bash
MONGO_URI=<your_db_connection_string>
```

Make Sure you are giving proper connection_string, where you have to give your user name and password in the connection_string of the user you just created, who can access the database.

### `SECRET`

Give any secrete key string for your _jwt_ secrete key. It can be any simple or complex string.


## Installation

To install all the dependency packages, run the command bellow

```bash
npm install
```

This command will install all the required packages.

## Run The Server

To run the project, enter this command in project terminal,

```bash
node server.js
```

But for the development mode, it is always better to keep running the server while making any changes and see the changes right away without running the server again and again. So that, install an optional package globally named `nodemon`. To install it globally, run this command in your terminal,
```bash
npm i -g nodemon
```

Then, simply run

```bash
nodemon server
```

This will run your server. 
There's also a script is written, so you can run the server with this command too,

```bash
npm run dev
```

But this is totally optional. You can find the script in the backend --> _package.json_

**Thank You**
