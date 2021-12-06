export interface IQuestion {
  id: number;
  title: String;
  content: Content;
  longitude: number;
  latitude: number;
  city: String;
  district: String;
  province: String;
  street: String;
  createTime: Date;
  isDeleted: number;
  viewTime: number;
  tags: Tag[];
  ownerName: number;
  address: String;
}
interface Content {
  id: number;
  content: String;
}
interface Tag {
  id: 1;
  name: 'test';
}

export interface IAnswer {
  id: number;
  postId: number;
  content: String;
  longitude: number;
  latitude: number;
  city: String;
  district: String;
  province: String;
  street: String;
  createTime: String;
  isDeleted: number;
  replySet: Comment[];
  ownerName: String;
  address?: String;
}

interface Comment {
  id: number;
  postId: number;
  blockId: number;
  content: String;
  createTime: String;
  longitude: number;
  latitude: number;
  city: String;
  district: String;
  province: String;
  street: String;
  isDeleted: number;
  ownerName: String;
  address?: String;
}
