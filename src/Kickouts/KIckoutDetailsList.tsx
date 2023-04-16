import React from "react";
import { IDetailsListProps, Selection } from "@fluentui/react";

interface KickoutDetailsListProps<T> extends IDetailsListProps {
  selectedItems: T[];
  setSelectedItems: (items: T[]) => void;
  getItemKey: (item: T, index?: number) => string;
  onSelectionCountChanged?: (selectionCount: number) => void;
}

export default class KickoutDetailsList<T> extends React.Component<
  KickoutDetailsListProps<T>
> {
  private selection = new Selection<any>({
    getKey: this.props.getItemKey,
    onSelectionChanged: this.handleInternalSelection.bind(this)
  });

  render(): any {
    return (selection = { selection });
  }
}
