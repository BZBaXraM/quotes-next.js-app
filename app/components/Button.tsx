type ButtonProps = {
	onClick: () => Promise<void>;
	text: string;
};

export default function Button({ onClick, text }: ButtonProps) {
	return (
		<div className="text-center mb-6">
			<button
				onClick={onClick}
				className="px-6 py-3 text-xl bg-violet-900 text-white rounded-md hover:bg-violet-800 focus:outline-none focus-ring-2 focus-ring-violet-600"
			>
				{text}
			</button>
		</div>
	);
}
