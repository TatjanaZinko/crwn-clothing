import './App.css';

function App() {
  const categories = [
    {
      id: 1,
      title: 'Hats'
    },
     {
      id: 2,
      title: 'Hats'
    },
     {
      id: 3,
      title: 'Hats'
    },
     {
      id: 4,
      title: 'Hats'
    },
     {
      id: 5,
      title: 'Hats'
    },
  ]

  return (
    <div className="categories-container">
      <Directory categories={categories} />
    </div>
  );
}

export default App;
