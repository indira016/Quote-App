import React,{useEffect} from 'react'
import QuoteList from '../components/quotes/QuoteList';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';
import NoQuotesFound from '../components/quotes/NoQuotesFound'
import LoadingSpinner from'../components/UI/LoadingSpinner'
const AllQuotes = () => {
    // condishing rendering
    const {sendRequest,status,error,data:loadedQuotes}=useHttp(getAllQuotes,true)


    useEffect(()=>{
        sendRequest()
    },[])


    if(status==='completed' && !loadedQuotes && loadedQuotes.length===0 ){
        return <NoQuotesFound/>
    }
    if(status==='pending'){
        return <LoadingSpinner/>
    }
    if(error){
        return <p className='centered'>{error}</p>
    }

  return (
    <div>
        <QuoteList quotes={loadedQuotes}/>
    </div>
  )
}

export default AllQuotes;