const { Link } = ReactRouterDOM;
import { IconBook } from '../apps/Books/cmps/IconBook.jsx';
import { IconEmail } from '../apps/Keep/cmps/icon-cmps/IconEmail.jsx';
import { IconText } from '../apps/Keep/cmps/icon-cmps/IconText.jsx';

export function Home() {
  return (
    <section className="home">
    <img className="hero-banner" src="./assets/img/hero-banner.svg" alt=""/>
<div className="apps-home-content">
        <div className="home-content-container">
          <IconEmail />
          <div className="home-contnent">
            <h3>Redefining Email</h3>
            <p>Get the most out of your inbox with AppsusMail. A comprehensive e-mail management system you can rely on. Pin emails, save, sort and filter them as your liking. Your email - your decisio. Get staerted and change your email communication forever. </p>
            <Link to="/email"> Get Started </Link>
          </div>
        </div>

        <div className="home-content-container">
          <div className="home-contnent">
            <h3>Bringing Order To your Life</h3>
            <p>We can find anything online, but how can we organize it? Meet AppsKeep, our pioneering note-taking app. Orgainize your notes, images,locations and much more - all in one platform to make order in your life </p>
            <Link to="/keep"> Get Started </Link>
          </div>
          <IconText />
        </div>
        <div className="home-content-container">
          <IconBook />
          <div className="home-contnent">
            <h3>Bye GoodReads,  Hello Miss. Books</h3>
            <p>Have you ever dreamed of a private library? Where you do not need to go through countless blog posts about a book you are looking for? Miss Books keeps your book environment clean, tidy and to the point.Just like any great library.Search for books , rate them , add them to your personal library and establish a meaningful book collection, distraction-free.    </p>
            <Link to="/books"> Get Started </Link>
          </div>
        </div>
     
</div>
    </section>
  );
}
