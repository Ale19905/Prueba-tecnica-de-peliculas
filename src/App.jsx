import { useEffect, useState, useRef } from 'react'
import Search from '../Components/Search'
import Movie from '../Components/Movie'

export default function App(){
  const [toSearch, setToSearch] = useState('')
  const [noMovie, setNoMovie] = useState(false)
  const [firstinput,setFirstinput] = useState(true)
  const [movie, setMovie] = useState('')
  const [ titlesearch, setTitlesearch] = useState(false)
  const inputRef = useRef()


  useEffect(() => {
    if (inputRef.current.checked) {
      fetch(`http://www.omdbapi.com/?apikey=448604fc&t=${toSearch}`)
      .then((response) => response.json())
      .then((result) => {
        console.log('check true');
        console.log(result);
        setMovie({title: result.Title,
                  year: result.Year,
                  image: result.Poster  
                })
        if(result.Response === 'False'){
          setNoMovie(true)
        }else{
          setNoMovie(false)
          setFirstinput(false)
        }
        })
      .catch((error) => console.error(error));

    }else{
        
        fetch(`http://www.omdbapi.com/?apikey=448604fc&s=${toSearch}`)
        .then((response) => response.json())
        .then((result) => {
          console.log('check false');
          console.log(result);
          
          
          setMovie(result)
          /*setMovie({title: result.Title,
                    year: result.Year,
                    imagen: result.Poster  
                  })*/
          if(result.Response === 'False'){
            setNoMovie(true)
          }else{
            setNoMovie(false)
            setFirstinput(false)
          }
          })
        .catch((error) => console.error(error));
    
        }
  }, [toSearch])

  
  const handeChange = (e) => {
    setToSearch(e.target.value)
  } 
  const handleCheck = () => {
    setTitlesearch(!titlesearch)
  }

  

  return(
    <>
      
        <h1 style={{display:'flex',
                    justifyContent:'center' 
                    }}    
        >Prueba Tecnica de Peliculas</h1>
        
        <div className='search_container'>
          <input onChange={handeChange} className="input_search" type="text" placeholder="Avengers, Blade Runner 2049, Oppenheimer"/>
          <button className="btn_search">Search</button>
          
          <input ref={inputRef} className='inputCheck' type="checkbox" onClick={handleCheck}  />
          <label style={{color: '#fff'}} htmlFor="" >Search By Title</label>
        </div>
        
      
      <main>
        {noMovie === true 
          ? firstinput === true && (<p style={{display:'flex', justifyContent:'center', alignItems:'center', margin:'5px'}}>No se encontraron peliculas</p>) 
          : titlesearch === true 
              ? (<Movie title={movie.title} year={movie.year} poster={movie.image}/>) 
              : (<ul className='container_all'>
                {movie.Search?.map((item) => (
                  <li className='movies' key={movie.imdbID}>
                      <Movie title={item.Title} year={item.Year} poster={item.Poster} />
                  </li>
                ))}           
                </ul>)
            
        }
          

      </main>
     

    </>
  
  )}