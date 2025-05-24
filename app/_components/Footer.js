import Link from "next/link";

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal text-base-content p-10 bg-base-200">
      <aside>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 122.88 114.86"
          className="w-10 h-10 fill-current text-green-600 hover:text-green-700 transition-colors duration-300"
        >
          <title>leaves</title>
          <path d="M59.07,110.77C110.92,105,139.6,71.12,112.44,0c-21.29,14.9-50.39,24.6-65,44.55C57,52.94,64.89,62.23,67.08,74.37c13.19-16.08,27.63-30.72,35.23-47-7.79,39.07-20,53.84-38.78,73.81a93.64,93.64,0,0,1-4.46,9.62Zm-14.9,4C4,105-15.18,76.09,14.27,24.75c23.8,22.92,65.79,37.48,38.39,85.86a27.08,27.08,0,0,1-1.83,2.93C45.9,89.62,26.21,70.69,20.43,50.61,21.77,83.42,31.23,93,45.88,114.86c-.57,0-1.14-.06-1.71-.13Z" />
        </svg>
        <p className="mt-2 text-sm text-base-content select-none">
          &copy; {new Date().getFullYear()} Smart & Secure Harvesting AAST. All
          rights reserved.
        </p>
      </aside>

      <nav>
        <h6 className="footer-title opacity-100">Socials</h6>
        <div className="grid grid-flow-col gap-4">
          {/* X (Twitter new logo) */}
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="fill-current text-base-content hover:text-black transition-colors duration-300 w-6 h-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
          </Link>

          {/* Facebook */}
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="fill-current text-base-content hover:text-blue-600 transition-colors duration-300 w-6 h-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 33.867 33.867"
              className="w-6 h-6"
            >
              <path
                d="M17.892 1.058c-3.366 0-4.932 2.055-4.932 4.932v6.948h-2.38c-.88 0-1.588.708-1.588 1.588v3.343c0 .88.708 1.588 1.587 1.588h2.381v11.78c0 .88.708 1.587 1.588 1.587h3.344c.88 0 1.587-.708 1.587-1.587v-11.78h3.056c.88 0 1.4-.728 1.587-1.588l.728-3.343c.187-.86-.708-1.588-1.588-1.588H19.48v-2.156c0-2.377.535-3.205 2.85-3.205h.677c.88 0 1.588-.708 1.588-1.587V2.646c0-.88-.708-1.588-1.588-1.588h-5.114z"
                paintOrder="fill markers stroke"
              />
            </svg>
          </Link>

          {/* YouTube */}
          <Link
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="fill-current text-base-content hover:text-red-600 transition-colors duration-300 w-6 h-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M23.498 6.186a2.99 2.99 0 0 0-2.106-2.117C19.695 3.5 12 3.5 12 3.5s-7.695 0-9.392.569a2.99 2.99 0 0 0-2.106 2.117A31.19 31.19 0 0 0 0 12a31.19 31.19 0 0 0 .502 5.814 2.99 2.99 0 0 0 2.106 2.117c1.698.569 9.392.569 9.392.569s7.695 0 9.392-.569a2.99 2.99 0 0 0 2.106-2.117A31.19 31.19 0 0 0 24 12a31.19 31.19 0 0 0-.502-5.814zM9.546 15.568V8.432l6.273 3.568-6.273 3.568z" />
            </svg>
          </Link>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
