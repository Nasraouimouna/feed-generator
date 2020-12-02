export interface IArticle{
    title:string;
    description:string;
    content:string;
    cover:any;
    author:any;
    isFeatured: boolean;
    createdAt?: string;
    updatedAt?: string;
}