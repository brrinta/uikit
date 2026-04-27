import { NotFoundRouteProps } from '@tanstack/react-router';
import { AppLink } from '../components/app-link';

export function NotFound({ children, props }: { children?: any; props?: NotFoundRouteProps }) {
	return (
		<div className="size-full flex items-center justify-center bg-background py-16">
			<div className="flex flex-col items-center gap-6 px-6 text-center max-w-2xl">
				{/* Graphic Illustration */}
				<div className="w-64 h-64 relative">
					<svg
						viewBox="0 0 200 200"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="w-full h-full">
						{/* Background circle */}
						<circle
							cx="100"
							cy="100"
							r="80"
							fill="#f0f0f0"
						/>

						{/* Broken page illustration */}
						<path
							d="M70 50 L130 50 L130 120 L100 150 L70 120 Z"
							fill="white"
							stroke="#e0e0e0"
							strokeWidth="2"
						/>

						{/* Crack in the page */}
						<path
							d="M100 60 L95 90 L105 110 L100 150"
							stroke="#e74c3c"
							strokeWidth="3"
							strokeLinecap="round"
						/>

						{/* Search icon */}
						<circle
							cx="140"
							cy="80"
							r="15"
							stroke="#3498db"
							strokeWidth="3"
							fill="none"
						/>
						<line
							x1="150"
							y1="90"
							x2="160"
							y2="100"
							stroke="#3498db"
							strokeWidth="3"
							strokeLinecap="round"
						/>

						{/* Question mark */}
						<text
							x="100"
							y="95"
							textAnchor="middle"
							fill="#95a5a6"
							fontSize="40"
							fontWeight="bold">
							?
						</text>
					</svg>
				</div>

				{/* 404 Heading */}
				<h1 className="text-2xl font-bold text-red-600 dark:text-red-400">404 - Not Found</h1>

				{/* Description */}
				<div className="flex flex-col gap-4">
					<div className="text-gray-600 dark:text-gray-400">
						{children || (props?.data as any)?.data || <p>The page you are looking for does not exist.</p>}
					</div>
					<div className="text-gray-500 dark:text-gray-300">
						Route: {(props?.data as any)?.routeId || 'The requested resource could not be found.'}
					</div>
				</div>

				{/* Buttons */}
				<div className="flex gap-3 mt-2">
					<button
						onClick={() => window.history.back()}
						className="bg-emerald-500 text-white px-2 py-1 rounded uppercase font-black text-sm">
						Go back
					</button>
					<AppLink
						to="/"
						className="bg-cyan-600 text-white px-2 py-1 rounded uppercase font-black text-sm">
						Start Over
					</AppLink>
				</div>
			</div>
		</div>
	);
}
