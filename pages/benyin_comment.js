
import { Comment } from "@/components/comment/comment";
import { useState } from 'react';


const CommentPage = () => {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== '') {
      setCommentsList([...commentsList, comment]);
      setComment('');
    }
  };
  


  return (
    <div>
    <Comment></Comment>
      <textarea
        rows="4"
        cols="50"
        placeholder="Type your comment..."
        value={comment}
        onChange={handleInputChange}
      ></textarea>
      <br />
      <button onClick={handleCommentSubmit}>Submit</button>
      <div>
        <h3>Comments:</h3>
        <ul>
          {commentsList.map((c, index) => (
            <li key={index}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default CommentPage;
