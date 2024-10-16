import express from "express"
const app = express()
import cors from "cors"
import axios from "axios"
// import bodyParser from "body-parser"
import {port,mongodb_url} from "./config.js"
import mongoose, { connect } from "mongoose"
import userRoutes from './routes/userRoutes.js'
import urlRoutes from './routes/urlRoutes.js'
import Url from "./models/urlSchema.js"
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/user' , userRoutes);
app.use('/api/user' , urlRoutes)


const monitorURLs = async () => {
    try {
        const urls = await Url.find();
        for (let urlEntry of urls) {
            try {
                const response = await axios.get(urlEntry.url, { timeout: 5000 });
                // Update the status to 'up' if the request succeeds
                await Url.findByIdAndUpdate(urlEntry._id, {
                    status: 'up',
                    lastChecked: new Date(),
                });
                console.log(`URL: ${urlEntry.url} is up.`);
            } catch (error) {
                // Update the status to 'down' if the request fails
                await Url.findByIdAndUpdate(urlEntry._id, {
                    status: 'down',
                    lastChecked: new Date(),
                });
                console.error(`Error checking ${urlEntry.url}: ${error.message}`);
            }
        }
    } catch (error) {
        console.error(`Error fetching URLs from the database: ${error.message}`);
    }
};



// Start monitoring URLs every 2 minutes


mongoose.connect(mongodb_url, { dbName: 'uptime_monitoring_data' })
    .then(() => {
        console.log("Connected to the database");
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
        // Start monitoring URLs every 2 minutes
        setInterval(monitorURLs, 120000); // Move this inside the connection success block
    })
    .catch((err) => {
        console.log(err);
    });

