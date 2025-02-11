import { useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const SocialReactions = () => {
  const [like, setLike] = useState(false);
  const [heart, setHeart] = useState(false);
  return (
    <div className=" flex items-center gap-4">
      <div
        className="text-md cursor-pointer items-center text-main flex gap-2"
        onClick={() => setLike(!like)}
      >
        {like ? <BiSolidLike /> : <BiLike />}
        60
      </div>
      <div
        className="text-md cursor-pointer items-center text-main flex gap-2"
        onClick={() => setHeart(!heart)}
      >
        {heart ? <AiFillHeart /> : <AiOutlineHeart />}
        24
      </div>
    </div>
  );
};

export default SocialReactions;
