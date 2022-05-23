import { Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { Field } from "../field/types";

interface Props {
  field: Field;
}

const Preview: React.FC<Props> = ({ field }) => {
  return (
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
      <VStack spacing={3} alignItems="flex-start">
        <Heading size="2xl">Preview</Heading>
      </VStack>
    </VStack>
  );
};

export default Preview;
