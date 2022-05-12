export class Movie
{
    public id: number|null
    public title: string
    public duration: number

    constructor(
        title: string,
        duration: number,
        id?: number
    ) {
        this.id = id || null
        this.title = title
        this.duration = duration
    }
}
