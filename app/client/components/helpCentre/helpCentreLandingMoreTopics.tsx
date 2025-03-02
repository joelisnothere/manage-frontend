import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { neutral } from "@guardian/src-foundations/palette";
import { textSans } from "@guardian/src-foundations/typography";
import { Link } from "@reach/router";
import React, { useState } from "react";
import { maxWidth } from "../../styles/breakpoints";
import { trackEvent } from "../analytics";
import { helpCentreMoreQuestionsConfig } from "./helpCentreConfig";
import {
  containterCss,
  innerSectionCss,
  innerSectionDivCss,
  linkAnchorStyle,
  linkArrowStyle,
  sectionTitleCss
} from "./helpCentreStyles";

const moreTopicsStyles = css({
  marginBottom: "10px",
  display: "flex",
  flexWrap: "wrap",
  textAlign: "left",
  fontWeight: "normal"
});

const showHideCss = css`
  ${textSans.xsmall()};
  margin-left: ${space[3]}px;
  ${maxWidth.mobileMedium} {
    display: none;
  }
`;

const liStyles = (index: number, length: number) => css`
  ${innerSectionDivCss};
  ${index < length - 1 && `border-bottom: 1px solid ${neutral[86]}`};
`;

export const HelpCentreLandingMoreTopics = () => {
  const [indexOfOpenSection, setIndexOfOpenSection] = useState<number>();

  const handleSectionClick = (sectionNum: number) => () => {
    setIndexOfOpenSection(indexOfOpenSection === sectionNum ? -1 : sectionNum);
  };

  return (
    <div css={moreTopicsStyles}>
      <div css={containterCss}>
        {helpCentreMoreQuestionsConfig.map((topic, topicIndex) => {
          const isOpen = topicIndex === indexOfOpenSection;
          const isNotFirstOption = topicIndex > 0;
          const titleCss = css`
            ${sectionTitleCss(isOpen, isNotFirstOption)};
            ${maxWidth.desktop} {
              :after {
                right: 17px;
              }
              padding-right: 31px;
            }
          `;
          return (
            <div key={topic.id}>
              <h2 css={titleCss} onClick={handleSectionClick(topicIndex)}>
                {topic.title}
                <span css={showHideCss}>{isOpen ? "Hide" : "Show"}</span>
              </h2>
              <ul css={innerSectionCss(isOpen)}>
                {topic.links.map((question, questionIndex) => (
                  <li
                    key={`${topic.id}Question-${questionIndex}`}
                    css={liStyles(questionIndex, topic.links.length)}
                  >
                    <Link
                      to={question.link}
                      css={linkAnchorStyle}
                      onClick={() => {
                        trackEvent({
                          eventCategory: "help-centre",
                          eventAction: "more-topics-q-click",
                          eventLabel: `${topic.id}-${question.id}`
                        });
                      }}
                    >
                      {question.title}
                    </Link>
                    <span css={linkArrowStyle} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
