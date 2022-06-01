import React from "react"
import { createRoot } from "react-dom/client"

import "@gid/styles/styles"

const App = () => (
  <div className="container">
    <h1>Webpack course</h1>
    <hr />
    <div className="logo"></div>
    <div className="card">
      <h2>
        SCSS
      </h2>
    </div>
  </div>
)

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);

const devMode = process.env.NODE_ENV === 'development';
if (devMode && module && module.hot) {
  module.hot.accept();
}
