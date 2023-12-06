declare class Stopwatch {
    constructor(name?: string | boolean, autostart?: boolean, delta?: number);

    start(): void;
    stop(): number | null;
    restart(): void;
    suspend(): number | null;
    resume(): void;
    split(): number | null;
    unsplit(): number | null;
    reset(): void;
    read(precision?: number, units?: 's' | 'ms'): number | null;
    toString(): string;
    prettyPrint(): void;

    static STATES: {
        INIT: string;
        RUNNING: string;
        STOPPED: string;
        SPLIT: string;
    };
}

export = Stopwatch;

