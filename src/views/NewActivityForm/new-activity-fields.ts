import Checkbox from "../../components/ui/Checkbox";
import TextArea from "../../components/ui/TextArea";
import TextInput from "../../components/ui/TextInput";

export default [
  {
    id: "title",
    label: "Title",
    Component: TextInput,
    required: true,
  },
  {
    id: "post_slug",
    label: "Slug",
    Component: TextInput,
    required: true,
  },
  {
    id: "description",
    label: "Description",
    Component: TextArea,
  },
  {
    id: "notes",
    label: "Notes",
    Component: TextArea,
  },
];
