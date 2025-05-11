"use client";
import { Quote } from "@/models/quote";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Quotes from "../components/Quotes";
import InputField from "../components/InputField";

const CATEGORY_NAME_REGEX = /^[a-z0-9\-]+$/;

const createSearchQuery = (
	text: string,
	author: string,
	category: string,
	limit: string = "10"
) => {
	const params = new URLSearchParams();

	if (text) params.append("text", text);
	if (author) params.append("author", author);
	if (category) params.append("category", category);
	if (limit) params.append("limit", limit);

	return params.toString();
};

interface ValidationErrors {
	text?: string;
	author?: string;
	category?: string;
	limit?: string;
}

const Search = () => {
	const [text, setText] = useState<string>("");
	const [author, setAuthor] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [quotes, setQuotes] = useState<Quote[]>([]);
	const [searchSubmitted, setSearchSubmitted] = useState<boolean>(false);
	const [searchButtonClicked, setSearchButtonClicked] =
		useState<boolean>(false);
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [limit, setLimit] = useState<string>("");

	const handleSearch = async () => {
		setSearchButtonClicked(true);

		if (Object.keys(errors).length > 0) {
			return;
		}

		try {
			setSearchSubmitted(true);
			const query = createSearchQuery(text, author, category, limit);
			const response = await fetch(
				`http://localhost:3000/quotes?${query}`
			);

			if (!response.ok) {
				const errorData = await response.json();
				if (!errorData.errors) {
					toast.error("Unexpected error occurred.");
					return;
				}
				const fieldErrors = errorData.errors
					.filter((err: { type: string }) => err.type === "field")
					.map(
						(err: { msg: string; path: string; value: string }) =>
							`${err.msg} (${err.path} ${err.value})`
					);

				fieldErrors.forEach((err: string) => {
					toast.error(err);
				});

				return;
			}

			const data = await response.json();
			setQuotes(data);
		} catch (error) {
			console.log(`Error fetching quotes: ${error}`);
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	};

	const clearInputs = async () => {
		setText("");
		setAuthor("");
		setCategory("");
		setLimit("");
		setSearchButtonClicked(false);
		setSearchSubmitted(false);
		setQuotes([]);
	};

	const getValidationMessage = (setter: string, value: string) => {
		if (setter === "text" && value && value.length < 3) {
			return "Text must be at least 3 characters long.";
		}
		if (setter === "author" && value && value.length < 2) {
			return "Author must be at least 2 characters long.";
		}
		if (
			setter === "category" &&
			value &&
			!CATEGORY_NAME_REGEX.test(value)
		) {
			return "Category can only contain lowercase letters, numbers, and dashes";
		}
	};

	const handleInputChange = (setter: string, value: string) => {
		switch (setter) {
			case "text":
				setText(value);
				break;
			case "author":
				setAuthor(value);
				break;
			case "category":
				setCategory(value);
				break;
			case "limit":
				setLimit(value);
		}

		const validationMessage = getValidationMessage(setter, value);

		setErrors((prev) => {
			const newErrors = { ...prev };
			if (validationMessage) {
				newErrors[setter as keyof ValidationErrors] = validationMessage;
			}
			if (!validationMessage) {
				delete newErrors[setter as keyof ValidationErrors];
			}
			return newErrors;
		});
	};

	const inputFields = [
		{
			placeholder: "Search by text",
			value: text,
			setter: "text",
			errors: errors.text,
		},
		{
			placeholder: "Search by author",
			value: author,
			setter: "author",
			errors: errors.author,
		},
		{
			placeholder: "Search by category",
			value: category,
			setter: "category",
			errors: errors.category,
		},
		{
			placeholder: "Limit",
			value: limit || "",
			setter: "limit",
			errors: null,
		},
	];

	return (
		<div className="p-4">
			<h1 className="text-3xl mb-6 text-center dark:text-white">
				Search Quotes
			</h1>
			<div className="text-xl grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_0.5fr] gap-4 mb-6">
				{inputFields.map((field) => (
					<InputField
						key={field.setter}
						placeholder={field.placeholder}
						value={field.value}
						onChange={(value) =>
							handleInputChange(field.setter, value)
						}
						error={field.errors}
						showError={searchButtonClicked}
					/>
				))}
			</div>
			<div className="text-center mb-6 flex justify-center gap-4">
				<Button onClick={handleSearch} text="Search" />
				<Button onClick={clearInputs} text="Clear" />
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
