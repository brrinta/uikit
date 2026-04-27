// Minimal schema types required by uikit.
// These types are extracted from the entero.biz @entero/schema package, scoped to
// only what the uikit library needs so that this package can be used standalone.

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export enum SortDirection {
	ASC = 1,
	DESC = -1,
}

export enum FieldTypes {
	Date = 'Date',
	Text = 'Text',
	Number = 'Number',
	Email = 'Email',
	Phone = 'Phone',
	Currency = 'Currency',
	File = 'File',
	Link = 'Link',
}

export enum HttpStatus {
	CONTINUE = 100,
	SWITCHING_PROTOCOLS = 101,
	PROCESSING = 102,
	EARLYHINTS = 103,
	OK = 200,
	CREATED = 201,
	ACCEPTED = 202,
	NON_AUTHORITATIVE_INFORMATION = 203,
	NO_CONTENT = 204,
	RESET_CONTENT = 205,
	PARTIAL_CONTENT = 206,
	AMBIGUOUS = 300,
	MOVED_PERMANENTLY = 301,
	FOUND = 302,
	SEE_OTHER = 303,
	NOT_MODIFIED = 304,
	TEMPORARY_REDIRECT = 307,
	PERMANENT_REDIRECT = 308,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	PAYMENT_REQUIRED = 402,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	NOT_ACCEPTABLE = 406,
	PROXY_AUTHENTICATION_REQUIRED = 407,
	REQUEST_TIMEOUT = 408,
	CONFLICT = 409,
	GONE = 410,
	LENGTH_REQUIRED = 411,
	PRECONDITION_FAILED = 412,
	PAYLOAD_TOO_LARGE = 413,
	URI_TOO_LONG = 414,
	UNSUPPORTED_MEDIA_TYPE = 415,
	REQUESTED_RANGE_NOT_SATISFIABLE = 416,
	EXPECTATION_FAILED = 417,
	I_AM_A_TEAPOT = 418,
	MISDIRECTED = 421,
	UNPROCESSABLE_ENTITY = 422,
	FAILED_DEPENDENCY = 424,
	PRECONDITION_REQUIRED = 428,
	TOO_MANY_REQUESTS = 429,
	INTERNAL_SERVER_ERROR = 500,
	NOT_IMPLEMENTED = 501,
	BAD_GATEWAY = 502,
	SERVICE_UNAVAILABLE = 503,
	GATEWAY_TIMEOUT = 504,
	HTTP_VERSION_NOT_SUPPORTED = 505,
}

export enum FileStatus {
	Deleted = -1,
	Uploaded = 0,
	InUse = 1,
}
// ---------------------------------------------------------------------------
// Primitive types
// ---------------------------------------------------------------------------

/**
 * A MongoDB ObjectId represented as a string (or undefined) for use in frontend
 * code. Unlike the server-side definition which includes `mongoose.Types.ObjectId`,
 * this standalone version only uses plain strings so that the uikit package has no
 * dependency on Mongoose.
 */
export type MongoDbObjectID = string | undefined;


// ---------------------------------------------------------------------------
// Response types
// ---------------------------------------------------------------------------

export interface ResponseInterface<T> {
	error?: string;
	exp?: string;
	isSuccess: boolean;
	message: string;
	caption?: string;
	method?: string;
	path?: string;
	statusCode?: HttpStatus;
	timestamp?: number;
	body: T;
	timeInSec?: number;

	[x: string]: any;
}

export type FieldError<T extends Record<string, any>> = { error: string; field: keyof T };

export interface ResponseError<T extends Record<string, any> = Record<string, any>> {
	fields?: Array<FieldError<T>>;

	[x: string]: any;
}

// ---------------------------------------------------------------------------
// DataTable types
// ---------------------------------------------------------------------------

export type DatatableResponse<T = Record<string, any>> = {
	rows: T[];
	filtered: number;
	total: number;
	footer?: any;
	extra?: any;
};

// ---------------------------------------------------------------------------
// File & upload types
// ---------------------------------------------------------------------------

export type FileUpload<L=string> = {
	/** table name */
	ref: string;
	/** primary id of the table */
	refID?: MongoDbObjectID;
	/** primary path of the table (_id) */
	refPath?: string;
	/** secondary id of the table like order id */
	secID?: MongoDbObjectID;
	/** secondary id path of the table like order id path ('orders._id') */
	secPath?: string;
	/** path of the file(s) in table */
	pathInTable: string | { [x: string]: string };
	/** status of the file */
	status?: FileStatus;
	/** path where file will be uploaded */
	uploadPath: string;
	/** Note for the file */
	note?: string;
	/** label of the file */
	label?: L;
	/** Group Identifier of attachment */
	group?: string;
	/** Secondary Identifier of attachment */
	sec?: string;

	[x: string]: Array<File> | File | any;
};

// ---------------------------------------------------------------------------
// Template types
// ---------------------------------------------------------------------------

export type TemplateUserValue = {
	trigger: string;
	label: string;
	param: string;
	path: string;
	type?: FieldTypes;
	format?: string;
	description?: string;
};
