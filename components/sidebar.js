import Link from 'next/link';

import categories from '../data/categories.json';

const Sidebar = () => {
  return (
    <amp-sidebar id="sidebar" className="sidebar" layout="nodisplay" side="left" aria-label="Sidebar" >
      <button on="tap:sidebar.toggle" className="sidebar-trigger">
        ✕
      </button>
      <amp-accordion id="menu-accordion" >

         <section>
          <h3>Links</h3>         
          <ul className="menu overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 space-y-2">
        {categories.map(cat => {
          return (
            <li key={cat.url} >
              <Link href={`${cat.url}`} as={`${cat.url}`}   className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <a  className="ml-3" >{cat.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>        
    </section>     
   <section>
  <h3>Cupons</h3>
  <p>Em breve</p>
</section>
<section>
  <h3>Sobre</h3>
  <div><Link href="https://www.blendibox.com.br">
              <a className="flex flex-initial items-center font-bold md:mr-24">
                
                <span> &copy; Blendibox 2022</span>
              </a>
            </Link></div>
</section>

</amp-accordion>

      
    </amp-sidebar>
  );
};

export default Sidebar;