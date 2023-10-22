import { ActionFunction, Form } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, SubmitButton } from "../components";
import { useDashboardContext } from "../context/dashboard";
import customFetch from "../utils/customFetch";
import { AxiosError } from "axios";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const file = formData.get("avatar");
  if (file && file instanceof File && file.size > 500000)
    return toast.error("Image size is too large");
  try {
    await customFetch.patch("/users/update-user", formData);
    toast.success("Profile updated successfully");
  } catch (error) {
    if (error instanceof AxiosError) toast.error(error.response?.data.message);
    else toast.error("Something went wrong");
  }
  return null;
};

const Profile: React.FC = () => {
  const { user } = useDashboardContext();
  return (
    <Wrapper>
      <Form method="POST" className="form" encType="multipart/form-data">
        <h4 className="form-title">Profile</h4>
        <div className="form-center">
          <FormRow
            type="file"
            name="avatar"
            label="select an image file (Max 0.5 MB):"
            accept="image/*"
          />
          <FormRow name="name" defaultValue={user.name} />
          <FormRow
            name="lastName"
            label="last name"
            defaultValue={user.lastName}
          />
          <FormRow type="email" name="email" defaultValue={user.email} />
          <FormRow name="location" defaultValue={user.location} />
          <SubmitButton text="Save changes" loadingText="Saving..." formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
