import React from "react";
import SearchItems from "../../../components/inventory/search-items";
import InventoryHeader from "../../../components/inventory/InventoryHeader";
import ServicesTable from "../../../components/inventory/services-table";

const ServicesInventory = () => {
  return (
    <div className="bg-[#F0F1F3]">
      <InventoryHeader />
      <div>
        <SearchItems placeholder="Search Services, Customer, order" />
      </div>
      <div className="lg:ml-5 lg:mr-10 md:ml-5 md:mr-8 mx-5 pt-5">
        <ServicesTable />
      </div>
    </div>
  );
};

export default ServicesInventory;
