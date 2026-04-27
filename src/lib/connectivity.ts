import axios, { CreateAxiosDefaults } from 'axios';
import { AxiosInstance } from '@uikit/lib/types';
import mitt from 'mitt';
import { HttpStatus } from '@uikit/schema';
import { showNotification } from '@uikit/ui/sonner';

const axiosApiInstance: (props: CreateAxiosDefaults) => AxiosInstance = (props) => {
	const apibBase = axios.create({ withCredentials: true, ...props });
	const errorCount: any = {};
	apibBase.interceptors.response.use(
		(response) => {
			return new Promise((resolve, reject) => {
				if (response.status === HttpStatus.PARTIAL_CONTENT) {
					if (response.data.exp === 'NotFoundException') {
						console.warn(response.data);
						showNotification({
							message: 'URL not found',
							caption: 'Please check axios URL',
							type: 'error',
						});
					}
					return reject(response.data);
				}
				resolve(response);
			});
		},
		(error) => {
			return new Promise((resolve, reject) => {
				if (error.message === 'Network Error') {
					if (errorCount[error.config.url] > 2) {
						showNotification({
							caption: 'Please check your internet connection.',
							message: `${error.message}!`,
							type: 'error',
						});
						errorCount[error.config.url] = 0;
						reject(axios.isAxiosError(error) ? error.response : error);
					}
					errorCount[error.config.url] = errorCount[error.config.url] ? errorCount[error.config.url] + 1 : 1;
					setTimeout(() => {
						showNotification({
							caption: 'Please check your internet connection.',
							message: `${error.message}! Retrying in 5 sec...`,
							type: 'loading',
						});
					}, 500);

					setTimeout(() => {
						resolve(null);
					}, 5000);
				} else {
					reject(axios.isAxiosError(error) ? error.response : error);
				}
			}).then(() => {
				return apibBase.request(error.config);
			});
		},
	);
	return apibBase;
};

function baseGetApiUrl(baseUrl: string, url: string): string {
	return `${baseUrl}/${url}`;
}

function baseGetFile(baseUrl: string, file = '', fallBack = ''): string {
	return file ? `${baseUrl}/storage/file/${file}` : fallBack;
}

const mitter = mitt();
export { axiosApiInstance, baseGetApiUrl, baseGetFile, mitter };
