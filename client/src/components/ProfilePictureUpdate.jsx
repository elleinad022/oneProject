import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  useUpdateProfilePictureMutation,
  useDeleteProfilePictureMutation,
  useLazyGetUserDataQuery,
} from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const ProfilePictureUpdate = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const pictureRemoveRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [updateProfilePicture, { isLoading: isUpdatingPicture }] =
    useUpdateProfilePictureMutation();
  const [deleteProfilePicture, { isLoading: isDeletingPicture }] =
    useDeleteProfilePictureMutation();
  const [getUser] = useLazyGetUserDataQuery();

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("File not found");
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUploadButton = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);
    try {
      await updateProfilePicture(formData).unwrap();

      const updatedUser = await getUser().unwrap();
      dispatch(setCredentials({ ...updatedUser.userData }));

      toast.success("Profile picture updated");
      setSelectedFile(null);
      setPreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleDeleteButton = async () => {
    try {
      await deleteProfilePicture().unwrap();

      const updatedUser = await getUser().unwrap();
      dispatch(setCredentials({ ...updatedUser.userData }));

      toast.success("Current profile picture removed successfully");
      setSelectedFile(null);
      setPreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div className="border border-base-300 rounded-box p-4 flex flex-col gap-4 mt-6">
      <h2 className="text-lg font-semibold text-primary">Profile Picture</h2>

      {/* Current Profile Pic */}
      <div className="flex flex-col items-center gap-2">
        <img
          src={
            preview ||
            (userInfo.profilePicture
              ? `${API_BASE_URL.replace(/\/$/, "")}${userInfo.profilePicture}`
              : "/defAvatar.jpg")
          }
          alt="Profile"
          className="size-24 rounded-full object-cover border"
        />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input file-input-bordered w-full max-w-xs"
      />

      <div className="flex flex-col">
        <button
          className="btn btn-primary mt-2"
          onClick={handleUploadButton}
          disabled={isUpdatingPicture}>
          {isUpdatingPicture ? "Uploading..." : "Upload"}
        </button>

        <button
          className="btn btn-error btn-soft mt-2"
          onClick={() => pictureRemoveRef.current.showModal()}
          disabled={isDeletingPicture}>
          {isDeletingPicture ? "Removing..." : "Remove"}
        </button>
      </div>
      <dialog ref={pictureRemoveRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete profile picture</h3>
          <p className="py-4 text-sm opacity-60">
            Are you sure you want to delete current profile picture? You cannot
            undo this action
          </p>
          <div className="flex gap-4">
            <button
              className="btn btn-soft btn-error"
              onClick={() => {
                handleDeleteButton();
                pictureRemoveRef.current.close();
              }}>
              Delete
            </button>
            <button
              className="btn btn-soft"
              onClick={() => pictureRemoveRef.current.close()}>
              Cancel
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ProfilePictureUpdate;
