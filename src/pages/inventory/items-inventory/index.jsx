import React from "react";
import InventoryHeader from "../../../components/inventory/InventoryHeader";
import SearchItems from "../../../components/inventory/search-items";
import ItemsTable from "../../../components/inventory/items-table";

const Items = () => {
  return (
    <div className="bg-[#F0F1F3]">
      <InventoryHeader />
      <div>
        <SearchItems placeholder="Search Items, supplier, order" />
      </div>
      <div className="lg:ml-5 lg:mr-10 md:ml-5 md:mr-8 mx-5 pt-5">
        <ItemsTable />
      </div>
    </div>
  );
};

export default Items;
