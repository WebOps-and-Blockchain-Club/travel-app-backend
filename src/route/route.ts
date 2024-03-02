import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import { prisma } from "..";

const router = Router();


let graph: Record<string, unknown> = {};


router.post("/getroute", async (req, res) => {
  // const {
  //   fromId,
  //     toId,
  //     departDate,
  //     returnDate,
  //     iata,
  //     timeofarrival,
  //     timeofdeparture
  // } = req.body;


   const requestData = req.body;
   graph = req.body;
  
   
   res.send('POST request received successfully');

  console.log(requestData);

});

console.log("yo0ooo",graph);

export default router;
