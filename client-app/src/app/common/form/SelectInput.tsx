import React from "react";
import { FieldRenderProps } from "react-final-form";
import {
  DropdownProps,
  Form,
  FormFieldProps,
  Label,
  Select,
} from "semantic-ui-react";

interface IProps extends FieldRenderProps<string>, FormFieldProps {}

export const SelectInput: React.FC<IProps> = (
{
  input,
  width,
  options,
  placeholder,
  meta: { touched, error },
  ...rest

}) => {
  return (
    <Form.Field error={touched && !!error}  width={width}>

      <Select
        value={input.value}
        onChange={(e,data) => input.onChange(data.value)}
        placeholder={placeholder}
        options={options}
      />


      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
