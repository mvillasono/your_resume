import {
  FormControl,
  Input,
  InputProps,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useField } from "./context";
import { Check, Field } from "./types";

interface Props {
  fields: Field[];
}

interface FieldProps extends Omit<InputProps, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

const TextField: React.VFC<FieldProps> = ({ value, onChange, ...props }) => {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  );
};

const RadioField: React.VFC<{
  options: string[];
  onChange: (value: string) => void;
  value: string;
}> = ({ value, onChange, options }) => {
  return (
    <RadioGroup colorScheme="primary" value={value} onChange={onChange}>
      <Stack>
        {options.map((option) => (
          <Radio key={option} value={option}>
            {option}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};

const Fields: React.FC<Props> = ({ fields }) => {
  const [{ check }, { updateField }] = useField();
  function handleUpdateField(id: string, value: string) {
    console.log(id);
    console.log(value);
    return updateField(id, value);
  }

  return (
    <Stack>
      {fields.map((field, index) => (
        <Stack key={index} paddingX={2}>
          <Text fontWeight={600} fontSize={{ base: "2md", md: "2md" }}>
            {field.title}
          </Text>
          <Stack spacing={4}>
            {field.type === "text" && (
              <FormControl>
                <TextField
                  placeholder={field.placeholder}
                  value={check.get(field.title) || ""}
                  //value={field.title}
                  onChange={(value: string) =>
                    handleUpdateField(check.get(field.title) || "", value)
                  }
                  focusBorderColor="teal.300"
                  variant="flushed"
                />
              </FormControl>
            )}
            {field.type === "radio" && (
              <FormControl>
                <RadioField
                  options={field.options}
                  //value={field.title}
                  value={check.get(field.title) || ""}
                  onChange={(value: string) =>
                    handleUpdateField(check.get(field.title) || "", value)
                  }
                />
              </FormControl>
            )}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default Fields;
