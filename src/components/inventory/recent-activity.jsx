import React from "react";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      ordered: "Ordered ",
      img: require("../../assets/user2.png"),
      name: "Grace Moreta",
      text: "-",
      time: "1 m ago",
      num: "11",
      products: "Products",
    },
    {
      id: 2,
      ordered: "Ordered ",
      img: require("../../assets/user3.png"),
      name: "Allison Siphron",
      text: "-",
      time: "12 m ago",
      num: "24",
      products: "Products",
    },
    {
      id: 3,
      ordered: "Ordered ",
      img: require("../../assets/user4.png"),
      name: "Makenna Doman",
      text: "-",
      time: "1 m ago",
      num: "11",
      products: "Products",
    },
    {
      id: 4,
      ordered: "Ordered ",
      img: require("../../assets/user5.png"),
      name: "Makenna Doman",
      text: "-",
      time: "1 m ago",
      num: "11",
      products: "Products",
    },
    {
      id: 5,
      ordered: "Ordered ",
      img: require("../../assets/user6.png"),
      name: "Ahmad Vetrovs",
      text: "-",
      time: "1 m ago",
      num: "11",
      products: "Products",
    },
    {
      id: 6,
      ordered: "Ordered ",
      img: require("../../assets/user6.png"),
      name: "Ahmad Vetrovs",
      text: "-",
      time: "1 m ago",
      num: "11",
      products: "Products",
    },
    {
      id: 7,
      ordered: "Ordered ",
      img: require("../../assets/user6.png"),
      name: "Ahmad Vetrovs",
      text: "-",
      time: "1 m ago",
      num: "11",
      products: "Products",
    },
    {
      id: 8,
      ordered: "Ordered ",
      img: require("../../assets/user6.png"),
      name: "Ahmad Vetrovs",
      text: "-",
      time: "1 m ago",
      num: "11",
      products: "Products",
    },
    {
      id: 9,
      ordered: "Ordered ",
      img: require("../../assets/user6.png"),
      name: "Ahmad Vetrovs",
      text: "-",
      time: "1 m ago",
      num: "11",
      products: "Products",
    },
    {
      id: 10,
      ordered: "Ordered ",
      img: require("../../assets/user6.png"),
      name: "Ahmad Vetrovs",
      text: "-",
      time: "1 m ago",
      num: "11",
      products: "Products",
    },
    {
      id: 11,
      ordered: "Ordered ",
      img: require("../../assets/user6.png"),
      name: "Ahmad Vetrovs",
      text: "-",
      time: "1 m ago",
      num: "11",
      products: "Products",
    },
  ];
  return (
    <div className=" bg-white p-5 ">
      <p className="manrope text-[16px] text-[#000]">Recent Activity</p>
      <div className=" py-5 grid gap-5">
        {activities.map((i) => (
          <div className=" grid gap-3">
            <p className="text-[12px] manrope ">
              {i.ordered}
              <span className=" text-[12px] text-[#04B4FC] manrope">
                {i.num}{" "}
              </span>
              {i.products}
            </p>
            <div className=" flex gap-3 items-center ">
              <div className=" flex gap-2 items-center">
                <img className=" w-[22.56px] h-[22.56px]" src={i.img} alt="" />
                <p className="text-[10px] text-[#5C6F88] poppins">{i.name}</p>
              </div>
              <p className=" manrope text-[10px] text-[#5C6F88]">{i.text}</p>
              <p className=" manrope text-[10px] text-[#04B4FC]">{i.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
