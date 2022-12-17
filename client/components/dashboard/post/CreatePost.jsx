import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import Textarea from "./Textarea";
import TextEditor from "./TextEditor";
import Checkbox from "./Checkbox";
import Options from "./Options";
import { createPost } from "../../../redux/features/post/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function CreateNewPost() {
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const { error, loading, success, message } = useSelector(
    (state) => state.post
  );
  const initialValues = {
    title: "",
    slug: "",
    keyword: "",
    description: "",
    schema: "",
    category: "entertainment",
    thumbnail: "",
    post: "",
    post_description: "",
    open_graph: {
      type: "article",
      title: "",
      site_name: "",
      site_url: "",
      description: "",
      image: "",
    },
    twitter_card: {
      card: "summary",
      title: "",
      site: "",
      description: "",
      image: "",
    },
    publish: false,
  };

  const handleSubmit = (values) => {
    const {
      title,
      slug,
      keyword,
      description,
      thumbnail,
      category,
      schema,
      post,
      post_description,
      open_graph,
      twitter_card,
      publish,
    } = values;
    if (schema !== "") {
      dispatch(
        createPost({
          title,
          slug,
          keyword,
          description,
          thumbnail,
          category,
          schema,
          post,
          post_description,
          open_graph,
          twitter_card,
          publish,
        })
      );
    } else {
      dispatch(
        createPost({
          title,
          slug,
          keyword,
          description,
          thumbnail,
          category,
          post,
          post_description,
          open_graph,
          twitter_card,
          publish,
        })
      );
    }
    setIsSubmit(true);
  };

  const errorMessage = (text) => toast.error(text, { toastId: "error1" });
  const successMessage = (text) => toast.success(text, { toastId: "succes1" });

  useEffect(() => {
    if (error && isSubmit) {
      errorMessage(error);
    }
    if (success && message && isSubmit) {
      successMessage(message);
    }
  }, [error, success, message, isSubmit]);

  const validationSchema = Yup.object({
    title: Yup.string().min(10).max(65).required("title is required"),
    slug: Yup.string()
      .trim()
      .matches(/^[a-z0-9-]+$/, {
        message: "Only lowercase letters, numbers, and hypen (-) are allowed",
        excludeEmptyString: false,
      })
      .min(10)
      .max(200)
      .required("slug is required"),
    keyword: Yup.string().min(10).max(200).required("keyword is required"),
    description: Yup.string()
      .min(20)
      .max(200)
      .required("description is required"),
    schema: Yup.string().min(10).max(2000),
    category: Yup.string().required(),
    thumbnail: Yup.string()
      .max(500, "thumbnail must be at most 500 characters")
      .matches(
        /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi,
        {
          message: " thumbnail must be a valid url",
          excludeEmptyString: false,
        }
      )
      .required("thumbnail is required"),
    post: Yup.string()
      .min(10, "post must be at least 10 characters")
      .max(100000, "post must be at most 100000 characters")
      .required("post is required"),
    post_description: Yup.string()
      .min(10, "post description must be at least 10 characters")
      .max(200, "post description must be at most 200 characters")
      .required("post description is required"),
    open_graph: Yup.object().shape({
      type: Yup.string(),
      title: Yup.string()
        .min(10, "title must be at least 10 characters")
        .max(65, "title must be at most 65 characters"),
      site_name: Yup.string()
        .min(2, "site name must be at least 2 characters")
        .max(65, "site name must be at most 65 characters"),
      site_url: Yup.string()
        .trim()
        .max(500, "site url must be at most 500 characters")
        .matches(
          /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi,
          {
            message: "invalid site url",
            excludeEmptyString: false,
          }
        ),
      description: Yup.string()
        .min(20, "description must be at least 20 characters")
        .max(200, "description must be at most 200 characters"),
      image: Yup.string()
        .trim()
        .max(500, "image url must be at most 500 characters")
        .matches(
          /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi,
          {
            message: "invalid site url",
            excludeEmptyString: false,
          }
        ),
    }),
    twitter_card: Yup.object().shape({
      card: Yup.string(),
      title: Yup.string()
        .min(10, "title must be at least 10 characters")
        .max(65, "title must be at most 65 characters"),
      site: Yup.string()
        .trim()
        .max(200, "site username must be at most 200 characters")
        .matches(/@[a-zA-z0-9]/g, {
          message: "username must be start with @ like @xyz",
          excludeEmptyString: false,
        }),
      description: Yup.string()
        .min(20, "description must be at least 20 characters")
        .max(200, "description must be at most 200 characters"),
      image: Yup.string()
        .trim()
        .max(500, "image url must be at most 500 characters")
        .matches(
          /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi,
          {
            message: "invalid site url",
            excludeEmptyString: false,
          }
        ),
    }),
    publish: Yup.boolean(),
  });

  const ogType = [
    { value: "article", label: "Article" },
    { value: "book", label: "Book" },
    { value: "books.author", label: "Book Author" },
    { value: "books.genre", label: "Book Genre" },
    { value: "business.business", label: "Business" },
    { value: "fitness.course", label: "Fitness Course" },
    { value: "music.album", label: "Music Album" },
    { value: "music.musician", label: "Music Musician" },
    { value: "music.playlist", label: "Music Playlist" },
    { value: "music.radio_station", label: "Music Radio Station" },
    { value: "music.song", label: "Music Song" },
    { value: "object", label: "Object (Generic Object)" },
    { value: "place", label: "Place" },
    { value: "product", label: "Product" },
    { value: "product.group", label: "Product Group" },
    { value: "product.item", label: "Product Item" },
    { value: "profile", label: "Profile" },
    { value: "quick_election.election", label: "Election" },
    { value: "restaurant", label: "Restaurant" },
    { value: "restaurant.menu", label: "Restaurant Menu" },
    { value: "restaurant.menu_item", label: "Restaurant Menu Item" },
    { value: "restaurant.menu_section", label: "Restaurant Menu Section" },
    { value: "video.episode", label: "Video Episode" },
    { value: "video.movie", label: "Video Movie" },
    { value: "video.tv_show", label: "Video TV Show" },
    { value: "video.other", label: "Video Other" },
    { value: "website", label: "Website" },
  ];
  const categoryType = [
    { value: "entertainment", label: "Entertainment" },
    { value: "technology", label: "Technology" },
    { value: "food", label: "Food" },
    { value: "health", label: "Health" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "fashion", label: "Fashion" },
    { value: "travel", label: "Travel" },
    { value: "photography", label: "Photography" },
    { value: "sports", label: "Sports" },
    { value: "news", label: "News" },
  ];
  const twitterCardType = [
    { value: "summary", label: "summary" },
    { value: "summary_large_image", label: "summary with large image" },
  ];

  return (
    <div>
      <ToastContainer limit={1} autoClose={4000} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className=" grid grid-cols-2 gap-x-6 xl:grid-cols-1">
            <Input type={"text"} name={"title"} label={"title"} />
            <Input type={"text"} name={"slug"} label={"slug"} />
            <Textarea name={"keyword"} label={"keyword"} />
            <Textarea name={"description"} label={"description"} />
          </div>
          <div className="">
            <Textarea name={"schema"} label={"schema"} />
            <Options
              name={"category"}
              label={"category"}
              selectlables={categoryType}
              selectValues={categoryType}
            />
          </div>
          <Input type={"text"} name={"thumbnail"} label={"thumbnail (url)"} />
          <Textarea name={"post_description"} label={"post description"} />
          <TextEditor name={"post"} label={"post"} />
          {/* open graph */}
          <div className=" mt-20">
            <h2 className=" uppercase text-center text-gray-800 font-bold text-xl">
              open graph
            </h2>
            <Options
              name={"open_graph.type"}
              label={"type"}
              selectlables={ogType}
              selectValues={ogType}
            />
            <div className=" grid grid-cols-2 gap-x-11  xl:grid-cols-1">
              <Input
                type={"text"}
                name={"open_graph.title"}
                label={"site title"}
              />
              <Input
                type={"text"}
                name={"open_graph.site_name"}
                label={"site name"}
              />
              <Input
                type={"text"}
                name={"open_graph.site_url"}
                label={"site url"}
              />
              <Input
                type={"text"}
                name={"open_graph.image"}
                label={"image url"}
              />
            </div>
            <Textarea name={"open_graph.description"} label={"description"} />
          </div>
          {/* open graph */}
          {/* twitter_card  */}
          <div className=" mt-20">
            <h2 className=" uppercase text-center text-gray-800 font-bold text-xl">
              twitter card
            </h2>
            <div className=" grid grid-cols-2 gap-x-11  xl:grid-cols-1">
              <Options
                name={"twitter_card.card"}
                label={"type"}
                selectValues={twitterCardType}
              />
              <Input
                type={"text"}
                name={"twitter_card.title"}
                label={"title"}
              />
              <Input
                type={"text"}
                name={"twitter_card.site"}
                label={"Site Username (@username of Website)"}
              />
              <Input
                type={"text"}
                name={"twitter_card.image"}
                label={"image url"}
              />
            </div>
            <Textarea name={"twitter_card.description"} label={"description"} />
          </div>
          {/* twitter_card  */}
          <div className=" mt-10 flex items-center justify-between">
            <Checkbox type={"checkbox"} name={"publish"} label={"publish"} />
            <button
              className={`${
                loading ? "cursor-not-allowed" : ""
              } cursor-pointer text-base font-medium text-white capitalize py-2 px-5 hover:bg-[#1559ED] bg-[#1877F2] rounded-md break-all`}
              type="submit"
              disabled={loading ? true : false}
            >
              {loading ? "loading..." : "save"}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
