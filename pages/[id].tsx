import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { ParsedUrlQuery } from "querystring";

import Link from "next/link";

import { Template } from "./../resumen/types";
import api from "./../resumen/api";
import TemplateCard from "../components/TemplateCard";

interface Props {
  template: Template;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { id } = params as Params;
  const template = await api.fetch(id);

  if (!template) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      template,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const list = await api.list();

  return {
    paths: list.map((template) => ({
      params: {
        id: template.id,
      },
    })),
    fallback: "blocking",
  };
};

const resumen: NextPage<Props> = ({ template }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TemplateCard template={template} />

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <Link href="/">Volver al inicio</Link>
      </div>
    </div>
  );
};

export default resumen;
