import React from "react";
import { Field, FieldIntrinsicType } from "../Field";
import styles from "./style.module.scss";
import { TextField } from "../TextField";

export interface SearchResultType {
  key: string;
  value: string;
}
export interface SearchFieldProps extends React.AllHTMLAttributes<any> {
  /**
   * Sets the container to be rounded if true.
   */
  rounded?: boolean;

  /**
   * Event which handles the request for realtime searching.
   */
  onSearch: (query: string) => Array<SearchResultType>;

  /**
   * Callback for when a result is selected.
   */
  onSelected: (selection: SearchResultType) => void;
}

/**
 * Base component for all Field components.
 *
 * For internal usage only!.
 */
export function SearchField(props: SearchFieldProps): React.ReactElement {
  const [searchedValue, setSearchedValue]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = React.useState<string>("");

  const [searchResults, setSearchResults]: [
    Array<SearchResultType>,
    React.Dispatch<React.SetStateAction<Array<SearchResultType>>>
  ] = React.useState<Array<SearchResultType>>([]);

  const onSearch = async (event: any) => {
    setSearchedValue(event.target.value);

    try {
      const filteredData: Array<SearchResultType> = await props.onSearch(
        event.target.value
      );
      setSearchResults(filteredData);
    } catch (e) {}
  };

  return (
    <div className={styles.container}>
      <TextField
        extraClassNames={[styles.SearchField]}
        {...props}
        onChange={onSearch}
        value={searchedValue}
      />
      <div className={`${styles.results} ${styles.rounded}`}>
        {searchResults.map((value) => (
          <div
            className={styles.result}
            key={value.key}
            onClick={() => {
              props.onSelected(value);
            }}
          >
            {value.value}
          </div>
        ))}
      </div>
    </div>
  );
}
