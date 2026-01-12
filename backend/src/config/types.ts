export const TYPES = {
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
  ISessionRepository: Symbol.for("ISessionRepository"),
  IDocumentRepository: Symbol.for("IDocumentRepository"),
  IInvitationRepository: Symbol.for("IInvitationRepository"),
  ICollaborationRepository: Symbol.for("ICollaborationRepository"),

  // UseCases
  SignupUseCase: Symbol.for("SignupUseCase"),
  LoginUseCase: Symbol.for("LoginUseCase"),
  RefreshTokenUseCase: Symbol.for("RefreshTokenUseCase"),
  GetProfileByIdUseCase: Symbol.for("GetProfileByIdUseCase"),
  UpdateProfileUseCase: Symbol.for("UpdateProfileUseCase"),
  DeleteProfileUseCase: Symbol.for("DeleteProfileUseCase"),
  CreateDocumentUseCase: Symbol.for("CreateDocumentUseCase"),
  GetDocumentUseCase: Symbol.for("GetDocumentUseCase"),
  UpdateDocumentUseCase: Symbol.for("UpdateDocumentUseCase"),
  DeleteDocumentUseCase: Symbol.for("DeleteDocumentUseCase"),
  GetUserDocumentsUseCase: Symbol.for("GetUserDocumentsUseCase"),
  TransferDocumentOwnershipUseCase: Symbol.for(
    "TransferDocumentOwnershipUseCase"
  ),
  SendInvitationUseCase: Symbol.for("SendInvitationUseCase"),
  ReactToInvitationUseCase: Symbol.for("ReactToInvitationUseCase"),
  GetUserInvitationsUseCase: Symbol.for("GetUserInvitationsUseCase"),
  CreateCollaborationUseCase: Symbol.for("CreateCollaborationUseCase"),
  GetDocumentCollaborationsUseCase: Symbol.for(
    "GetDocumentCollaborationsUseCase"
  ),
  UpdateCollaborationUseCase: Symbol.for("UpdateCollaborationUseCase"),
  DeleteCollaborationUseCase: Symbol.for("DeleteCollaborationUseCase"),

  // Controllers
  AuthController: Symbol.for("AuthController"),
  ProfileController: Symbol.for("ProfileController"),
  DocumentController: Symbol.for("DocumentController"),
  CollaborationController: Symbol.for("CollaborationController"),
  InvitationController: Symbol.for("InvitationController"),
};
