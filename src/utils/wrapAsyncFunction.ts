/** Функция-обертка для асинхронной функции, предназначенная для того, чтобы убирать ошибку eslint, сигнализирующую о том, что все асинхронные функции должны быть использованы с await. */
export function wrapAsyncFunction<ARGS extends unknown[]>(
    fn: (...args: ARGS) => Promise<unknown>
): (...args: ARGS) => void {
    return (...args) => {
        // eslint-disable-next-line no-void
        void fn(...args);
    };
}
