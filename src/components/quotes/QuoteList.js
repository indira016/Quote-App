import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';


const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};


const QuoteList = (props) => {
  const history = useHistory()
  const location = useLocation()




  const queryParams = new URLSearchParams(location.search) // 1 ?sort=asc
  console.log(queryParams);
  const isSortAscending = queryParams.get('sort') === 'asc' 
  
  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortAscending ? 'des' : 'asc'}`
    })
  }

  const sortedQuotes = sortQuotes(props.quotes, isSortAscending)

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>Sort {isSortAscending ? 'Ascending' : 'Desending'}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>

    </Fragment>

  );
};

export default QuoteList;


