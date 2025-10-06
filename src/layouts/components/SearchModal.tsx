"use client";

import React, { useEffect, useRef, useState } from "react";
import searchData from "../../../public/data/search.json" assert { type: "json" };
import SearchResult, { type ISearchItem } from "./SearchResult";

const SearchModal = () => {
  const [searchString, setSearchString] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // handle input change
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchString(e.currentTarget.value.replace("\\", "").toLowerCase());
  };

  // generate search result
  const doSearch = (searchData: ISearchItem[]) => {
    const regex = new RegExp(`${searchString}`, "gi");
    if (searchString === "") return [];

    return searchData.filter((item) => {
      const title = item.frontmatter?.title?.toLowerCase().match(regex);
      const description = item.frontmatter?.description
        ?.toLowerCase()
        .match(regex);
      const categories = item.frontmatter?.categories
        ?.join(" ")
        ?.toLowerCase()
        .match(regex);
      const tags = item.frontmatter?.tags
        ?.join(" ")
        ?.toLowerCase()
        .match(regex);
      const content = item.content?.toLowerCase().match(regex);

      return title || content || description || categories || tags;
    });
  };

  const startTime = performance.now();
  const searchResult = doSearch(searchData as ISearchItem[]);
  const endTime = performance.now();
  const totalTime = ((endTime - startTime) / 1000).toFixed(3);

  useEffect(() => {
    const searchModal = document.getElementById("searchModal");
    const searchModalOverlay = document.getElementById("searchModalOverlay");
    const searchModalTriggers = document.querySelectorAll(
      "[data-search-trigger]",
    );

    const handleOpenModal = () => {
      searchModal?.classList.add("show");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    };

    searchModalTriggers.forEach((button) => {
      button.addEventListener("click", handleOpenModal);
    });

    searchModalOverlay?.addEventListener("click", () => {
      searchModal?.classList.remove("show");
    });

    let selectedIndex = -1;

    const updateSelection = () => {
      const items = document.querySelectorAll("#searchItem");
      items.forEach((item, index) => {
        item.classList.toggle(
          "search-result-item-active",
          index === selectedIndex,
        );
      });

      const selectedItem =
        document.querySelectorAll("#searchItem")[selectedIndex];
      selectedItem?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const items = document.querySelectorAll("#searchItem");

      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        searchModal?.classList.add("show");
        setTimeout(() => {
          inputRef.current?.focus();
        }, 50);
        updateSelection();
      }

      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
      }

      if (event.key === "Escape") {
        searchModal?.classList.remove("show");
      }

      if (event.key === "ArrowUp" && selectedIndex > 0) {
        selectedIndex--;
      } else if (
        event.key === "ArrowDown" &&
        selectedIndex < items.length - 1
      ) {
        selectedIndex++;
      } else if (event.key === "Enter") {
        const activeLink = document.querySelector(
          ".search-result-item-active a",
        ) as HTMLAnchorElement;
        if (activeLink) {
          activeLink.click();
          searchModal?.classList.remove("show");
        }
      }

      updateSelection();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      searchModalTriggers.forEach((button) => {
        button.removeEventListener("click", handleOpenModal);
      });
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchString]);

  return (
    <div id="searchModal" className="search-modal">
      <div id="searchModalOverlay" className="search-modal-overlay" />
      <div className="search-wrapper">
        <div className="search-wrapper-header">
          <label
            htmlFor="searchInput"
            className="absolute left-7 top-[calc(50%-7px)]"
          >
            <span className="sr-only">search icon</span>
            {searchString ? (
              <svg
                onClick={() => setSearchString("")}
                viewBox="0 0 512 512"
                height="18"
                width="18"
                className="hover:text-red-500 cursor-pointer -mt-0.5"
              >
                <path
                  fill="currentcolor"
                  d="M256 512A256 256 0 10256 0a256 256 0 100 512zM175 175c9.4-9.4 24.6-9.4 33.9.0l47 47 47-47c9.4-9.4 24.6-9.4 33.9.0s9.4 24.6.0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6.0 33.9s-24.6 9.4-33.9.0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9.0s-9.4-24.6.0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6.0-33.9z"
                ></path>
              </svg>
            ) : (
              <svg
                viewBox="0 0 512 512"
                height="18"
                width="18"
                className="-mt-0.5"
              >
                <path
                  fill="currentcolor"
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8.0 45.3s-32.8 12.5-45.3.0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9.0 208S93.1.0 208 0 416 93.1 416 208zM208 352a144 144 0 100-288 144 144 0 100 288z"
                ></path>
              </svg>
            )}
          </label>
          <input
            id="searchInput"
            placeholder="Search..."
            className="search-wrapper-header-input"
            type="text"
            name="search"
            value={searchString}
            onChange={handleSearch}
            autoComplete="off"
            ref={inputRef}
          />
        </div>
        <SearchResult searchResult={searchResult} searchString={searchString} />
        <div className="search-wrapper-footer">
          <span className="flex items-center">
            <kbd>↑</kbd>
            <kbd>↓</kbd> to navigate
          </span>
          <span className="flex items-center">
            <kbd>⏎</kbd> to select
          </span>
          {searchString && (
            <span>
              <strong>{searchResult.length}</strong> results - in{" "}
              <strong>{totalTime}</strong> seconds
            </span>
          )}
          <span>
            <kbd>ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
