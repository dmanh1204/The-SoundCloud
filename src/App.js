import React, { useState } from 'react';
import { fetchApi } from './utils/';

const App = () => {
  fetch('https://api.themoviedb.org/3/genre/99/movies').then(res =>
    console.log(res)
  );

  const [data, setData] = useState(0);

  return <div onClick={() => setData(prev => prev + 1)}>{data}</div>;
};

export default App;
