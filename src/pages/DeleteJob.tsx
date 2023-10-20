import { ActionFunction, redirect } from "react-router";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { AxiosError } from "axios";

export const action: ActionFunction = async ({ params: { id } }) => {
  try {
    await customFetch.delete(`/jobs/${id}`);
    toast.success("Job deleted successfully");
  } catch (error) {
    if (error instanceof AxiosError) toast.error(error.response?.data.message);
    else toast.error("Something went wrong");
  }
  return redirect("../all-jobs");
};
