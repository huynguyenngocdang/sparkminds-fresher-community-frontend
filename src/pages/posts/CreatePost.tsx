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
import { storage } from '../../firebase/firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


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
  const [mode, setMode] = useState<"text" | "image" | "link">("text");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const {
    handleSubmit,
    control,
    register,
    watch,
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
  
  const handleCreatePost: SubmitHandler<FormData> = async (data) => {
      console.log(data);
      if (data.images) {
        try {  
            const imageFiles = Array.from(data.images);
            const uploadPromises = imageFiles.map(uploadImageAndGetURL);
            const imageUrls = await Promise.all(uploadPromises);          
            console.log("🚀 ~ consthandleCreatePost:SubmitHandler<FormData>= ~ imageUrls:", imageUrls)
          } catch (error) {
            console.error("Error uploading images: ", error);
          }
      }
  };

  const toggleMode = (newMode: "text" | "image") => {
    setMode(newMode);
  };


  return (
    <MainLayout>
      <div className="w-full max-w-[556px] bg-white rounded-xl">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl ">Create post</h2>
          <div className="flex items-center gap-3">
            <span
              className={`${
                mode === "text"
                  ? "border-b-2 border-b-primary  cursor-pointer"
                  : "cursor-pointer"
              }`}
              onClick={() => toggleMode("text")}
            >
              Text
            </span>
            <span
              className={`${
                mode === "image"
                  ? "border-b-2 border-b-primary cursor-pointer"
                  : "cursor-pointer"
              }`}
              onClick={() => toggleMode("image")}
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
              {mode === "text" && (
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
              {mode === "image" && (
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
