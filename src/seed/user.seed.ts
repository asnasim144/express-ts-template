import mongoose from "mongoose";
import userModel from "../model/user.model";
import mongodbConnection from "../config/mongodb";

const seedUsers = async (): Promise<void> => {
  const users = [
    {
      firstName: "John",
      lastName: "Doe",
      profilePicture: {
        size: "120KB",
        name: "profile.jpg",
        type: "image/jpeg",
        url: "https://randomuser.me/api/portraits/men/1.jpg",
        id: "fileId1",
      },
      email: "john.doe@example.com",
      password: "hashedPassword1", // Ensure this is a hashed password
      phoneNumber: "1234567890",
      address: "123 Main St, Springfield, IL",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      profilePicture: {
        size: "150KB",
        name: "avatar.png",
        type: "image/png",
        url: "https://randomuser.me/api/portraits/women/2.jpg",
        id: "fileId2",
      },
      email: "jane.smith@example.com",
      password: "hashedPassword2", // Ensure this is a hashed password
      phoneNumber: "0987654321",
      address: "456 Elm St, Springfield, IL",
    },
  ];

  try {
    await userModel.deleteMany(); // Clear existing users
    await userModel.insertMany(users); // Insert seed users
    console.log("Users seeded successfully");
  } catch (error) {
    console.error("Error seeding users: ", error);
  } finally {
    mongoose.connection.close(); // Close the connection after seeding
    process.exit(0); // Ensure the process exits after completion
  }
};

const runSeed = async (): Promise<void> => {
  await mongodbConnection(); // Ensure the database connection is established
  await seedUsers(); // Seed the users
};

runSeed();
