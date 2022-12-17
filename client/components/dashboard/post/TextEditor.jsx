import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ErrorMessage, Field } from "formik";

export default function TextEditor({ name, label }) {
  const editorRef = useRef(null);

  return (
    <div className=" mt-10 relative">
      <label className=" capitalize py-3 text-gray-500" htmlFor={name}>
        {label}
      </label>
      <Field name={name} id={name}>
        {({ field, form }) => (
          <div>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              textareaName={name}
              value={field.value}
              onEditorChange={(stringifiedHtmlValue) => {
                form.setFieldValue(name, stringifiedHtmlValue);
              }}
              onBlur={field.onBlur}
              init={{
                height: 500,
                menubar: true,
                font_size_formats:
                  "8pt 9pt 10pt 11pt 12pt 14pt 15pt 16pt 17pt 18pt 20pt 22pt 24pt 26pt 28pt 30pt 32pt 36pt 48pt 60pt 72pt 96pt",
                plugins:
                  "anchor preview autolink charmap codesample emoticons image link lists pageembed media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter  linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage  tableofcontents footnotes casechange mergetags autocorrect code",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image pageembed  media table mergetags | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat casechange code preview",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
              }}
            />
          </div>
        )}
      </Field>

      <ErrorMessage name={name}>
        {(errorMess) => <p className=" text-red-400">{errorMess}</p>}
      </ErrorMessage>
    </div>
  );
}
