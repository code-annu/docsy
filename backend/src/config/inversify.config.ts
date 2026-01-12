import { Container } from "inversify";
import { TYPES } from "./types";

// Repositories
import { IUserRepository } from "../domain/repository/IUserRepository";
import { ISessionRepository } from "../domain/repository/ISessionRepository";
import { IDocumentRepository } from "../domain/repository/IDocumentRepository";
import { ICollaborationRepository } from "../domain/repository/ICollaborationRepository";
import { UserRepository } from "../infrastructure/repository/UserRepository";
import { SessionRepository } from "../infrastructure/repository/SessionRepository";
import { DocumentRepository } from "../infrastructure/repository/DocumentRepository";
import { CollaborationRepository } from "../infrastructure/repository/CollaborationRepository";

// UseCases - Auth
import { SignupUsecase } from "../application/usecases/auth/SignupUsecase";
import { LoginUsecase } from "../application/usecases/auth/LoginUsecase";
import { RefreshTokenUsecase } from "../application/usecases/auth/RefreshTokenUsecase";

// UseCases - Profile
import { UpdateProfileUsecase } from "../application/usecases/profile/UpdateProfileUsecase";
import { GetProfileByIdUsecase } from "../application/usecases/profile/GetProfileByIdUsecase";
import { DeleteProfileUsecase } from "../application/usecases/profile/DeleteProfileUsecase";

// UseCases - Document
import { CreateDocumentUsecase } from "../application/usecases/document/CreateDocumentUsecase";
import { GetDocumentUsecase } from "../application/usecases/document/GetDocumentUsecase";
import { UpdateDocumentUsecase } from "../application/usecases/document/UpdateDocumentUsecase";
import { DeleteDocumentUsecase } from "../application/usecases/document/DeleteDocumentUsecase";
import { GetUserDocumentsUsecase } from "../application/usecases/document/GetUserDocumentsUsecase";
import { TransferDocumentOwnershipUsecase } from "../application/usecases/document/TransferDocumentOwnershipUsecase";

// UseCases - Collaboration
import { CreateCollaborationUsecase } from "../application/usecases/collaboration/CreateCollaborationUsecase";
import { GetDocumentCollaborationsUsecase } from "../application/usecases/collaboration/GetDocumentCollaborationsUsecase";
import { UpdateCollaborationUsecase } from "../application/usecases/collaboration/UpdateCollaborationUsecase";
import { DeleteCollaborationUsecase } from "../application/usecases/collaboration/DeleteCollaborationUsecase";

// Controllers
import { AuthController } from "../api/controller/AuthController";
import { ProfileController } from "../api/controller/ProfileController";
import { DocumentController } from "../api/controller/DocumentController";
import { CollaborationController } from "../api/controller/CollaborationController";

const container = new Container();

// Bind Repositories
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container
  .bind<ISessionRepository>(TYPES.ISessionRepository)
  .to(SessionRepository);
container
  .bind<IDocumentRepository>(TYPES.IDocumentRepository)
  .to(DocumentRepository);
container
  .bind<ICollaborationRepository>(TYPES.ICollaborationRepository)
  .to(CollaborationRepository);

// Bind UseCases - Auth
container.bind<SignupUsecase>(TYPES.SignupUseCase).to(SignupUsecase);
container.bind<LoginUsecase>(TYPES.LoginUseCase).to(LoginUsecase);
container
  .bind<RefreshTokenUsecase>(TYPES.RefreshTokenUseCase)
  .to(RefreshTokenUsecase);

// Bind UseCases - Profile
container
  .bind<UpdateProfileUsecase>(TYPES.UpdateProfileUseCase)
  .to(UpdateProfileUsecase);
container
  .bind<GetProfileByIdUsecase>(TYPES.GetProfileByIdUseCase)
  .to(GetProfileByIdUsecase);
container
  .bind<DeleteProfileUsecase>(TYPES.DeleteProfileUseCase)
  .to(DeleteProfileUsecase);

// Bind UseCases - Document
container
  .bind<CreateDocumentUsecase>(TYPES.CreateDocumentUseCase)
  .to(CreateDocumentUsecase);
container
  .bind<GetDocumentUsecase>(TYPES.GetDocumentUseCase)
  .to(GetDocumentUsecase);
container
  .bind<UpdateDocumentUsecase>(TYPES.UpdateDocumentUseCase)
  .to(UpdateDocumentUsecase);
container
  .bind<DeleteDocumentUsecase>(TYPES.DeleteDocumentUseCase)
  .to(DeleteDocumentUsecase);
container
  .bind<GetUserDocumentsUsecase>(TYPES.GetUserDocumentsUseCase)
  .to(GetUserDocumentsUsecase);
container
  .bind<TransferDocumentOwnershipUsecase>(
    TYPES.TransferDocumentOwnershipUseCase
  )
  .to(TransferDocumentOwnershipUsecase);

// Bind UseCases - Collaboration
container
  .bind<CreateCollaborationUsecase>(TYPES.CreateCollaborationUseCase)
  .to(CreateCollaborationUsecase);
container
  .bind<GetDocumentCollaborationsUsecase>(
    TYPES.GetDocumentCollaborationsUseCase
  )
  .to(GetDocumentCollaborationsUsecase);
container
  .bind<UpdateCollaborationUsecase>(TYPES.UpdateCollaborationUseCase)
  .to(UpdateCollaborationUsecase);
container
  .bind<DeleteCollaborationUsecase>(TYPES.DeleteCollaborationUseCase)
  .to(DeleteCollaborationUsecase);

// Bind Controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container
  .bind<ProfileController>(TYPES.ProfileController)
  .to(ProfileController);
container
  .bind<DocumentController>(TYPES.DocumentController)
  .to(DocumentController);
container
  .bind<CollaborationController>(TYPES.CollaborationController)
  .to(CollaborationController);

export { container };
