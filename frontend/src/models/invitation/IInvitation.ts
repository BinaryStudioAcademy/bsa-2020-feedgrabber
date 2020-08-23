export interface IInvitation {
  email: string;
  createdAt: string;
  isDeleting?: boolean;
  isResending?: boolean;
  accepted: boolean;
  expired: boolean;
}
