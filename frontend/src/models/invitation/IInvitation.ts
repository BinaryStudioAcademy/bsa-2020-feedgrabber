export interface IInvitation {
  email: string;
  createdAt: string;
  isDeleting?: boolean;
  accepted: boolean;
}
