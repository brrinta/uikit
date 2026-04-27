import dayjs, { Dayjs, QUnitType } from 'dayjs';
import { htmlToText } from 'html-to-text';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import recur from 'dayjs-recur';
import ObjectID from 'bson-objectid';
import { utils, write } from 'xlsx';
import mixPlugin from 'colord/plugins/mix';
import { extend } from 'colord';

extend([mixPlugin]);
// @ts-ignore
dayjs.extend(recur);
dayjs.extend(utc);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(localizedFormat);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/New_York');
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

export function timeStampToDate(stamp: number, format = 'DD MMM, YYYY hh:mm:ss A') {
	return dayjs(stamp).format(format);
}

export function secondsToDhms(seconds: any) {
	seconds = Number(seconds);
	const d = Math.floor(seconds / (3600 * 24));
	const h = Math.floor((seconds % (3600 * 24)) / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = Math.floor(seconds % 60);
	return { d, h, m, s };
}

export function exportAsExcelFile(
	json: Array<Record<string, any>>,
	header: string[],
	fileName: string,
	type: 'csv' | 'xlsx' | 'txt' = 'csv',
	sheetName = 'Sheet 1',
): void {
	const worksheet = utils.json_to_sheet(json, {
		header,
	});
	const workbook = utils.book_new();
	utils.book_append_sheet(workbook, worksheet, sheetName);
	const excelBuffer = write(workbook, { bookType: type, type: 'array', compression: true });
	saveAsFile(
		excelBuffer,
		`${fileName}.${type}`,
		type == 'csv' ? 'text/csv' : type === 'xlsx' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'text/plain',
	);
}

export function saveAsFile(data: any, fileName: string, fileMimeType: string): void {
	const blob: Blob =
		data instanceof Blob
			? data
			: new Blob([data], {
					type: fileMimeType,
				});
	const objectUrl = URL.createObjectURL(blob);

	const link = document.createElement('a');
	link.href = objectUrl;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

	URL.revokeObjectURL(objectUrl);
}

export function randomColors(i: number): { p: string; s: string } {
	const prepareColors = [
		{ p: 'rgb(128, 255, 165)', s: 'rgb(1, 191, 236)' },
		{ p: 'rgb(0, 221, 255)', s: 'rgb(77, 119, 255)' },
		{ p: 'rgb(55, 162, 255)', s: 'rgb(116, 21, 219)' },
		{ p: 'rgb(255, 0, 135)', s: 'rgb(135, 0, 157)' },
		{ p: 'rgb(255, 191, 0)', s: 'rgb(224, 62, 76)' },
		{ p: 'rgb(144, 164, 174)', s: 'rgb(55, 71, 79)' },
		{ p: 'rgb(255, 238, 88)', s: 'rgb(255, 143, 0)' },
	];
	return prepareColors[i];
}

export const distinctColors = [
	'#5470C6',
	'#91CC75',
	'#FAC858',
	'#EE6666',
	'#73C0DE',
	'#3BA272',
	'#FC8452',
	'#9A60B4',
	'#EA7CCC',
	'#dd6b66',
	'#759aa0',
	'#e69d87',
	'#8dc1a9',
	'#ea7e53',
	'#eedd78',
	'#73a373',
	'#73b9bc',
	'#7289ab',
	'#91ca8c',
	'#f49f42',
	'#c23531',
	'#2f4554',
	'#61a0a8',
	'#d48265',
	'#91c7ae',
	'#749f83',
	'#ca8622',
	'#bda29a',
	'#6e7074',
	'#546570',
	'#c4ccd3',
	'#37A2DA',
	'#32C5E9',
	'#67E0E3',
	'#9FE6B8',
	'#FFDB5C',
	'#ff9f7f',
	'#fb7293',
	'#E062AE',
	'#E690D1',
	'#e7bcf3',
	'#9d96f5',
	'#8378EA',
	'#96BFFF',
	'#dd6b66',
	'#759aa0',
	'#e69d87',
	'#8dc1a9',
	'#ea7e53',
	'#eedd78',
	'#73a373',
	'#73b9bc',
	'#7289ab',
	'#91ca8c',
	'#f49f42',
	'#c23531',
	'#2f4554',
	'#61a0a8',
	'#d48265',
	'#91c7ae',
	'#749f83',
	'#ca8622',
	'#bda29a',
	'#6e7074',
	'#546570',
	'#c4ccd3',
	'#37A2DA',
	'#32C5E9',
	'#67E0E3',
	'#9FE6B8',
	'#FFDB5C',
	'#ff9f7f',
	'#fb7293',
	'#E062AE',
	'#E690D1',
	'#e7bcf3',
	'#9d96f5',
	'#8378EA',
	'#96BFFF',
];

export function hexToRgb(hex: string) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	// @ts-expect-error
	return `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`;
}

export function convertHtmlToText(text: string) {
	return htmlToText(text);
}

export function phoneNumber(phone: string) {
	phone = phone.replace(/\s|\(|\)|-/g, '');
	if (!phone.startsWith('+') && phone.length === 10) return '+1' + phone;
	if (phone.length === 11) return '+' + phone;
	return phone;
}

export function generateID() {
	return ObjectID().toHexString();
}

export function trimPhoneNo(no: string, withSpace?: boolean, withCode?: boolean) {
	if (no) {
		no = no.replace(/(\+1)|[()\-\s]+/g, '').slice(-10);
		if (withSpace) {
			no = no.replace(/^(\d{3})(\d{3})(\d{4})$/, '$1 $2 $3');
		}
		if (withCode) {
			no = '+1' + (withSpace ? ' ' : '') + no;
		}
	}
	return no;
}

