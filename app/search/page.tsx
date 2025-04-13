"use client";
import { Quote } from "@/models/quote";
import { useState } from "react";
import Button from "../components/Button";
import Quotes from "../components/Quotes";

const createSearchQuery = (text: string, author: string, category: string) => {
	const params = new URLSearchParams();

	if (text) params.append("text", text);
	if (author) params.append("author", author);
	if (category) params.append("category", category);

	params.append("limit", "10");

	return params.toString();
};

const Search = () => {
	const [text, setText] = useState<string>("");
	const [author, setAuthor] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [quotes, setQuotes] = useState<Quote[]>([]);
	const [searchSubmitted, setSearchSubmitted] = useState<boolean>(false);
	useState<boolean>(false);

	const handleSearch = async () => {
		try {
			setSearchSubmitted(true);
			const query = createSearchQuery(text, author, category);
			const response = await fetch(
				`http://localhost:3000/quotes?${query}`
			);
			const data = await response.json();
			setQuotes(data);
		} catch (error) {
			console.log(`Error fetching quotes: ${error}`);
		}
	};

	return (
		<div className="p-4">
			<h1 className="text-3xl mb-6 text-center dark:text-white">
				Search Quotes
			</h1>
			<div className="text-xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<input
					type="text"
					placeholder="Search by text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border"
				/>
				<input
					type="text"
					placeholder="Search by author"
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
					className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border"
				/>
				<input
					type="text"
					placeholder="Search by category"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border"
				/>
			</div>
			<div className="text-center mb-6">
				<Button onClick={handleSearch} text="Search" />
			</div>

			{quotes.length > 0 ? (
				<Quotes quotes={quotes} />
			) : (
				searchSubmitted && (
					<p className="text-2xl pt-10 text-center text-gray-600 dark:text-gray-400">
						No quotes found.
					</p>
				)
			)}
		</div>
	);
};

export default Search;
