import { moduleOptions } from '../models/module';

export class BaseModule {

    protected path: string = null;
    protected appName: string = null;
    protected personaId: string = null;
    protected key: string = null;

    /**
     * Constructor - Used to assign core data
     * @param options 
     */
    public constructor(options:moduleOptions = null){
        this.path = options.path;
        this.appName = options.appName;
        this.personaId = options.personaId;
        this.key = options.key;
    }

}