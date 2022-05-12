import { commonRepository, CommonRepository } from "./CommonRepository";

export abstract class BaseRepository
{
    protected table: string
    protected repository: CommonRepository

    constructor(
        table: string,
        repository: CommonRepository = commonRepository
    ) {
        this.table = table
        this.repository = repository
    }
}
