import { useEffect, useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [suggestionData, setSuggestionData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => fetchData(), 500);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const fetchData = async () => {
    const data = await fetch(
      "https://suggestqueries.google.com/complete/search?client=firefox&q=" +
        query
    );
    const json = await data.json();
    setSuggestionData(json[1]);
    console.log(json[1]);
  };

  return (
    <div className="search w-screen h-screen py-5 px-32 bg-[url(https://images.pexels.com/photos/459277/pexels-photo-459277.jpeg?auto=compress&cs=tinysrgb&w=600)] bg-no-repeat bg-center bg- bg-cover">
      <div className="w-4/12 rounded-md shadow-md py-5 px-2 bg-[#1a7c3efe] text-[#fff] relative top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4">
        <h3 className="mb-4 font-semibold text-center text-3xl">Search</h3>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-400 outline-none p-[6px] rounded-md w-full text-lg text-[#111] placeholder-black"
          placeholder="Search here anything ..."
        />
        {suggestionData.length > 0 && (
          <div className="suggestions border border-gray-400 w-full rounded">
            {suggestionData.map((x, i) => (
              <li
                key={i}
                className="p-2 font-medium text-lg list-none border-b cursor-pointer"
              >
                {x}
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
