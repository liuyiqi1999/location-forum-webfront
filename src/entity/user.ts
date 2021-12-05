export interface INotice {
  id: number;
  postId: number;
  blockId: number;
  ownerId: number;
  isRead: number;
  respondent: string;
  postTitle: string;
}
