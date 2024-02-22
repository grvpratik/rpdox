import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
	email: {
		type: String,
		unique: [true, "Email already exists!"],
		required: [true, "Email is required!"],
	},
	username: {
		type: String,
		required: [true, "Username is required!"],
		// match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
	},
	image: {
		type: String,
	},
	token: {
		type: Number,
	},
	role: {
		type: String,
		default:"verified",
		required: [true, "Role is required!"],
	},
});

const User = models.User || model("User", UserSchema);

export default User;
// import { Document, Model, Schema, model } from "mongoose";

// interface UserAttributes {
// 	email: string;
// 	username: string;
// 	image?: string;
// }

// interface UserDocument extends UserAttributes, Document {}

// interface UserModel extends Model<UserDocument> {}

// const UserSchemaFields: Record<keyof UserAttributes, any> = {
// 	email: {
// 		type: String,
// 		unique: true,
// 		required: [true, "Email is required!"],
// 	},
// 	username: {
// 		type: String,
// 		required: [true, "Username is required!"],
// 		// Add your custom validation here if needed
// 		// match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
// 	},
// 	image:  { type: String },
// };

// const UserSchema = new Schema<UserDocument, UserModel>(UserSchemaFields);

// const User = model<UserDocument, UserModel>("User", UserSchema);

// export default User;
