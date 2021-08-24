import express from 'express';
import mongoose from 'mongoose'
import Messages from './db.js';
import Pusher from 'pusher'
import cors from 'cors';
const app = express();

const port = process.env.PORT || 8000;
//!middleware
app.use(express.json())

app.use(cors())

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Original","*");
    res.setHeader("Access-Control-Allow-Header","*");
    next();
});


//!save database and fatch
app.get('/messages/sync', (req, res) => {

    Messages.find(db, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
});

//!pusher for realtime response

const pusher = new Pusher({
    appId: "1254254",
    key: "bf983811ae88dc945433",
    secret: "77caec54bd5d6e526f80",
    cluster: "ap2",
    useTLS: true
});

const pdb = mongoose.connection;

pdb.once('open', () => {
    console.log('db connected')

    const msgCollection = pdb.collection("messagecontents");

    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log("change accu", change)

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {
                    name: messageDetails.user,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received,
                    
                })
        }
        else {
            console.log('error')
        }

    }
    );
});
const connection_url = 'mongodb+srv://admin:Omk0HZQr51pAjCjR@cluster0.b6u14.mongodb.net/whatsappdb?retryWrites=true&w=majority'

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//!response

app.get('/', (req, res) => res.status(200).send("hello world"))

app.post('/messages/new', (req, res) => {

    const db = req.body;

    Messages.create(db, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }

        else {
            res.status(201).send(data)
        }
    })
});


app.listen(port, () => console.log(`listening on local host :${port}`))      