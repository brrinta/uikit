import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from '@tanstack/react-router';

export function PageMeta({
	title,
	right,
	headerRight,
	docTitle,
}: {
	title?: ReactNode;
	docTitle?: string;
	right?: ReactNode;
	headerRight?: ReactNode;
}) {
	const pathname = useLocation({ select: (v) => v.pathname });
	const [pageTitleElm, setPageTitleElm] = useState<HTMLElement | null>(null);
	const [pageRightElm, setPageRightElm] = useState<HTMLElement | null>(null);
	const [headerRightElm, setHeaderRightElm] = useState<HTMLElement | null>(null);
	// const [time, setTime] = useState(0);
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setTime(time + 1);
	// 	}, 50);
	//
	// 	return () => {
	// 		//on UnoMount
	// 		document.title = 'Entero.biz';
	// 	};
	// }, []);

	useEffect(() => {
		if (docTitle) document.title = docTitle + ':: Entero.biz';
		if (title && typeof title == 'string' && !docTitle) document.title = title + ':: Entero.biz';
	}, [docTitle, title]);

	useEffect(() => {
		const ptElm = document.getElementById('page-title');
		setPageTitleElm(ptElm);
		const prElm = document.getElementById('page-right');
		setPageRightElm(prElm);
		const hrElm = document.getElementById('header-right');
		setHeaderRightElm(hrElm);
		return () => {
			//on UnoMount
			document.title = 'Entero.biz';
		};
	}, [pathname]);

	return (
		<>
			{pageTitleElm ? createPortal(title, pageTitleElm) : ''}
			{pageRightElm ? createPortal(right, pageRightElm) : ''}
			{headerRightElm ? createPortal(headerRight, headerRightElm) : ''}
		</>
	);
}

PageMeta.templateName = 'PageMeta';
