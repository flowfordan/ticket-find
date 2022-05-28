import styles from './App.module.css';
import { Search } from './components';
import tickets from './services/flights.json'
import TicketsService from './services/apiTicketsService';
import { APIServiceContext } from './context/apiContext';



function App() {

  const apiService = new TicketsService();

  return (
    <APIServiceContext.Provider value={apiService}>
      <div className={styles.app}>
        <header className={styles.header}>Header</header>
        <Search />
      </div>
    </APIServiceContext.Provider>
  );
}

export default App;
