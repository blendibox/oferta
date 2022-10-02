// pages/api/rss-gen.js
import { NextApiRequest, NextApiResponse } from "next";
import { buildFeed } from "../../../components/feed";


export default async ( NextApiRequest,  NextApiResponse) => {

  const feed = await buildFeed();

  var text = feed.rss2().replace('version="2.0"', 'version="2.0" xmlns:g="http://base.google.com/ns/1.0"');

  const xml = text.rss;

 // console.log(xml);

 // text.forEach((post) => {
 //   console.log(post);
 // });
  



  NextApiResponse.statusCode = 200;
  NextApiResponse.setHeader("content-type", "application/xml");
  NextApiResponse.end(text);
};