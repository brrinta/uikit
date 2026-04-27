import { useEffect, useState } from 'react';

export const UnderMaintenance = () => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					return 0;
				}
				return prev + 1;
			});
		}, 50);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
			<div className="max-w-2xl w-full text-center space-y-8">
				{/* Icon */}
				<div className="flex justify-center">
					<div className="relative">
						<div className="absolute inset-0 bg-orange-500 blur-2xl opacity-20 rounded-full"></div>
						<div className="relative bg-white rounded-full p-8 shadow-lg">
							<svg
								className="w-20 h-20 text-orange-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								strokeWidth="1.5">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
								/>
							</svg>
						</div>
					</div>
				</div>

				{/* Main Message */}
				<div className="space-y-4">
					<h1 className="text-slate-900">We'll Be Back Soon</h1>
					<p className="text-slate-600 max-w-md mx-auto">
						Our website is currently undergoing scheduled maintenance. We apologize for any inconvenience and appreciate your patience.
					</p>
				</div>

				{/* Progress Bar */}
				<div className="space-y-3">
					<div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
						<div
							className="bg-orange-500 h-2 rounded-full transition-all duration-300 ease-out"
							style={{ width: `${progress}%` }}></div>
					</div>
					<p className="text-slate-500">Maintenance in progress...</p>
				</div>

				{/* Additional Info */}
				<div className="grid md:grid-cols-2 gap-4 pt-8 max-w-lg mx-auto">
					<div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
						<svg
							className="w-6 h-6 text-orange-500 mx-auto mb-3"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							strokeWidth="2">
							<circle
								cx="12"
								cy="12"
								r="10"
							/>
							<polyline points="12 6 12 12 16 14" />
						</svg>
						<p className="text-slate-900">Estimated Time</p>
						<p className="text-slate-600">2-5 minutes</p>
					</div>

					<div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
						<svg
							className="w-6 h-6 text-orange-500 mx-auto mb-3"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							strokeWidth="2">
							<rect
								x="2"
								y="4"
								width="20"
								height="16"
								rx="2"
							/>
							<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
						</svg>
						<p className="text-slate-900">Need Help?</p>
						<a
							href="mailto:support@champteks.com"
							className="text-orange-500 hover:text-orange-600 transition-colors">
							support@champteks.com
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};
