import { Quote } from "@/models/quote";
import Link from "next/link";

type QuotesProps = {
	quotes: Quote[];
};

const Quotes = ({ quotes }: QuotesProps) => {
	return (
		<div className="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{quotes.map((quote) => (
				<Link
					href={`/quotes/${quote.id}`}
					key={quote.id}
					className="bg-gray-200
						dark:bg-gray-800
						p-4 shadow-md rounded-lg
						hover:translate-y-1.5
						hover:bg-gray-100 
						hover:dark:bg-gray-700
						transition-transform duration-400"
				>
					<p
						className="mb-4 text-xl italic
							text-gray-900
						dark:text-gray-100
						"
					>
						{quote.text}
					</p>
					<p
						className="mb-10 text-right text-xl font-semibold
						text-gray-700
						dark:text-gray-300"
					>
						- {quote.author}
					</p>
					<div className="flex flex-wrap mt-2">
						{quote.categories.map((category) => (
							<span
								key={category}
								className="text-lg bg-blue-200
									text-gray-700 
									dark:text-gray-800
									px-2 py-1 rounded-full mr-2 mb-2"
							>
								{category}
							</span>
						))}
					</div>
				</Link>
			))}
		</div>
	);
};

export default Quotes;
