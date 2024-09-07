
interface BleetType {
    id: number;
    name: string;
    handle: string;
    avatar: string;
    verified: boolean;
    time: string;
    content: string;
    image: string | null;
    comments: number;
    retweets: number;
    likes: number;
    views: number;
    ad: boolean;
}
  
  
export interface BleetProps {
    bleet: BleetType;
}