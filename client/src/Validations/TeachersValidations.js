import * as yup from "yup";

export const TeacherSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  name: yup.string().required("Name is required"),
  subject: yup.string().required("Subject is required"),
  imageUrl: yup.string().url("Invalid URL").notRequired(),
  phoneNumber: yup.string().required("Phone number is required"),
 coursePrice: yup.number().required("Course price is required"),

});
