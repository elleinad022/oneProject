import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useUpdateProfilePictureMutation,
  useDeleteProfilePictureMutation,
} from "../slices/usersApiSlice";

const ProfilePictureUpdate = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const [updateProfilePicture, { isLoading: isUpdatingPicture }] =
    useUpdateProfilePictureMutation();

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
    console.log("Uploading file:", selectedFile);

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    await updateProfilePicture(formData);
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
              ? `http://localhost:4000${userInfo.profilePicture}`
              : "/default-avatar.png")
          }
          alt="Profile"
          className="size-24 rounded-full object-cover border"
        />
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input file-input-bordered w-full max-w-xs"
      />

      <button className="btn btn-primary mt-2" onClick={handleUploadButton}>
        Upload
      </button>
    </div>
  );
};

export default ProfilePictureUpdate;
