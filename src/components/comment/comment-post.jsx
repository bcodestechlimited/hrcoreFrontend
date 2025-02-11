import SocialReactions from "../social-reactions/social-reactions";

const CommentPost = () => {
  return (
    <div className="flex gap-x-4 mt-4">
      <div>
        <div className="relative w-full">
          <img
            className="w-10 h-10 rounded-full"
            src={require("../../assets/photo-2.png")}
            alt=""
          />
          <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between mb-1">
          <div className="flex items-center gap-2">
            <p className="text-xs">Phoenix Baker</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Fri 2:20pm</p>
          </div>
        </div>
        <div
          placeholder="Write a comment"
          rows={1}
          className="border rounded-tr-xl rounded-b-xl border-gray-300 p-4 bg-gray-200 cursor-pointer w-full"
        >
          Hi Olivia, can you please review the latest design when you can?
        </div>
        <div className="flex justify-end">
          <SocialReactions />
        </div>
      </div>
    </div>
  );
};

export default CommentPost;
