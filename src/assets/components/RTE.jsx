import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
export default function RTE({ name, control, label, defaultValues }) {
  // control will pass its controls to whatever comp that call the RTE
  return (
    <div>
      {label && <label>{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValues}
            apiKey="xibd7q4i39qadmdcfszs0frwk9d5hcqa9m5x2k6amxmq4m02"
            init={{
              initialValue: { defaultValues },
              height: 300,
              menubar: true,

              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
