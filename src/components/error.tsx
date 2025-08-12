import type { PropsWithChildren } from "react";

function Error({ children }: PropsWithChildren) {
	return (
		<div className="flex items-center justify-center min-h-screen bg-red-800 text-white text-2xl font-bold p-4 text-center">
			{children}
		</div>
	);
}

export default Error;
