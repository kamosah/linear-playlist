import { House } from "lucide-react";

export const SidebarNavigation = () => {
  return (
    <>
      <aside
        id="default-sidebar"
        className="w-64 h-screen"
        aria-label="Sidebar"
      >
        <div className="h-full px-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <House />
                <span className="ms-3">Home</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
