import Link from 'next/link';
import categories from '../data/categories.json';

const Sidebar = () => {
  return (
    <amp-sidebar id="sidebar" className="sidebar" layout="nodisplay" side="left" aria-label="Sidebar"  className="w-64">
      <button on="tap:sidebar.toggle" className="sidebar-trigger">
        ✕
      </button>

      <ul className="menu overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 space-y-2">
        {categories.map(cat => {
          return (
            <li key={cat.id} >
              <Link href={`${cat.id}`} as={`${cat.id}`}   className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <a  className="ml-3" >{cat.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </amp-sidebar>
  );
};

export default Sidebar;