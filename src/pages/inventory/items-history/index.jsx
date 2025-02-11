import React from "react";
import InventoryHeader from "../../../components/inventory/InventoryHeader";
import SearchItems from "../../../components/inventory/search-items";
import ItemsHistoryTable from "../../../components/inventory/items-history-table";

const ItemsHistory = () => {
  return (
    <div className="bg-[#F0F1F3]">
      <InventoryHeader />
      <div>
        <SearchItems />
      </div>

      <div className="lg:ml-5 lg:mr-10 md:ml-5 md:mr-8 mx-5 pt-5">
        <ItemsHistoryTable />
      </div>
    </div>
  );
};

export default ItemsHistory;
