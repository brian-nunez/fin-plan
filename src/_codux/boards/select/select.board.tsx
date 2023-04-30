import React from "react";
import { createBoard } from "@wixc3/react-board";
import { Select } from "../../../components/form-fields/select";

export default createBoard({
  name: "Select",
  Board: () => (
    <Select
      placeholder="Select an option"
      options={[
        {
          label: "1",
          value: "1",
        },
        {
          label: "2",
          value: "2",
        },
        {
          label: "3",
          value: "3",
        },
        {
          label: "4",
          value: "4",
        },
      ]}
      label="Testing"
    />
  ),
});
