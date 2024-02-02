const express = require('express');
const cors = require('cors')
const cluster = require('cluster')
const os = require('os')
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./graphqlschema/type-defs');
const { resolvers } = require('./graphqlschema/resolvers');
const { loginController, verifyUser, rejisterController } = require('./controller/loginController')
const connectDB = require('./database/database');
const PORT = process.env.PORT || 4000;

const app = express();
const server = new ApolloServer({
    typeDefs, resolvers, context: ({ req, res, next }) => ({
        token: req.header('Authorization'),
        req,
        res,
        next
    })
});
app.use(cors());
app.use(express.json());
// database connect
connectDB();

// routes
// app.post('/login', loginController)
// app.post('/register', rejisterController)


// creating the clusters for making node more durable for multiple requests
// if (cluster.isMaster) {
//     const numCPUs = os.cpus().length;
//     // console.log(`Master ${process.pid} is running`);
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }
//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`Worker ${worker.process.pid} died`);
//         cluster.fork();
//     });
// }


async function startServer() {
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
}
startServer();

// const authenticateJWT = (req, res, next) => {
//     const token = req.headers.authorization;

//     if (token) {
//       jwt.verify(token, SECRET_KEY, (err, user) => {
//         if (err) {
//           return res.sendStatus(403); // Forbidden if token is invalid
//         }

//         req.user = user;
//         next();
//       });
//     } else {
//       res.sendStatus(401); // Unauthorized if no token provided
//     }
//   };

// app.use(authenticateJWT);

app.get('/', (req, res) => {
    res.status(200).json({
        status: "sucess",
        message: "server is running"
    })
})
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}/graphql`);
});

