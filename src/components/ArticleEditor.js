"use client";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
export default function ArticleEditor(props) {
  const editorRef = useRef(null);

  return (
    <div className="mx-10">
     
      <Editor
      className="my-10"
        id="2152530"
        ref={editorRef}
        apiKey={process.env.TINY_API_KEY}
        onChange={props.handleContent}
        onInit={(evt, editor) => {
          props?.callback && props?.callback();
        }}
        initialValue={props.content}
        init={{
          height: 500,
          plugins: [
            "codesample",
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
            "hr"
          ],
          menubar: "table format insert",
          toolbar:
            "codesample | image | undo redo | formatselect | anchor" +
            "bold italic backcolor forecolor styles addcomment | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | hr | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:20px }",
        }}
      />
    </div>
  );
}