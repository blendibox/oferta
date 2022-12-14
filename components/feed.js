// lib/feed.ts
import { Feed } from "feed";
import  make  from "../data/avon-make.json";


export const buildFeed = async () => {
	// This contains site level metadata like title, url, etc
  const feed = new Feed( {
      title: 'Blendibox',
      link: process.env.NEXT_PUBLIC_DOMAIN_URL,
      description: 'Blendibox - Compre as melhores ofertas da internet',

   });

   // feed._declaration._attributes.push({"xmlns:g" : "http://base.google.com/ns/1.0"});

    // feed.rss.push({attributes: {"xmlns:g": "http://base.google.com/ns/1.0"}});

  const posts = await make;
  posts.forEach((post) => {
    feed.addItem({
       title: post.title,
       link:  post.link + post.afilio + '&utm_source=Site&utm_medium=GoogleMerchant&utm_campaign=GoogleMerchant',
       description: post.title,
       date: '',
      
      content: '<g:image_link>'+post.image+'</g:image_link><g:price>' + post.price + '</g:price>',
     

    });
  });

  return feed;
};