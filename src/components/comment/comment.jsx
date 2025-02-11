import { LiaCommentDots } from "react-icons/lia";

const Comment = ({ showComments }) => {
  return (
    <div className="text-main text-md items-center flex" onClick={showComments}>
      <div className="cursor-pointer items-center flex gap-2 p-2 rounded-full">
        <LiaCommentDots />
        Comments
      </div>
      <span className="font-medium">2k</span>
    </div>
  );
};

export default Comment;
