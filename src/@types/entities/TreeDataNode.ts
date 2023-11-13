
export interface DataNode {
    title: string;
    key: string;
    children?: DataNode[];
    isLeaf?: boolean;
    isFile?: boolean;
    fileData?: File;
    id: number;
    document_id?: string;
    type?: string;
}
