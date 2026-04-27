import { ErrorComponent, ErrorComponentProps, rootRouteId, useMatch, useRouter } from '@tanstack/react-router';
import { AppLink } from '../components/app-link';

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
	const router = useRouter();
	const isRoot = useMatch({
		strict: false,
		select: (state) => state.id === rootRouteId,
	});
	console.error('DefaultCatchBoundary Error:', error);

	return (
		<div className="mx-auto text-center flex flex-col justify-center items-center gap-6 bg-linear-to-br from-red-50 to-orange-50 p-8 size-full">
			{/* Graphic Illustration */}
			<div className="w-48 h-48 relative animate-pulse">
				<svg
					viewBox="0 0 200 200"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="w-full h-full drop-shadow-md">
					{/* Background circle with gradient effect */}
					<circle
						cx="100"
						cy="100"
						r="85"
						fill="#fee2e2"
						opacity="0.5"
					/>
					<circle
						cx="100"
						cy="100"
						r="70"
						fill="#fecaca"
						opacity="0.3"
					/>

					{/* Alert/Warning icon */}
					<circle
						cx="100"
						cy="100"
						r="50"
						fill="#ef4444"
					/>

					{/* Exclamation mark */}
					<rect
						x="95"
						y="70"
						width="10"
						height="35"
						rx="5"
						fill="white"
					/>
					<circle
						cx="100"
						cy="120"
						r="6"
						fill="white"
					/>

					{/* Decorative elements - sparks/alert indicators */}
					<circle
						cx="60"
						cy="60"
						r="4"
						fill="#f97316"
						opacity="0.6">
						<animate
							attributeName="opacity"
							values="0.6;1;0.6"
							dur="2s"
							repeatCount="indefinite"
						/>
					</circle>
					<circle
						cx="140"
						cy="60"
						r="4"
						fill="#f97316"
						opacity="0.6">
						<animate
							attributeName="opacity"
							values="1;0.6;1"
							dur="2s"
							repeatCount="indefinite"
						/>
					</circle>
					<circle
						cx="140"
						cy="140"
						r="4"
						fill="#f97316"
						opacity="0.6">
						<animate
							attributeName="opacity"
							values="0.6;1;0.6"
							dur="2s"
							repeatCount="indefinite"
						/>
					</circle>
					<circle
						cx="60"
						cy="140"
						r="4"
						fill="#f97316"
						opacity="0.6">
						<animate
							attributeName="opacity"
							values="1;0.6;1"
							dur="2s"
							repeatCount="indefinite"
						/>
					</circle>
				</svg>
			</div>

			{/* Error Title */}
			{/*<div className="flex flex-col gap-2">*/}
			{/*	<h1 className="text-destructive">{error.message || 'Something Went Wrong'}</h1>*/}
			{/*	<p className="text-muted-foreground">*/}
			{/*		<pre>{error.stack || 'No stack trace available'}</pre>*/}
			{/*	</p>*/}
			{/*</div>*/}
			<ErrorComponent error={error} />
			<div className="flex gap-3 items-center flex-wrap justify-center mt-2">
				<button
					onClick={() => {
						router.invalidate();
					}}
					className={'px-2 py-1 bg-cyan-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold'}>
					Try Again
				</button>
				{isRoot ? (
					<AppLink
						to="/"
						className={'px-2 py-1 bg-emerald-500 dark:bg-gray-700 rounded text-white uppercase font-extrabold'}>
						Home
					</AppLink>
				) : (
					<AppLink
						to="/"
						className={'px-2 py-1 bg-emerald-500 dark:bg-gray-700 rounded text-white uppercase font-extrabold'}
						onClick={(e) => {
							e.preventDefault();
							window.history.back();
						}}>
						Go Back
					</AppLink>
				)}
			</div>
		</div>
	);
}
