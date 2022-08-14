export type Post = {
    __v: number;
    _id: string;
    createdAt: Date;
    options: Option[];
    tags: string[];
    title: string;
    type: string;
    uid: string;
    votes: Vote[];
}

export type Option = { 
    imageUrl: string | null; 
    caption: string | null;
}

export type Vote = {
    uid: string;
    selectedIndex: number;
    _id: string;
    createdAt: Date;
}