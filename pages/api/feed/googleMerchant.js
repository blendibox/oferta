// pages/api/rss-gen.js
import { NextApiRequest, NextApiResponse } from "next";
import { googleMerchant } from "../../../components/googleMerchant";


export default async ( NextApiRequest,  NextApiResponse) => {

  const feed = await googleMerchant();

  //var text = feed.rss2().replace('version="2.0"', 'version="2.0" xmlns:g="http://base.google.com/ns/1.0"');

 console.log(feed);

 // text.forEach((post) => {
 //   console.log(post);
 // });
  



  NextApiResponse.statusCode = 200;
  NextApiResponse.setHeader("content-type", "application/xml");
  NextApiResponse.end(feed);
};