export function currency(num: number, fractionDigits = 2) {
	return '$' + num.toFixed(fractionDigits);
}

export function convertDate(rawDate?: Date | string, format?: string, inUtc?: boolean, notAvailable = 'N/A') {
	format = format || 'DD MMM, YYYY';
	return rawDate ? (inUtc ? dayjs(rawDate).utc().format(format) : dayjs.tz(rawDate).format(format)) : notAvailable;
}

export function convertToDateTime(rawDate?: Date | string, inUtc?: boolean, notAvailable = 'N/A', lineBreak = true) {
	return convertDate(rawDate, lineBreak ? 'DD MMM, YYYY\nhh:mm:ss A' : 'DD MMM, YYYY hh:mm:ss A', inUtc, notAvailable);
}


export function formatBytes(bytes: number, decimals = 2) {
	if (!+bytes) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function enumToPair<T = any>(obj: any, withSpace?: boolean, excludes?: any[], only?: any[]) {
	return Object.keys(obj)
		.filter((f: any) => isNaN(f) && !excludes?.includes(f))
		.filter((f: any) => (only ? only.includes(obj[f]) : true))
		.map((f) => ({
			value: obj[f],
			label: withSpace ? f.replace(/[A-Z]|\d+/g, ' $&') : f,
			_id: obj[f],
		}));
}

export function removeArrayElement<T = any>(array: Array<T>, elm: T): Array<T> {
	const index = array.indexOf(elm);
	if (index > -1) {
		array.splice(index, 1);
	}
	return array;
}

export function arrayElementMove<T = any>(arr: Array<T>, old_index: number, new_index: number) {
	arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
	return arr;
}

export function removeArrayElementByIndex<T = any>(array: Array<T>, index: number): Array<T> {
	if (index > -1) {
		array.splice(index, 1);
	}
	return array;
}

export function findDuplicates(arr: any[]) {
	return [...new Set(arr.filter((item, index) => arr.indexOf(item) != index))];
}

export function clean(str: string): any {
	if (typeof str !== 'string' || !str) return str;
	str = str.trim().replace('N/A', '').replace('n/a', '').replace(/,|;/g, ' ').replace(/’/g, '\'').replace(/“/g, '\'').replace(/”/g, '\'');
	const toClean = /^[\s|#|\?|\!|&|`|"|\n|,\\|\*|.]|[\s|#|\?|\!|&|`|"|\n|,\\|\*|.]$/g;
	const result = str.replace(toClean, '');
	if (result.match(toClean)) {
		return clean(result);
	}
	return result;
}

export function capitalizeFirstLetter(str: string, withSpace?: boolean, needCleaning?: boolean): string {
	let text = str || '';
	if (needCleaning) {
		text = clean(str);
	}
	text = text.replace(/\b[a-z](?=[a-z])/g, (letter) => letter.toUpperCase());
	if (withSpace) return text.replace(/[A-Z]|\d+/g, ' $&');
	return text;
}

export function smallFirstLetter(str: string, needCleaning?: boolean): string {
	let text = str || '';
	if (needCleaning) {
		text = clean(str);
	}
	return text.replace(/\b[A-Z](?=[a-z])/g, (letter) => letter.toLowerCase());
}

export const dateRangeShortcuts = [
	{
		text: 'Today',
		value: () => [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
	},
	{
		text: 'Yesterday',
		value: () => [dayjs().subtract(1, 'day').format('YYYY-MM-DD'), dayjs().subtract(1, 'day').format('YYYY-MM-DD')],
	},
	{
		text: 'Last 7Days',
		value: () => [dayjs().subtract(6, 'days').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
	},
	{
		text: 'This Week',
		value: () => [dayjs().startOf('week').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
	},
	{
		text: 'Last Week',
		value: () => [dayjs().subtract(1, 'week').startOf('week').format('YYYY-MM-DD'), dayjs().subtract(1, 'week').endOf('week').format('YYYY-MM-DD')],
	},
	{
		text: 'This Month',
		value: () => [dayjs().startOf('month').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
	},
	{
		text: 'Last Month',
		value: () => [
			dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
			dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD'),
		],
	},
	{
		text: 'Last 30Days',
		value: () => [dayjs().subtract(30, 'days').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
	},
	{
		text: 'L. 3Months',
		value: () => [dayjs().subtract(2, 'month').startOf('month').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
	},
	{
		text: 'L. 6Months',
		value: () => [dayjs().subtract(5, 'month').startOf('month').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
	},
	{
		text: 'L. 12Months',
		value: () => [dayjs().subtract(11, 'month').startOf('month').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
	},
	{
		text: 'This Year',
		value: () => [dayjs().startOf('year').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
	},
	{
		text: 'Last Year',
		value: () => [dayjs().subtract(1, 'year').startOf('year').format('YYYY-MM-DD'), dayjs().subtract(1, 'year').endOf('year').format('YYYY-MM-DD')],
	},
];

export const playNotificationSound = () => {
	const audio = new Audio('/notification.mp3');
	audio.play();
};
export const playErrorSound = () => {
	const audio = new Audio('/error.mp3');
	audio.play();
};

export const toBase64 = (file: File | null) => {
	return new Promise((resolve, reject) => {
		if (!file) return resolve(undefined);
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
	});
};
export const diffFromDate = (start: Dayjs, unit: QUnitType, end: Dayjs) => {
	return end.diff(start, unit);
};

export function getText(html: string) {
	return html.replace(/<[^>]*>/g, '');
}
