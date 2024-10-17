// import { z as zod } from "zod";

// const createUser = zod.object({
//   body: zod
//     .object({
//       title: zod.string({
//         required_error: "user title is required",
//         invalid_type_error: "user title must be a string",
//       }),
//       coverImage: zod.object({
//         image: zod.object({
//           size: zod.string({
//             invalid_type_error: "image size must be a string",
//           }),
//           name: zod.string({
//             invalid_type_error: "image name must be a string",
//           }),
//           type: zod.string({
//             invalid_type_error: "image type must be a string",
//           }),
//           url: zod.string({
//             invalid_type_error: "image url must be a string",
//           }),
//           id: zod.string({
//             invalid_type_error: "image id must be a string",
//           }),
//         }),
//         caption: zod.string({
//           invalid_type_error: "caption must be a string",
//         }),
//       }),
//       introduction: zod.string({
//         required_error: "user introduction is required",
//         invalid_type_error: "user introdustion must be a string",
//       }),
//       isActive: zod.boolean(),
//       readTime: zod.number().optional(),
//       readCount: zod.number().optional(),
//     })
//     .strict(),
// });

// export const UserValidationSchema = {
//   createUser,
// };
