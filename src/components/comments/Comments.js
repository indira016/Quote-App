import { useState,useCallback,useEffect } from "react";
import classes from "./Comments.module.css";
import CommentsList from './CommentsList'
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import LoadingSpinner from "../UI/LoadingSpinner";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
const {sendRequest,status,error,data:loadedComment}=useHttp(getAllComments)
const params=useParams()
const {quoteId}=params
console.log( params);
useEffect(()=>{
  sendRequest(quoteId)
},[sendRequest, quoteId])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

const addCommentHandler=useCallback(()=>{
  sendRequest(quoteId)
},[sendRequest,quoteId])

let comment;
if(status==='pending'){
  comment=<div className='centered'><LoadingSpinner/></div>
}
if(status==='completed' && loadedComment && loadedComment.length>0){
  comment=<CommentsList comments={loadedComment} />
}
if(error){
  comment=<p className='centered focused'>{error}</p>
}
if(status==='completed' && (!loadedComment && loadedComment.length===0)){
  comment=<p>comment not found</p>
}

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quotedId={quoteId} onAddedComment={addCommentHandler} />}
     {comment}
    </section>
  );
};

export default Comments;
