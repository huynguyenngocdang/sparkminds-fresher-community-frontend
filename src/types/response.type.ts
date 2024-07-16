export type TCommonResponse = {
    status: string;
    message: string;
    data: any;
    error: string | null;
}

export type TCommonPost = {
    totalElements: number;
    totalPages: number;
    size: number;
    content: Post[];
    number: number;
    sort: Sort;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    pageable: Pageable;
    empty: boolean;
};

export type TCommonPostResponse = {
    data: {
        message: string;
        status: string;
        data: TCommonPost;
        error: string | null;
    };
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: Record<string, any>;
    request: Record<string, any>;
};

export type Post = {
    id: number;
    title: string;
    content: string | null;
    imageUrl: string | null;
    author: string;
    totalLikes: number;
    createdDate: string;
    like: boolean;
    dislike: boolean;
    delete: boolean;
};

export type Sort = {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
};

export type Pageable = {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
};
