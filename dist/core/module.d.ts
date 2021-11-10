import { moduleOptions } from '../models/module';
export declare class BaseModule {
    protected path: string;
    protected appName: string;
    protected personaId: string;
    protected key: string;
    /**
     * Constructor - Used to assign core data
     * @param options
     */
    constructor(options?: moduleOptions);
}
