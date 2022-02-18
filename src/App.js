import {useState, useEffect} from 'react'
import './App.css';

function App() {

  const [resourceType, setResourceType] = useState('cheese')
  const [items, setItems] = useState([])
  const [loader, setLoader] = useState(false)
  
  useEffect(() => {
    
    const controller = new AbortController()

    setLoader(true)

    fetch(`https://deelay.me/2000/https://api.adviceslip.com/advice/search/${resourceType}` , {signal: controller.signal})
      .then(response => response.json())
      .then(json => setItems(json))
      .then( () => setLoader(false))
      .catch(error => { //uncomplete request
          throw(error);
      })
      .finally( () => { //end of request

      } )

    return () => controller.abort()

  }, [resourceType])

  console.log('render')

  return (
    
    <div className='wrapper'>

      <div className='head'>

        <div className='dots'>

          <span className='red'></span>
          <span className='orange'></span>
          <span className='green'></span>

        </div>

        <div className='colorScheme'> 

          <select name='colorScheme'>
            <option value="volvo">Light</option>
            <option value="saab">Dark</option>
          </select>

        </div>

      </div>

      <div className='main'>

        <div className='title'>

          <h1>Solid advice 🧐</h1>

        </div>

        <div className='buttons'>

          <button className='button' onClick={() => setResourceType('cheese')}><span>🧀</span>Cheese</button>
          <button className='button' onClick={() => setResourceType('love')}><span>❤️</span>Love</button>
          <button className='button' onClick={() => setResourceType('friends')}><span>🫂</span>Friends</button>
          <button className='button' onClick={() => setResourceType('sleep')}><span>😴</span>Sleep</button>
          <button className='button' onClick={() => setResourceType('food')}><span>🍽️</span>Food</button>
          <button className='button' onClick={() => setResourceType('spiders')}><span>🕷️</span>Spiders</button>
          <button className='button' onClick={() => setResourceType('regret')}><span>😥</span>Regret</button>
          <button className='button' onClick={() => setResourceType('work')}><span>👨‍💻</span>Work</button>
          <button className='button' onClick={() => setResourceType('testtt')}><span>???</span>NIKS</button>

        </div>

        <div className='content'>

          <h2>
            Here is some solid advice about
            <br />
            <span>{resourceType}</span>
          </h2>

          <div className='results'>


            {loader ? ('LOADING...') : (

              <ul className='outputList'>

                {items.slips?.map(item => {

                  return <li key={item.id}>{JSON.stringify(item.advice).replace(/['"]+/g, '')}</li>

                }  ) }


              </ul>

            ) }

          </div>

        </div>

      </div>

    </div>

  );
}

export default App;



// Quotes weghalen doormiddel van str function > Kan dat makkelijker?
// nummer lijst doormiddel van CSS > Kan dat makkelijker?