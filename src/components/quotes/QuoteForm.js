import { useRef, Fragment, useState} from 'react';
import Card from '../UI/Card';
import { Prompt } from 'react-router-dom';
import classes from './QuoteForm.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';


const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [isEntering, setIsEntering] = useState(false)
 


  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const formFocucedHandler = () => {
    setIsEntering(true)
  }

  const finishEnteringData = () => {
    setIsEntering(false)
  }

  return (
    <Fragment>
      <Prompt when={isEntering} message={(location) => 'Are you sure'}/>
      <Card>
        <form className={classes.form} onSubmit={submitFormHandler} onFocus={formFocucedHandler}>
          {props.isLoding && <div className='centered'><LoadingSpinner/></div>}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button className="btn" onClick={finishEnteringData}>
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
