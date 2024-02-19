import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, SSelect, RTE } from "../../index";
import appwriteService from "../../../appwrite/db_Service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const navigate = useNavigate();
  // watch continously  monitor any field,setValue will set the value of the form//
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        post: post?.post || "",
        status: post?.status || "active",
      },
    });
  const userData = useSelector((state) => state.auth.userData);
  const submit = async (data) => {
    console.log(data);
    if (post) {
      console.log(post);
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/posts/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          user: userData.$id,
        });
        console.log(dbPost, "user id edited");
        if (dbPost) {
          navigate(`/posts/${dbPost.$id}`);
        }
      }
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value.trim().toLowerCase().replace(/\s/g, "-");
    return "";
  }, []);
  useEffect(() => {
    const sub = watch((value, { name }) => {
      if (name === "title")
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
    });
    return () => {
      sub.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)} className="post-form">
      <div className="px-2">
        <Input
          name="Title"
          label="Title"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.target.value), {
              shouldValidate: true,
            })
          }
        />
        <RTE
          label="Post:"
          name="post"
          control={control}
          defaultValues={getValues("post")}
        />
      </div>
      <div className=" px-2">
        <Input
          label="Featured Image"
          className="mb-4"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className=" mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <SSelect
          options={["active", "inactive"]}
          label="Status"
          className="status-style"
          {...register("status", {
            required: true,
          })}
        />
        <Button className={"round-btn cta-btn"} type="submit">
          {post ? "UPDATE" : "POST"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
