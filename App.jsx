const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, Link } = ReactRouterDOM;
import { BookApp } from './apps/Books/pages/BookApp.jsx';
import { BookDetails } from './apps/Books/pages/BookDetails.jsx';
import { EmailApp } from './apps/Email/pages/EmailApp.jsx';
import { KeepApp } from './apps/Keep/pages/KeepApp.jsx';
import { AppHeader } from './cmps/AppHeader.jsx';

import { Home } from './pages/Home.jsx';

export function App() {
  return (
    <Router>
      <header>
    <AppHeader/>
      </header>
      <main>
      <Switch>
        <Route component={BookDetails} path='/book/:bookId'/>
        <Route component={BookApp} path='/book'/>
        <Route component={EmailApp} path='/email' />
        <Route component={KeepApp} path='/keep' />
        <Route component={Home} path='/' />
      </Switch>
      </main>
      <footer>

      </footer>
    </Router>
  );
}
