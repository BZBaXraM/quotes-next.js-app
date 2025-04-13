import { Quote } from "@/models/quote";

type QuotesProps = {
	quotes: Quote[];
};

const Quotes = ({ quotes }: QuotesProps) => {
	return (
		<div className="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{quotes.map((quote) => (
				<div
					key={quote.id}
					className="bg-white 
						dark:bg-gray-800
						p-4 shadow-md rounded-lg"
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
								className="text-lg bg-gray-200
									dark:bg-gray-700
									text-gray-700 
									dark:text-gray-300
									px-2 py-1 rounded-full mr-2 mb-2"
							>
								{category}
							</span>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default Quotes;
