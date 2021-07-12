export interface profile {
    avatar?: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
    email?: string,
    age?: Date,
    gender?: string,
    attributes?:Array<profileAttribute>
}

export interface profileAttribute {
    key: string,
    value: string,
}