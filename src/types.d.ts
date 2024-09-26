export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			HOST: string | undefined;
			PORT: number | undefined;
		}
	}
}
