import { Container } from "inversify";
import { TYPES } from "./types";

// Repositories
import { IUserRepository } from "../domain/repository/IUserRepository";
import { ISessionRepository } from "../domain/repository/ISessionRepository";
import { UserRepository } from "../infrastructure/repository/UserRepository";
import { SessionRepository } from "../infrastructure/repository/SessionRepository";

// UseCases
import { SignupUsecase } from "../application/usecases/auth/SignupUsecase";
import { LoginUsecase } from "../application/usecases/auth/LoginUsecase";
import { RefreshTokenUsecase } from "../application/usecases/auth/RefreshTokenUsecase";
import { UpdateProfileUsecase } from "../application/usecases/profile/UpdateProfileUsecase";
import { GetProfileByIdUsecase } from "../application/usecases/profile/GetProfileByIdUsecase";
import { DeleteProfileUsecase } from "../application/usecases/profile/DeleteProfileUsecase";

// Controllers
import { AuthController } from "../api/controller/AuthController";
import { ProfileController } from "../api/controller/ProfileController";

const container = new Container();

// Bind Repositories
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container
  .bind<ISessionRepository>(TYPES.ISessionRepository)
  .to(SessionRepository);

// Bind UseCases
container.bind<SignupUsecase>(TYPES.SignupUseCase).to(SignupUsecase);
container.bind<LoginUsecase>(TYPES.LoginUseCase).to(LoginUsecase);
container
  .bind<RefreshTokenUsecase>(TYPES.RefreshTokenUseCase)
  .to(RefreshTokenUsecase);
container
  .bind<UpdateProfileUsecase>(TYPES.UpdateProfileUseCase)
  .to(UpdateProfileUsecase);
container
  .bind<GetProfileByIdUsecase>(TYPES.GetProfileByIdUseCase)
  .to(GetProfileByIdUsecase);
container
  .bind<DeleteProfileUsecase>(TYPES.DeleteProfileUseCase)
  .to(DeleteProfileUsecase);

// Bind Controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container
  .bind<ProfileController>(TYPES.ProfileController)
  .to(ProfileController);

export { container };
