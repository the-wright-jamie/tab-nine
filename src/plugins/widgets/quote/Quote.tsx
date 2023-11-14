import React from "react";
import { useCachedEffect } from "../../../hooks";
import { HOURS, MINUTES } from "../../../utils"; // Add MINUTES here
import { getQuote } from "./api";
import "./Quote.sass";
import { defaultData, Props } from "./types";

const EXPIRE_IN = 5 * MINUTES; // Change 1 * HOURS to 5 * MINUTES

const Quote: React.FC<Props> = ({
  cache,
  data = defaultData,
  setCache,
  loader,
}) => {
  useCachedEffect(
    () => {
      getQuote(loader, data.category ?? "inspire").then(setCache);
    },
    cache ? cache.timestamp + EXPIRE_IN : 0,
    [data.category],
  );

  if (!cache) {
    return null;
  }

  return (
    <div className="Quote">
      <h4 className="QuoteContent">
        “{cache.quote}”
        {cache.author && (
          <sub>
            <br />
            &mdash; {cache.author}
          </sub>
        )}
      </h4>
    </div>
  );
};

export default Quote;
