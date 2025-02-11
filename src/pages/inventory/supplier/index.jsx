import React from "react";
import InventoryHeader from "../../../components/inventory/InventoryHeader";
import SearchItems from "../../../components/inventory/search-items";

import SuppliersTable from "../../../components/inventory/supliers-table";

const index = () => {
  return (
    <div className="bg-[#F0F1F3]">
      <InventoryHeader />
      <div>
        <SearchItems placeholder="Search Items, supplier, order" />
      </div>
      <div className="lg:ml-5 lg:mr-10 md:ml-5 md:mr-8 mx-5 pt-5">
        <SuppliersTable />
      </div>
    </div>
  );
};

export default index;
