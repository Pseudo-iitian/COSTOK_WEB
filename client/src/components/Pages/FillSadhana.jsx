import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  previous_night_sleep_time: Yup.string()
    .matches(
      /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
      "Invalid time format (HH:mm). Time must be between 00:00 and 23:59."
    )
    .required("Required"),
  morning_wakeup_time: Yup.string()
    .matches(
      /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
      "Invalid time format (HH:mm). Time must be between 00:00 and 23:59."
    )
    .required("Required"),
  target_chanting_end_time: Yup.string()
    .matches(
      /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
      "Invalid time format (HH:mm). Time must be between 00:00 and 23:59."
    )
    .required("Required"),
  chanting_rounds: Yup.number().min(0, "Must be positive").required("Required"),
  day_rest_duration: Yup.number().min(0, "Must be positive"),
  hearing_topic: Yup.string(),
  hearing_duration: Yup.number().min(0, "Must be positive"),
  reading_topic: Yup.string(),
  reading_duration: Yup.number().min(0, "Must be positive"),
  service_name: Yup.string(),
  service_duration: Yup.number().min(0, "Must be positive"),
  // .required("Required in minutes"),
  comment: Yup.string(),
});

const FillSadhana = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-krishna-blue-900 mb-6">
        Fill Sadhana
      </h1>
      <Formik
        initialValues={{
          previous_night_sleep_time: "",
          morning_wakeup_time: "",
          target_chanting_end_time: "",
          chanting_rounds: 0,
          day_rest_duration: 0,
          hearing_topic: "",
          hearing_duration: 0,
          reading_topic: "",
          reading_duration: 0,
          service_name: "",
          service_duration: 0,
          comment: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post(
              "http://localhost:3001/sadhna_report",
              values
            );
            console.log("API Response:", response.data);
            alert("Sadhana report submitted successfully!");
          } catch (error) {
            console.error("Error submitting sadhana report:", error);
            alert("Error submitting sadhana report. Please try again.");
          }
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            {[
              "previous_night_sleep_time",
              "morning_wakeup_time",
              "target_chanting_end_time",
            ].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {field
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </label>
                <Field
                  type="text"
                  name={field}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-krishna-blue-500 focus:border-krishna-blue-500"
                  placeholder="HH:mm"
                />
                <ErrorMessage
                  name={field}
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            ))}

            {[
              "chanting_rounds",
              "day_rest_duration",
              "hearing_duration",
              "reading_duration",
              "service_duration",
            ].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {field
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </label>
                <Field
                  type="number"
                  name={field}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-krishna-blue-500 focus:border-krishna-blue-500"
                />
                <ErrorMessage
                  name={field}
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            ))}

            {["hearing_topic", "reading_topic", "service_name"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {field
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </label>
                <Field
                  type="text"
                  name={field}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-krishna-blue-500 focus:border-krishna-blue-500"
                />
                <ErrorMessage
                  name={field}
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Comment
              </label>
              <Field
                as="textarea"
                name="comment"
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-krishna-blue-500 focus:border-krishna-blue-500"
              />
              <ErrorMessage
                name="comment"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-krishna-blue-900 hover:bg-krishna-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-krishna-blue-500 transition duration-150 ease-in-out"
            >
              {isSubmitting ? "Submitting..." : "Submit Sadhana Report"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FillSadhana;
