// components/Layout.js

import styles from '../styles/Home.module.css'

function Layout(props) {

const font = "/Poppins-Regular.woff";


  return (
<div className={styles.container}>
      {props.children}
      <style jsx global>{`
         @font-face {
           font-family: Poppins Regular;
           src: url(${font});
           font-display: swap;
        }


        .button:hover {
          animation-name: shake;
          animation-duration: 0.82s;

          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        @keyframes shake {
          10%, 90% {
            transform: translate3d(-1px, 0, 0);
          }
          
          20%, 80% {
            transform: translate3d(2px, 0, 0);
          }

          30%, 50%, 70% {
            transform: translate3d(-4px, 0, 0);
          }

          40%, 60% {
            transform: translate3d(4px, 0, 0);
          }
        }

         .containner{
          text-align:center;
          font-family: Poppins Regular;
        }
        h1, h2 {
          margin: 5px;

        }
        h2{
          color:#222222;
        }
        a{
          text-decoration:none;
          color:#222222;
        }
        .search{
          top:4px;
        }
        .image{
         
        }
        .button{
          background-color:#f05395;
          color:#ffffff;
          font-size:1.1em;
          border-radius:8px;
          padding: 5px 5px 5px 5px;
          
        }
        p {
          font-size: 18px;
          line-height: 30px;
          margin-top: 30px;

        }
        .caption {
          color: #444444;
          margin-top: 0;
          font-size: 14px;
          text-decoration: line-through;
          text-align: center;
        }
      `}</style>
  </div>
  );
}

export default Layout;