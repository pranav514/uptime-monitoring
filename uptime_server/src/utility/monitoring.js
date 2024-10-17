import Url from "../models/urlSchema.js";
import axios  from "axios";
const monitorURLs = async () => {
    try {
        console.log('monitoring started')
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

export default monitorURLs