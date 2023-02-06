import Link from 'next/link';

import categories from '../data/categories.json';

const Sidebar = () => {
  return (
    /*<amp-sidebar id="sidebar" className="sidebar" layout="nodisplay" side="left" aria-label="Sidebar" >
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

    */

          /*

      <ul
        className="ampstart-social-follow list-reset flex justify-around items-center flex-wrap m0 mb4"
      >
        <li>
          <a
            href="#"
            target="_blank"
            className="inline-block p1"
            aria-label="Link to AMP HTML Twitter"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="22.2"
              viewBox="0 0 53 49"
            >
              <title>Twitter</title>
              <path
                d="M45 6.9c-1.6 1-3.3 1.6-5.2 2-1.5-1.6-3.6-2.6-5.9-2.6-4.5 0-8.2 3.7-8.2 8.3 0 .6.1 1.3.2 1.9-6.8-.4-12.8-3.7-16.8-8.7C8.4 9 8 10.5 8 12c0 2.8 1.4 5.4 3.6 6.9-1.3-.1-2.6-.5-3.7-1.1v.1c0 4 2.8 7.4 6.6 8.1-.7.2-1.5.3-2.2.3-.5 0-1 0-1.5-.1 1 3.3 4 5.7 7.6 5.7-2.8 2.2-6.3 3.6-10.2 3.6-.6 0-1.3-.1-1.9-.1 3.6 2.3 7.9 3.7 12.5 3.7 15.1 0 23.3-12.6 23.3-23.6 0-.3 0-.7-.1-1 1.6-1.2 3-2.7 4.1-4.3-1.4.6-3 1.1-4.7 1.3 1.7-1 3-2.7 3.6-4.6"
                className="ampstart-icon ampstart-icon-twitter"
              ></path></svg
          ></a>
        </li>
        <li>
          <a
            href="#"
            target="_blank"
            className="inline-block p1"
            aria-label="Link to AMP HTML Facebook"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="23.6"
              viewBox="0 0 56 55"
            >
              <title>Facebook</title>
              <path
                d="M47.5 43c0 1.2-.9 2.1-2.1 2.1h-10V30h5.1l.8-5.9h-5.9v-3.7c0-1.7.5-2.9 3-2.9h3.1v-5.3c-.6 0-2.4-.2-4.6-.2-4.5 0-7.5 2.7-7.5 7.8v4.3h-5.1V30h5.1v15.1H10.7c-1.2 0-2.2-.9-2.2-2.1V8.3c0-1.2 1-2.2 2.2-2.2h34.7c1.2 0 2.1 1 2.1 2.2V43"
                className="ampstart-icon ampstart-icon-fb"
              ></path></svg
          ></a>
        </li>
        <li>
          <a
            href="#"
            target="_blank"
            className="inline-block p1"
            aria-label="Link to AMP HTML Instagram"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 54 54"
            >
              <title>instagram</title>
              <path
                d="M27.2 6.1c-5.1 0-5.8 0-7.8.1s-3.4.4-4.6.9c-1.2.5-2.3 1.1-3.3 2.2-1.1 1-1.7 2.1-2.2 3.3-.5 1.2-.8 2.6-.9 4.6-.1 2-.1 2.7-.1 7.8s0 5.8.1 7.8.4 3.4.9 4.6c.5 1.2 1.1 2.3 2.2 3.3 1 1.1 2.1 1.7 3.3 2.2 1.2.5 2.6.8 4.6.9 2 .1 2.7.1 7.8.1s5.8 0 7.8-.1 3.4-.4 4.6-.9c1.2-.5 2.3-1.1 3.3-2.2 1.1-1 1.7-2.1 2.2-3.3.5-1.2.8-2.6.9-4.6.1-2 .1-2.7.1-7.8s0-5.8-.1-7.8-.4-3.4-.9-4.6c-.5-1.2-1.1-2.3-2.2-3.3-1-1.1-2.1-1.7-3.3-2.2-1.2-.5-2.6-.8-4.6-.9-2-.1-2.7-.1-7.8-.1zm0 3.4c5 0 5.6 0 7.6.1 1.9.1 2.9.4 3.5.7.9.3 1.6.7 2.2 1.4.7.6 1.1 1.3 1.4 2.2.3.6.6 1.6.7 3.5.1 2 .1 2.6.1 7.6s0 5.6-.1 7.6c-.1 1.9-.4 2.9-.7 3.5-.3.9-.7 1.6-1.4 2.2-.7.7-1.3 1.1-2.2 1.4-.6.3-1.7.6-3.5.7-2 .1-2.6.1-7.6.1-5.1 0-5.7 0-7.7-.1-1.8-.1-2.9-.4-3.5-.7-.9-.3-1.5-.7-2.2-1.4-.7-.7-1.1-1.3-1.4-2.2-.3-.6-.6-1.7-.7-3.5 0-2-.1-2.6-.1-7.6 0-5.1.1-5.7.1-7.7.1-1.8.4-2.8.7-3.5.3-.9.7-1.5 1.4-2.2.7-.6 1.3-1.1 2.2-1.4.6-.3 1.6-.6 3.5-.7h7.7zm0 5.8c-5.4 0-9.7 4.3-9.7 9.7 0 5.4 4.3 9.7 9.7 9.7 5.4 0 9.7-4.3 9.7-9.7 0-5.4-4.3-9.7-9.7-9.7zm0 16c-3.5 0-6.3-2.8-6.3-6.3s2.8-6.3 6.3-6.3 6.3 2.8 6.3 6.3-2.8 6.3-6.3 6.3zm12.4-16.4c0 1.3-1.1 2.3-2.3 2.3-1.3 0-2.3-1-2.3-2.3 0-1.2 1-2.3 2.3-2.3 1.2 0 2.3 1.1 2.3 2.3z"
                className="ampstart-icon ampstart-icon-instagram"
              ></path></svg
          ></a>
        </li>
        <li>
          <a
            href="#"
            target="_blank"
            className="inline-block p1"
            aria-label="Link to AMP HTML pin trest"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="28.5"
              viewBox="0 0 43 51"
            >
              <title>pinterest</title>
              <path
                d="M8.134 18.748c0-1.6.2-3 .8-4.4.5-1.4 1.2-2.6 2.2-3.6.9-1 2-1.9 3.2-2.6 1.2-.8 2.5-1.3 3.9-1.7 1.5-.4 2.9-.5 4.4-.5 2.2 0 4.3.4 6.2 1.4 1.9.9 3.5 2.3 4.7 4.1 1.2 1.9 1.8 3.9 1.8 6.2 0 1.4-.1 2.7-.4 4-.2 1.3-.7 2.6-1.2 3.8-.6 1.2-1.3 2.3-2.2 3.2-.8.9-1.8 1.7-3.1 2.2-1.2.6-2.5.9-4 .9-1 0-1.9-.3-2.9-.7-.9-.5-1.6-1.1-2-1.9-.1.5-.3 1.4-.6 2.4-.3 1.1-.4 1.7-.5 2-.1.3-.2.9-.4 1.6-.3.7-.4 1.2-.6 1.5-.1.3-.4.7-.7 1.3-.3.6-.6 1.2-1 1.7-.3.5-.7 1.1-1.3 1.8l-.3.1-.2-.2c-.2-2.2-.3-3.6-.3-4 0-1.3.2-2.8.5-4.4.3-1.7.8-3.7 1.4-6.2.6-2.5 1-3.9 1.1-4.4-.5-.9-.7-2.1-.7-3.6 0-1.2.4-2.3 1.1-3.3.8-1.1 1.7-1.6 2.8-1.6.9 0 1.6.3 2.1.9.4.6.7 1.3.7 2.2 0 .9-.3 2.3-1 4.1-.6 1.8-.9 3.1-.9 4 0 .9.3 1.6 1 2.2.6.6 1.4.9 2.3.9.8 0 1.5-.2 2.2-.5.6-.4 1.2-.9 1.6-1.5.5-.6.9-1.3 1.2-2 .4-.8.6-1.5.8-2.4.2-.8.4-1.6.5-2.4.1-.7.1-1.4.1-2.1 0-2.5-.8-4.4-2.3-5.8-1.6-1.4-3.6-2.1-6.1-2.1-2.8 0-5.2 1-7.1 2.8-1.9 1.9-2.9 4.2-2.9 7.1 0 .6.1 1.2.3 1.8.2.6.4 1.1.6 1.4.2.3.4.7.5 1 .2.3.3.5.3.6 0 .4-.1.9-.3 1.6-.2.6-.5 1-.8 1 0 0-.1-.1-.4-.1-.7-.2-1.3-.6-1.9-1.2-.5-.6-1-1.3-1.3-2-.3-.8-.5-1.6-.7-2.4-.2-.7-.2-1.5-.2-2.2z"
                className="ampstart-icon ampstart-icon-pinterest"
              ></path></svg
          ></a>
        </li>
      </ul>
      */

    <amp-sidebar
      id="header-sidebar"
      className="ampstart-sidebar px3"
      layout="nodisplay"
    >
      <div className="flex justify-start items-center ampstart-sidebar-header">
        <div
          role="button"
          aria-label="close sidebar"
          on="tap:header-sidebar.toggle"
          tabIndex="0"
          className="ampstart-navbar-trigger items-start"
        >
          ✕
        </div>
      </div>
      <nav className="ampstart-sidebar-nav ampstart-nav">
        <ul className="list-reset m0 p0 ampstart-label">
         <li className="ampstart-nav-item">
            <a className="ampstart-nav-link" href="https://comprar.blendibox.com.br/cupons">Cupons de DESCONTO</a>
          </li>
          <li className="ampstart-nav-item">
            <a className="ampstart-nav-link" href="https://comprar.blendibox.com.br/cupons/girafa">Cupons Eletrônicos</a>
          </li>
           <li className="ampstart-nav-item">
            <a className="ampstart-nav-link" href="https://comprar.blendibox.com.br/cupons/walita">Cupons Walita</a>
          </li>
          <li className="ampstart-nav-item">
            <a className="ampstart-nav-link" href="https://comprar.blendibox.com.br/cupons/nike">Cupons da NIKE</a>
          </li>
          <li className="ampstart-nav-item ampstart-nav-dropdown relative">
            <amp-accordion
              layout="container"
              disable-session-states=""
              className="ampstart-dropdown"
            >
              <section>
                <header>Produtos Avon</header>
                <ul className="ampstart-dropdown-items list-reset m0 p0">
                     {categories.map(cat => {
                      return (
                        <li key={cat.url} className="ampstart-dropdown-item" >
                          <Link href={`${cat.url}`} as={`${cat.url}`} >
                            <a  className="text-decoration-none" >{cat.title}</a>
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </section>
            </amp-accordion>


          </li>


          <li className="ampstart-nav-item">
            <a className="ampstart-nav-link" href="https://www.blendibox.com.br">Comprar Produtos Avon</a>
          </li>

          <li className="ampstart-nav-item">
            <a className="ampstart-nav-link" href="https://www.avon.com.br/institucional/seja-representante/cadastro?codigo-self-appointment=74806588">Revender produtos Avon</a>
          </li>

        </ul>
      </nav>





      <ul className="ampstart-sidebar-faq list-reset m0">
        <li className="ampstart-faq-item">
          <a href="https://www.blendibox.com.br" className="text-decoration-none">Sobre</a>
          <Link href="https://www.blendibox.com.br">
              <a className="flex flex-initial items-center font-bold md:mr-24">
                
                <span> &copy; Blendibox 2022</span>
              </a>
            </Link>
        </li>

      </ul>
    </amp-sidebar>

  );
};

export default Sidebar;