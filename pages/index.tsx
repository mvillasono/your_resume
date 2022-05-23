import React from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import fieldApi from "../field/api";
import templateApi from "../resumen/api";
import { Field } from "../field/types";
import Fields from "../field/Fields";
import FieldProvider, { useField } from "../field/context";
import { Template } from "../resumen/types";
import Link from "next/link";
import TemplateCard from "../components/TemplateCard";

interface Props {
  fields: Field[];
  templates: Template[];
}

const IndexRoute: React.FC<Props> = ({ fields, templates }) => {
  //const [{ check }, { updateField }] = useField();

  /*  function handleUpdateField(id: string, value: string) {
    return updateField(id, value);
  } */

  return (
    <FieldProvider fields={fields}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 12,
          flexDirection: "column",
          width: "100%",
        }}
      >
        {templates.map((template) => (
          <Link key={template.id} href={`/${template.id}`}>
            <a>
              <TemplateCard template={template} />
            </a>
          </Link>
        ))}
      </div>
    </FieldProvider>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const fields = await fieldApi.list();
  const templates = await templateApi.list();
  return {
    props: {
      fields,
      templates,
    },
  };
};

export default IndexRoute;
