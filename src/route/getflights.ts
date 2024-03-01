import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { getJson } from "serpapi";
import { Router } from "express";

// const app = express();
// const PORT = process.env.PORT || 3000;

const router = Router();

// app.use(bodyParser.json());

// Endpoint to handle requests from the frontend
router.post('/search_flights', (req: Request, res: Response) => {
  const {
    departure_id,
    arrival_id,
    outbound_date,
    return_date
  } = req.body;


  getJson({
    api_key: "ffa7bbd869cbd84e84c77d80b8d322fc9caaf5fbabb10eb171e9e256fa6b71a9",
    engine: "google_flights",
    departure_id,
    arrival_id,
    hl: "en",
    gl: "us",
    currency: "INR",
    outbound_date,
    return_date
  }, (json: any) => {
    res.json(json);
  });
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
export default router;