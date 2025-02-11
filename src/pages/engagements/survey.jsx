import { useState } from "react";
import Badge, { BadgeBorder } from "../../components/badge/badge";
import { SelectAudience } from "./announcements";
import ModalContainer from "../../components/modal-container/modal-container";
import Button from "../../components/button/button";
import { TfiTarget } from "react-icons/tfi";
import { IoAddSharp } from "react-icons/io5";
import { HiOutlineGlobeAsiaAustralia } from "react-icons/hi2";
import Input from "../../components/input/input";

const Survey = () => {
  const [pool, setPool] = useState(false);
  const [post, setPost] = useState(false);
  const [targetGroup, setTargetGroup] = useState(false);
  const [privilege, setPrivilege] = useState(false);

  const togglePool = () => {
    setPool(!pool);
  };

  const togglePrivilege = () => {
    setPrivilege(!privilege);
  };

  const toggleTargetGroup = () => {
    setTargetGroup(!targetGroup);
  };
  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-md shadow px-10 py-4 flex items-center gap-8">
          <div>
            <div className="w-14 h-14 rounded-full bg-gray-200 cursor-pointer"></div>
          </div>
          <div
            className="border rounded-xl p-4 hover:bg-gray-50 cursor-pointer w-full"
            onClick={togglePool}
          >
            start post
          </div>
        </div>
        <div className="mt-8 bg-white  rounded-xl shadow p-4">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm">posted by: Admin</p>{" "}
              <Badge title={"Public"} />
            </div>
            <div>
              <p className="text-sm">2/7/2023</p>
            </div>
          </div>
          <p className="text-md mt-6 max-w-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            deleniti voluptatibus laboriosam tenetur dolore at ullam? Earum
            exercitationem ut inventore? Quos, porro vitae tempore quasi saepe
            dicta, dolorum non tempora asperiores nulla recusandae? Ipsum porro
            maxime rerum debitis dolor ullam!
          </p>
          <div></div>
          <div className="flex justify-between mt-8">
            <div className="flex items-center gap-2">
              <p className="text-md font-medium text-main">40k response</p>
            </div>
            <div>
              <span onClick={togglePrivilege}>
                <BadgeBorder title={"Publish"} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* modals */}
      <ModalContainer
        title={"Create Pool (Only admin can see result)"}
        show={pool}
        close={togglePool}
      >
        <form className="space-y-4">
          <Input
            label={"Your Question"}
            placeholder="E.g., How do you commute to work?"
            type={"textarea"}
          />
          <Input label={"Option 1"} placeholder="E.g, public Transport" />
          <Input label={"Option 2"} placeholder="E.g, Drive Myself" />
          <div className="flex items-center gap-2 text-main border-2 cursor-pointer w-fit border-main rounded-full p-2.5">
            <span className="text-main">
              <IoAddSharp />
            </span>{" "}
            Add Option
          </div>
          <div className="flex items-center justify-end gap-8">
            <Button
              buttonType={"primaryOutline"}
              title={"Back"}
              width={"w-fit"}
            />
            <Button buttonType={"primary"} title={"Continue"} width={"w-fit"} />
          </div>
        </form>
      </ModalContainer>
      <ModalContainer
        title={"Who can see your post?"}
        show={privilege}
        close={togglePrivilege}
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <HiOutlineGlobeAsiaAustralia size={24} />
              <div>
                <p className="text-lg">Public</p>
                <p className="text-xs">
                  post will be shared to all grade levels
                </p>
              </div>
            </div>
            <div class="flex items-center mb-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <TfiTarget size={24} />
              <div>
                <p className="text-lg">Targeted Group</p>
                <p className="text-xs">
                  post will be shared to all grade levels
                </p>
              </div>
            </div>
            <div class="flex items-center mb-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                onClick={toggleTargetGroup}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-8">
            <Button
              buttonType={"primaryOutline"}
              title={"Back"}
              width={"w-fit"}
            />
            <Button buttonType={"primary"} title={"Continue"} width={"w-fit"} />
          </div>
        </div>
      </ModalContainer>
      <ModalContainer
        title={"Who can see your post"}
        show={targetGroup}
        close={toggleTargetGroup}
      >
        <div className="grid grid-cols-2 gap-4 border-t pt-8">
          <SelectAudience title={"Management"} />
          <SelectAudience title={"Junior Staff"} />
          <SelectAudience title={"Mid Level"} />
          <SelectAudience title={"Senior Officer 2"} />
          <SelectAudience title={"Senior Officer 4"} />
          <SelectAudience title={"Senior Officer 8"} />
          <SelectAudience title={"Management"} />
          <SelectAudience title={"Junior Staff"} />
          <SelectAudience title={"Mid Level"} />
          <SelectAudience title={"Senior Officer 2"} />
          <SelectAudience title={"Senior Officer 4"} />
          <SelectAudience title={"Senior Officer 8"} />
          <div className="flex items-center justify-end gap-8 col-span-2">
            <Button
              buttonType={"primaryOutline"}
              title={"Back"}
              width={"w-fit"}
            />
            <Button buttonType={"primary"} title={"Continue"} width={"w-fit"} />
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default Survey;
