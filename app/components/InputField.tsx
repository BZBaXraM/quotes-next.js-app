import React from "react";

type InputFieldProps = {
	placeholder: string;
	value: string;
	onChange: (value: string) => void;
	error?: string | null;
	showError?: boolean;
};

const InputField = ({
	placeholder,
	value,
	onChange,
	error,
	showError,
}: InputFieldProps) => {
	return (
		<div className="w-full">
			<input
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="p-2 w-full border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
			/>
			{showError && error && (
				<p className="text-red-500 text-base">{error}</p>
			)}
		</div>
	);
};

export default InputField;
