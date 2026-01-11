export const TYPES = {
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
  ISessionRepository: Symbol.for("ISessionRepository"),
  IDocsyDocumentRepository: Symbol.for("IDocsyDocumentRepository"),
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
  SendInvitationUseCase: Symbol.for("SendInvitationUseCase"),
  ReactToInvitationUseCase: Symbol.for("ReactToInvitationUseCase"),
  GetUserInvitationsUseCase: Symbol.for("GetUserInvitationsUseCase"),

  // Controllers
  AuthController: Symbol.for("AuthController"),
  ProfileController: Symbol.for("ProfileController"),
  DocumentController: Symbol.for("DocumentController"),
  InvitationController: Symbol.for("InvitationController"),
};
