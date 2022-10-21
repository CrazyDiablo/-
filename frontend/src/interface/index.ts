export interface House {
    title: string;
    detailLink: string;
    room: string;
    size: number;
    roomNum: number;
    price: number;
    address: string;
    location: [number, number];
}

// TODO 完善
export type HttpMethod = 'GET' | 'POST'