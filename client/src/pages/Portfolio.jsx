//import './App.css';
//import '../index.css';
import Navbar from '../components/Navbar'
import HomeContent from '../components/HomeContent'
import { CurrentTimeProvider } from '../components/CurrentTimeContext'
import { CurrentStockProvider } from '../components/CurrentStockContext'
import background from '../img/stripes2.jpg'

function Portfolio() {
  return (
    <CurrentTimeProvider>
      <CurrentStockProvider>
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            overflow: 'hidden'
        }}className="portfolio">
          <Navbar />
          <HomeContent />
        </div>
      </CurrentStockProvider>
    </CurrentTimeProvider>

  );
}

export default Portfolio;
