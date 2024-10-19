import { Router } from "express";
import Url from "../models/urlSchema.js";
import { auth } from "../middleware/authMiddleware.js";

const router = Router();

router.post('/submit', auth, async (req, res) => {
  const { url , name, role} = req.body; // Destructuring to extract the URL from the body
  const userId = req.userId;
   // Accessing userId from the middleware's attachment to the request object

  try {
    let urlEntry = await Url.findOne({ url, userId });
  
    if (!urlEntry) {
      urlEntry = new Url({ url, userId , name,role });
      await urlEntry.save();
      res.status(201).json({ msg: "URL submitted and monitoring started" });
    } else {
      res.status(400).json({ msg: 'URL already exists for this user.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/status', auth, async (req, res) => {
    try {
        const userUrls = await Url.find({ userId: req.userId }).select('url status lastChecked'); // Use the correct model name (Url)
        res.json({userUrls});
    } catch (err) {
        console.error(err); // Log the error to the console for better debugging
        res.status(500).json({ msg: 'Server error' });
    }
});

export default router;