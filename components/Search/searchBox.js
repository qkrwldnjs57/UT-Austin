import styles from "./searchBox.module.css";
import Image from "next/image";
import { useState } from "react";

export default function SearchBox({ onSearchResult }) { // prop을 여기서 받습니다.
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      console.log('[searchBox.js][handleSearch] executed');
      const response = await fetch(`/api/search?myQuery=${query}`);
      const searchData = await response.json();
      onSearchResult(searchData); // parent component state update
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  return (
    <form onSubmit={handleSearch} className={styles["search-box"]}>
      <label className={styles['sr-only']} htmlFor="search">Search for ...</label>
      <input
        id="search"
        className={styles["search-input"]}
        type="text"
        placeholder="Search for ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <button type="submit" className={styles["search-icon"]}>
        <Image src="/searchicon.svg" alt="search icon" width={30} height={30} />
      </button>
    </form>
  );
}
