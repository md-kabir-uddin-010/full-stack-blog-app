import { Editor } from "@tinymce/tinymce-react";
import React from "react";

export default function RiceTextEditor({
  editorState,
  onEditorChange,
  textareaName,
  initialValue,
}) {
  return (
    <div>
      <Editor
        textareaName={textareaName}
        initialValue={initialValue}
        value={editorState}
        onEditorChange={onEditorChange}
        init={{
          height: 500,
          menubar: true,
          plugins:
            "anchor preview autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect code",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat code preview",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
}
