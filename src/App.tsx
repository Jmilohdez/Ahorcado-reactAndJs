import { useEffect, useState } from 'react';
import { letters } from './helpers/letters';
import { HangImage } from './components/HangImage';
import { getRandomWord } from "../src/helpers/getRandomWord";

import './App.css';

function App() {

    const [ word, setWord ] = useState ( getRandomWord() );
    const [ hiddenWord, setHiddenWord ] = useState( '_ '.repeat( word.length ) );
    const [ attempts, setAttempts ] = useState(0);
    const [ lose, setLose ] = useState( false );
    const [ won, setWon ] = useState( false );

  // Determinar si la persona perdío 
    useEffect( () => {
      if ( attempts >= 9 ) {
          setLose(true);
      }
    }, [ attempts ]); //hooks

    // Determinar si la persona ganó
    useEffect( () => {
      // console.log(hiddenWord);
      const currentHiddenWord = hiddenWord.split(' ').join('');
      if ( currentHiddenWord === word ) {
          setWon(true);
      }
    }, [ hiddenWord, word ]);

    const checkLettter = (letter: string ) => {
      if ( lose ) return;

      if ( won ) return;
      
      if ( !word.includes(letter) ) {
        setAttempts( Math.min( attempts + 1, 9 ) );

      }
      
      const hiddenWordArray = hiddenWord.split(' ');

      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter ) {
          hiddenWordArray[i] = letter
        }
      }
      setHiddenWord( hiddenWordArray.join(' ') );
    }

    const newGame = () => {
        const newWord = getRandomWord();

      setWord( newWord );
      setHiddenWord( '_ '.repeat( newWord.length ) );  //es una instruccion especial en ela cual reemplazamos todas las letras de la palabra por un guion _ y un espacio
      setAttempts(0);
      setLose( false );
      setWon( false );
    }

    return (
        <div className='App'>
          
          {/* Imágenes */}
          <HangImage imageNumber = { attempts } />

          {/* palabra oculta */}
          <h3>{ hiddenWord }</h3>

          {/* Contador de intentos */}
          <h3>Intentos: { attempts }</h3>

          {/* Mensaje de perdio */}
          {
            ( lose ) 
              ? <h2>Perdió, La palabra correcta era { word }</h2>
              : '' 
          }

          {/* Mensaje de ganó */}
          {
            ( won ) 
              ? <h2>EXCELENTE, es correcto la palabra es: { word }</h2>
              : '' 
          }

          {/* Botones de letras */}
          {
              letters.map( (letter) => (
                  <button
                  onClick={ () => checkLettter(letter) } 
                  key={ letter }>
                    { letter }
                  </button>
              ))
          }

          <br /><br />
          <button onClick={ newGame }>¿Nuevo juego?</button>
          

        </div>
    )

}

export default App;
