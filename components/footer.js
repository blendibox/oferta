import Link from 'next/link';

//import categories from '../data/categories.json';

const Footer = () => {

  const more = 1;
  return (
    <footer >
  
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-accent-2 py-12 text-primary bg-primary transition-colors duration-150">
          <div className="col-span-1 lg:col-span-2">
            <Link href="https://www.blendibox.com.br">
              <a className="flex flex-initial items-center font-bold md:mr-24">
                <span className="rounded-full border border-accent-6 mr-2">
                  Desenvolvido por 
                </span>
                <span> Blendibox</span>
              </a>
            </Link>
          </div>
          <div className="col-span-1 lg:col-span-8">
         
          </div>
          <div className="col-span-1 lg:col-span-2 flex items-start lg:justify-end text-primary">
            <div className="flex space-x-6 items-center h-10">

         
            </div>
          </div>
        </div>
        <div className="pt-6 pb-10 flex flex-col md:flex-row justify-between items-center space-y-4 text-accent-6 text-sm">
          <div>
            <span>&copy; Blendibox 2022.</span>
          </div>

        </div>
   
    </footer>
  );
};

export default Footer;