import { ActionFunction, redirect } from "react-router";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action: ActionFunction = async ({ params: { id } }) => {
  try {
    await customFetch.delete(`/jobs/${id}`);
    toast.success("Job deleted successfully");
  } catch (error) {
    toast.error((error as any)?.response?.data?.message);
  }
  return redirect("../all-jobs");
};
