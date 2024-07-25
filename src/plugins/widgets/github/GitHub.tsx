import React, { FC, useEffect } from "react";
import GitHubCalendar from "react-github-calendar";
import { Props, defaultData } from "./types";

// TODO: Inherit size and colour

const GitHubCalendarWidget: FC<Props> = ({ data = defaultData, loader }) => {
  if (!data.username) return null;

  return (
    <div className="GitHub">
      <GitHubCalendar
        hideColorLegend
        hideMonthLabels
        hideTotalCount
        username={data.username}
      />
    </div>
  );
};

export default GitHubCalendarWidget;
