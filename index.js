const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const database = require('./config/database.js');
const postRouter = require('./Routers/PostRouter.js');
const userRouter = require('./Routers/UserRouter.js');
const cors = require('cors');
const { REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config.js');
const redis = require('redis');
const session = require('express-session');

let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient({
	host: REDIS_URL,
	port: REDIS_PORT,
});

app.use(express.json());

database.connectWithRetry();

app.enable('trust proxy');
app.use(cors({}));
app.use(
	session({
		store: new RedisStore({ client: redisClient }),
		saveUninitialized: false,
		secret: SESSION_SECRET,
		cookie: {
			secure: false,
			resave: false,
			saveUninitialized: false,
			httpOnly: true,
			maxAge: 60000,
		},
	})
);
app.get('/api', (req, res) => {
	res.send('Hello World, here is project test docker!!!');
	// console.log('Test');
});
//localhost:3000
app.use('/api/posts', postRouter);
app.use('/api/', userRouter);

app.listen(PORT, () => {
	console.log(`running on http://127.0.0.1:${PORT}`);
});
