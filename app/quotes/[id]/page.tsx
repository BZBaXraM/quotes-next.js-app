"use client";
import { Quote } from "@/models/quote";
import React, { useEffect, useState, use } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

type QuotePageProps = {
	params: Promise<{
		id: string;
	}>;
};

const QuotePage = (props: QuotePageProps) => {
	const params = use(props.params);
	const [quote, setQuote] = useState<Quote | null>(null);
	const { id } = params;
	const [isLoading, setLoading] = useState<boolean>(true);

	const fetchQuote = async () => {
		if (id) {
			try {
				const response = await fetch(
					`http://localhost:3000/quotes/${id}`
				);
				const data = await response.json();
				if (response.status === 404) {
					toast.error(data.message);
					return;
				}
				if (response.ok) {
					setQuote(data);
				}
			} catch (error) {
				if (error instanceof Error) {
					toast.error(error.message);
					console.error("Error fetching quotes: ", error);
				} else {
					toast.error("An unknown error occurred.");
					console.error("Error fetching quotes: ", error);
				}
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		fetchQuote();
	});

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<ClipLoader size={60} color="#4A90E2" />
			</div>
		);
	}

	if (!quote) {
		return (
			<p className="text-center text-2xl">{`Quote wih id ${id} not found.`}</p>
		);
	}

	return (
		<div>
			<div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800">
				<h2
					className="text-4xl font-bold 
				text-center mb-6 text-violet-900 dark:text-violet-300"
				>
					{quote.text}
				</h2>
				<p className="text-2xl text-center text-gray-500 dark-text-gray-300 mb-4">
					- {quote.author}
				</p>
				<div className="mt-7 flex flex-wrap justify-center gap-3">
					{quote.categories.map((category) => (
						<span
							key={category}
							className="text-base bg-violet-200 text-violet-900 py-2 px-4 rounded-lg dark:bg-violet-700 dark:text-violet-200"
						>
							{category}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default QuotePage;
