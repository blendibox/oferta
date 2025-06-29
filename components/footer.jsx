import Link from 'next/link';

//import categories from '../data/categories.json';

const Footer = () => {

  const more = 1;
  return (
    <footer >
      <div className="footer">
          <hr/>
          <amp-addthis width="320" height="92" data-pub-id="ra-6352ef93c394f488" data-widget-id="9mgw" data-widget-type="inline"></amp-addthis><br/>
          <Link className="brand" href='https://www.blendibox.com.br' >Blendibox - 2023</Link>     
      </div>
    </footer>
  );
};

export default Footer;