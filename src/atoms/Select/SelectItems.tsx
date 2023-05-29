import { Select } from "antd";
import React from "react";

interface TSelectItemsProps {
  options: any;
}

export const SelectItems = (props: TSelectItemsProps) => {
  const { options } = props;
  return (
    <Select
      defaultValue={"Select user"}
      style={{ width: 120 }}
      options={options}
    />
  );
};
