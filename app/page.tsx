"use client";
import { Quote } from "@/models/quote";
import { useEffect, useState } from "react";
import Button from "./components/Button";
import Quotes from "./components/Quotes";
import { toast } from "react-toastify";

const RANDOM_QUOTES_URL = "http://localhost:3000/quotes/random?limit=10";

export default function Home() {
	const [quotes, setQuotes] = useState<Quote[]>([]);

	const fetchQuotes = async () => {
		try {
			const response = await fetch(RANDOM_QUOTES_URL);
			setQuotes(await response.json());
		} catch (error) {
			toast.error(
				error instanceof Error
					? error.message
					: "An unknown error occurred"
			);
			console.log(`Error fetching quotes: ${error}`);
		}
	};

	useEffect(() => {
		fetchQuotes();
	}, []);

	return (
		<div className="p-4">
			<h1 className="text-3xl mb-6 text-center dark:text-white">
				Random Quotes
			</h1>
			<div className="text-center mb-6">
				<Button onClick={fetchQuotes} text={"Get Random Quotes"} />
			</div>
			<Quotes quotes={quotes} />
		</div>
	);
}
