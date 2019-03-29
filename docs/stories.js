import React from "react";
import { storiesOf } from "@storybook/react";
import { Button } from "@storybook/react/demo";

import Select from "react-select";

storiesOf("Button", module).add("Normal Select", () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
  ];
  return <Select options={options} />;
});
