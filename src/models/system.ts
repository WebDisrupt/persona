
import { personaSeed } from './persona-root';

export interface systemData {
    previous: personaSeed,
    recentList? : Array<personaSeed>
}
