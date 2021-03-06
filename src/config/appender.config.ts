import { LogAppender, LogFilter, Newable } from '..';
import { IFilterConfiguration } from './filter.configuration';

export default interface IAppenderConfiguration<C = any, T extends LogAppender<C> = LogAppender<C>> {

    name?: string;
    appender: Newable<T> | string;
    config?: any;
    filters?: Array<IFilterConfiguration<any, LogFilter<any>>>;
    layout?: string;

}
