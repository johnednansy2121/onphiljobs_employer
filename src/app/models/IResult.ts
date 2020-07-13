export interface IResult<T> {
    Data : T
    Message: string
    Successful: boolean
}

export interface ISearchResult<T> {
    Items: T[]
    Message: string
    Successful: boolean
    TotalItems: number
    PageNum: number
    PageSize: number
}