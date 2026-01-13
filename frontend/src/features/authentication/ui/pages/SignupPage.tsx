import React, { useState } from "react";
import { PrimaryButton } from "../../../../common/components/buttons/PrimaryButton";
import { TextInputField } from "../../../../common/components/inputs/TextInputField";
import { PasswordInputField } from "../../../../common/components/inputs/PasswordInputField";
import type { SignupCredentials } from "../../data/types";
import { useAppDispatch, useAppSelector } from "../../../../app/app-hook";
import { signupUser } from "../../state/auth-thunk";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../../router";
import { ErrorText } from "../../../../common/components/texts/ErrorText";

export const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<SignupCredentials>({
    fullname: "",
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const { isSignupLoading, signupError } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(signupUser(formData));
    if (result.meta.requestStatus === "fulfilled") {
      navigate(AppRoutes.HOME);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href={AppRoutes.LOGIN}
              className="font-medium text-green-600 hover:text-green-500 transition-colors"
            >
              Login in
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <TextInputField
              label="Full Name"
              name="fullname"
              type="text"
              required
              placeholder="John Doe"
              value={formData.fullname}
              onChange={handleChange}
            />
            <TextInputField
              label="Email address"
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            <PasswordInputField
              label="Password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            <TextInputField
              label="Avatar URL (Optional)"
              name="avatarUrl"
              type="url"
              placeholder="https://example.com/avatar.jpg"
              value={formData.avatarUrl}
              onChange={handleChange}
            />
            <TextInputField
              label="About (Optional)"
              name="about"
              type="text"
              placeholder="Tell us a bit about yourself"
              value={formData.about}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center">
            {signupError && <ErrorText error={signupError.error.message} />}
          </div>

          <div>
            <PrimaryButton
              type="submit"
              className="w-full"
              isLoading={isSignupLoading}
            >
              Sign up
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};
