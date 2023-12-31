import React,{useEffect} from 'react'
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import Comments from '../components/comments/Comments'
import useHttp from '../hooks/use-http'
import { getSingleQuote } from '../lib/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'


const QuoteDetail = () => {
    const match = useRouteMatch()
    const params = useParams()
    const {quoteId}=params
    const { sendRequest, status, error, data :loadedQuote} = useHttp(getSingleQuote,true)

 useEffect(()=>{
    sendRequest(quoteId)
 },[sendRequest, quoteId])
 if(status==='pending'){
    return <div className='centerd'>
        <LoadingSpinner/>
    </div>
 }
 if(error){
    return <p>{error}</p>
 }

 if(!loadedQuote.text){
    return <p> no quote text</p>
 }

    console.log(params);
    return (
        <div>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
            <Route path={`${match.path}`} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comments`}>Comments</Link>
                </div>
            </Route>
            <Route exact path={`${match.path}/comments`} >
                <Comments />
            </Route >
        </div>
    )
}

export default QuoteDetail