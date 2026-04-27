import * as React from 'react';

export const DefaultPendingComponent = () => {
	return (
		// <div
		// 	style={{
		// 		width: '100%',
		// 		height: '100%',
		// 		display: 'flex',
		// 		justifyContent: 'center',
		// 		alignItems: 'center',
		// 		flexGrow: 1,
		// 		padding: 40,
		// 		flexDirection: 'column',
		// 	}}>
		// 	<style dangerouslySetInnerHTML={{ __html: '#app{height:100%}' }} />
		// 	<img
		// 		style={{ width: 150 }}
		// 		src={'/loading.gif'}
		// 	/>
		// 	<div
		// 		style={{
		// 			color: 'gray',
		// 			fontFamily: 'Exo',
		// 			fontSize: 20,
		// 			fontWeight: 500,
		// 		}}>
		// 		Validating...
		// 	</div>
		// </div>
		<div className="size-full flex items-center justify-center py-16 rounded-md">
			<div className="flex flex-col items-center gap-6">
				{/* Spinner */}
				<div className="relative">
					{/* Outer ring */}
					<div className="size-16 rounded-full border-4 border-muted"></div>
					{/* Animated ring */}
					<div className="absolute inset-0 size-16 animate-spin rounded-full border-4 border-transparent border-t-primary"></div>
				</div>

				{/* Loading text */}
				<div className="flex flex-col items-center gap-2">
					<p className="text-foreground">Loading...</p>
					<p className="text-muted-foreground">Please wait</p>
				</div>
			</div>
		</div>
	);
};
