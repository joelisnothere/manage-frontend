import React, { FC } from "react";
import { sans } from "../../styles/fonts";
import { Checkbox } from "../checkbox";

interface MarketingPreferenceProps {
  id: string;
  description: string;
  title?: string;
  selected?: boolean;
  onClick: (id: string) => {};
}

const standardText = {
  fontSize: "14px",
  fontFamily: sans
};

const getTitle = (title: MarketingPreferenceProps["title"]) => (
  <p
    css={[
      standardText,
      {
        cursor: "pointer",
        fontSize: "14px",
        lineHeight: "22px",
        fontFamily: sans,
        fontWeight: "bold",
        margin: "0"
      }
    ]}
  >
    {title}
  </p>
);

const getDescription = (
  description: MarketingPreferenceProps["description"]
) => (
  <p
    css={{
      padding: "2.88px 0 0 0"
    }}
  >
    {description}
  </p>
);

export const MarketingPreference: FC<MarketingPreferenceProps> = props => {
  const { id, description, selected, title, onClick } = props;
  return (
    <div
      onClick={e => {
        // Checkboxes inside labels will trigger click events twice.
        // Ignore the input click event
        if (e.target instanceof Element && e.target.nodeName === "INPUT") {
          return;
        }
        onClick(id);
      }}
      css={[
        standardText,
        {
          lineHeight: "1.333",
          marginTop: "12px",
          paddingLeft: "30px",
          position: "relative"
        }
      ]}
    >
      <div css={{ position: "absolute", left: 0 }}>
        <Checkbox
          checked={!!selected}
          onChange={_ => {
            return;
          }}
        />
      </div>
      {title && getTitle(title)}
      {getDescription(description)}
    </div>
  );
};
