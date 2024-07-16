import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/ui/button/Button";
import FormGroup from "components/ui/formGroup/FormGroup";
import Input from "components/ui/input/Input";
import Label from "components/ui/label/Label";
import TextArea from "components/ui/textarea/TextArea";
import MainLayout from "layout/MainLayout";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { storage } from "../../firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { EPostType } from "types/enums";
import { createPost } from "api/postApi";
import { toast } from "react-toastify";


interface FormData {
  title: string;
  content?: string;
  images?: FileList;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string(),
  images: yup.mixed(),
});

const CreatePost: React.FC = () => {
  const [mode, setMode] = useState<EPostType>(EPostType.TEXT);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const {
    handleSubmit,
    control,
    register,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const watchedImages = watch("images") as FileList;

  useEffect(() => {
    if (watchedImages && watchedImages.length) {
      const fileArray = Array.from(watchedImages).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages(fileArray);
    }
  }, [watchedImages]);

  const uploadImageAndGetURL = async (imageFile: File): Promise<string> => {
    const storageRef = ref(storage, `images/${imageFile.name + Date.now()}`);
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };
  // const accessToken = useSelector(
  //   (state: RootState) => state.userReducer.userInfo.accessToken ?? ""
  // );

  const handleCreatePost: SubmitHandler<FormData> = async (data) => {
    if (data.images) {
      try {
        const imageFiles = Array.from(data.images);
        const uploadPromises = imageFiles.map(uploadImageAndGetURL);
        const imageUrl = await Promise.all(uploadPromises);
        const postData = {
          title: data.title,
          imageUrl: imageUrl[0], // Assuming you only need the first image URL
          postType: mode,
        };
        const response = await createPost(postData);
        handleResponse(response);
      } catch (error) {
        console.error("Error uploading images: ", error);
      }
    }

    if (data.content) {
      const postData = {
        title: data.title,
        content: data.content,
        postType: mode,
      };
      const response = await createPost(postData);
      handleResponse(response);
    }
  };
  
  function handleResponse(response: any) {
    if (response && response.data.status === "CREATED") {
      toast.success(response.data.message);
    } else if (response && response.data.error) {
      toast.error(response.data.error);
    } else {
      toast.error("An unexpected error occurred.");
    }
  }

  const toggleMode = (newMode: EPostType) => {
    setMode(newMode);
    if (newMode === EPostType.TEXT) {
      // If switching to TEXT mode, clear the images
      setSelectedImages([]);
      setValue("images", undefined); // Assuming you're using React Hook Form
    } else if (newMode === EPostType.IMAGE) {
      // If switching to IMAGE mode, clear the content
      setValue("content", ""); // Assuming you're using React Hook Form
    }
  };

  return (
    <MainLayout>
      <div className="w-full max-w-[556px] bg-white rounded-xl">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl ">Create post</h2>
          <div className="flex items-center gap-3">
            <span
              className={`${
                mode === EPostType.TEXT
                  ? "border-b-2 border-b-primary  cursor-pointer"
                  : "cursor-pointer"
              }`}
              onClick={() => toggleMode(EPostType.TEXT)}
            >
              Text
            </span>
            <span
              className={`${
                mode === EPostType.IMAGE
                  ? "border-b-2 border-b-primary cursor-pointer"
                  : "cursor-pointer"
              }`}
              onClick={() => toggleMode(EPostType.IMAGE)}
            >
              Image & Videos
            </span>
          </div>
          <div>
            <form onSubmit={handleSubmit(handleCreatePost)}>
              <FormGroup>
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  control={control}
                  name="title"
                  placeholder="Input your title here"
                  error={errors.title?.message}
                ></Input>
              </FormGroup>
              {mode === EPostType.TEXT && (
                <FormGroup>
                  <Label htmlFor="content">
                    Content <span className="text-red-500">*</span>
                  </Label>
                  <TextArea
                    control={control}
                    name="content"
                    placeholder="Input your content here"
                    error={errors.content?.message}
                  ></TextArea>
                </FormGroup>
              )}
              {mode === EPostType.IMAGE && (
                <FormGroup>
                  <Label>
                    Upload Images <span className="text-red-500">*</span>
                  </Label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    {...register("images")}
                  />
                  <div className="image-preview">
                    {selectedImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="Preview"
                        style={{ width: 100, height: 100 }}
                      />
                    ))}
                  </div>
                </FormGroup>
              )}
              <Button type="submit" className="w-full bg-primary">
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
                ) : (
                  "Create Post"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreatePost;
