import { Form } from "@sikaeducation/ui";
import { ComponentPropsWithoutRef } from "react";

const newActivityFields: ComponentPropsWithoutRef<typeof Form>["fields"] = [
  {
    id: "title",
    label: "Title",
    controlType: "TextInput",
    required: true,
  },
  {
    id: "post_slug",
    label: "Slug",
    controlType: "TextInput",
    required: true,
  },
  {
    id: "description",
    label: "Description",
    controlType: "TextArea",
  },
  {
    id: "notes",
    label: "Notes",
    controlType: "TextArea",
  },
];

export default newActivityFields;
