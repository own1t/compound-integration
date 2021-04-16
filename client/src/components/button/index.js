import React from "react";

import { Label, Input } from "./RadioButtonElements";

const RadioButton = ({ ...rest }) => {
  return (
    <>
      <Label>
        <Input {...rest} />
      </Label>
    </>
  );
};

export default RadioButton;
