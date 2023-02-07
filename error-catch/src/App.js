import './App.css';
import User from './User';
import ErrorBoundary from './ErrorBoundary';

function App() {

  const user = {
    username: 'jinho',
    id: 1
  };

  return (
    <ErrorBoundary>
      <User />
    </ErrorBoundary>
  );
}

export default App;
