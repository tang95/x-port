import {SortOrder} from "antd/lib/table/interface";

export const TableSortToApiSort = (sort: Record<string, SortOrder>): API.SortInput[] => {
    let inputs: API.SortInput[] = [];
    for (const key in sort) {
        inputs.push({
            field: key,
            direction: sort[key] == "descend" ? "DESC" : "ASC"
        })
    }
    return inputs;
}
