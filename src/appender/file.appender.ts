import { Appender } from '../decorator/appender';
import { ILogEvent } from '../log.event';
import { LogAppender } from './log.appender';

export interface IFileAppenderConfig {
    destination: string;
}

@Appender()
export class FileAppender extends LogAppender<IFileAppenderConfig> {

    private static _logFile: NodeJS.WriteStream;

    private readonly _config: IFileAppenderConfig;

    /**
     * Gets the name of the appender (e.g. 'console')
     * @returns {null}
     */
    public static get appenderName(): string {
        return 'File';
    }

    constructor(config?: IFileAppenderConfig) {

        super(config);

        if (typeof window !== 'undefined') {
            throw new Error('Cannot use FileAppender in browser mode');
        } else if (!FileAppender._logFile) {

            this._config = config;

            const FS = 'fs';
            const fs = require(`${FS}`);
            if (!fs.exists(config.destination)) {
                fs.mkdirSync(config.destination);
            }

            FileAppender._logFile = fs.createWriteStream(config.destination, {flags: 'w'});

        }

    }

    /**
     * Appends the log event
     * @param {ILogEvent} logEvent
     */
    public append(logEvent: ILogEvent) {
        if (logEvent.level <= this.getLogLevel()) {
            this._appendToFile(logEvent);
        }
    }

    /**
     * @private
     * @function
     *
     * @param {ILogEvent} logEvent
     */
    private _appendToFile(logEvent: ILogEvent) {
        FileAppender._logFile.write(this.format(logEvent) + '\n');
    }

}
