"use client";

import { useMemo, useState } from "react";

type TimelineFilterValue = string | "all";

export function useTimeline<T>(
  items: T[],
  getFilterValues: (item: T) => string[],
  defaultFilter: TimelineFilterValue = "all",
) {
  const [activeFilter, setActiveFilter] =
    useState<TimelineFilterValue>(defaultFilter);

  const filters = useMemo(() => {
    const values = new Set<string>();
    items.forEach((item) => {
      getFilterValues(item).forEach((value) => values.add(value));
    });

    return ["all", ...Array.from(values).sort()] as TimelineFilterValue[];
  }, [getFilterValues, items]);

  const visibleItems = useMemo(() => {
    if (activeFilter === "all") return items;

    return items.filter((item) => getFilterValues(item).includes(activeFilter));
  }, [activeFilter, getFilterValues, items]);

  return {
    activeFilter,
    filters,
    setActiveFilter,
    visibleItems,
  };
}
