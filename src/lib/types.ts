import { ReactNode, Ref } from 'react';
import { CreateLinkProps } from '@tanstack/react-router';
import { AxiosInstance as ax, AxiosRequestConfig, AxiosResponse } from 'axios';
import { FileUpload, ResponseError, ResponseInterface } from '@entero/schema';

export interface AxiosInstance extends ax {
	/**
	 * @template T Response data type
	 * @template D Request data type
	 * @template R Response type
	 * @param config
	 */
	request: <T = any, D = any, R = AxiosResponse<ResponseInterface<T>>>(config: AxiosRequestConfig<D>) => Promise<R>;

	/**
	 * @template T Response data type
	 * @template D Request data type
	 * @template R Response type
	 * @param url
	 * @param config
	 */
	get: <T = any, D = any, R = AxiosResponse<ResponseInterface<T>>>(url: string, config?: AxiosRequestConfig<D>) => Promise<R>;

	/**
	 * @template T Response data type
	 * @template D Request data type
	 * @template R Response type
	 * @param url
	 * @param config
	 */
	delete: <T = any, D = any, R = AxiosResponse<ResponseInterface<T>>>(url: string, config?: AxiosRequestConfig<D>) => Promise<R>;

	/**
	 * @template T Response data type
	 * @template D Request data type
	 * @template R Response type
	 * @param url
	 * @param config
	 */
	head: <T = any, D = any, R = AxiosResponse<ResponseInterface<T>>>(url: string, config?: AxiosRequestConfig<D>) => Promise<R>;

	/**
	 * @template T Response data type
	 * @template D Request data type
	 * @template R Response type
	 * @param url
	 * @param config
	 */
	options: <T = any, D = any, R = AxiosResponse<ResponseInterface<T>>>(url: string, config?: AxiosRequestConfig<D>) => Promise<R>;

	/**
	 * @template T Response data type
	 * @template D Request data type
	 * @template R Response type
	 * @param url
	 * @param config
	 */
	post: <T, D = any, R = AxiosResponse<ResponseInterface<T>>>(url: string, data?: unknown, config?: AxiosRequestConfig<D>) => Promise<R>;

	/**
	 * @template T Response data type
	 * @template D Request data type
	 * @template R Response type
	 * @param url
	 * @param config
	 */
	put: <T = any, D = any, R = AxiosResponse<ResponseInterface<T>>>(url: string, data?: unknown, config?: AxiosRequestConfig<D>) => Promise<R>;

	/**
	 * @template T Response data type
	 * @template D Request data type
	 * @template R Response type
	 * @param url
	 * @param config
	 */
	patch: <T = any, D = any, R = AxiosResponse<ResponseInterface<T>>>(url: string, data?: D, config?: AxiosRequestConfig<D>) => Promise<R>;

	/**
	 * @template T Response data type
	 * @template D Request data type
	 * @template R Response type
	 * @param url
	 * @param config
	 */
	postForm<T = any, D = FileUpload, R = AxiosResponse<ResponseInterface<T>>>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}

export type ModalRef<T = any, R = Record<string, any>> = {
	show: (props: T | null) => void;
} & R;

export interface ModalProps<T = any> {
	ref?: Ref<ModalRef<T>>;
	onSaved?: () => void;
}

export type RouteMeta = {
	title?: ReactNode;
	// pageTitle?: string;
	// htmlTitle?: string;
	// htmlTitlePattern?: string;
	to?: CreateLinkProps;
	needAuthorization?: boolean;
	disabled?: boolean;
	settingsToolbar?: boolean;
	before?: Array<RouteMeta>;
	after?: Array<RouteMeta>;
};

export type SessionAlertType =
	| {
	message: string;
	color: string;
	caption?: string;
}
	| string;

declare module '@tanstack/react-query' {
	interface Register {
		defaultError: ResponseInterface<ResponseError> | Error;
	}
}

declare module '@tanstack/react-router' {
	interface StaticDataRouteOption {
		grow?: boolean;
		table?: boolean;
	}
}

// @ts-ignore
declare module '*.md' {
	const value: string;
	export default value;
}
