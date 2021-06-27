import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './components/Content';
import ToDoItem from './components/ToDoItem';
function App() {
  return (
    <div className='App'>
      <Content />
      <ToDoItem />
    </div>
  );
}

export default App;
