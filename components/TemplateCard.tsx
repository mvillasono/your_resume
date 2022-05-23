import React from "react";
import Image from "next/image";
import { Template } from "../resumen/types";

interface Props {
  template: Template;
}

const TemplateCard: React.VFC<Props> = ({ template }) => {
  return (
    <div
      style={{
        padding: 24,
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 1024,
        margin: "auto",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          lineHeight: 1,
        }}
      >
        <div>
          <h2 style={{ marginBottom: 6 }}>{template.title}</h2>
          <p
            style={{
              marginBottom: 4,
              WebkitLineClamp: 1,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
            }}
          >
            {template.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
