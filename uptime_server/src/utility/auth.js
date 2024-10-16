import bcrypt from "bcrypt"

export const hashPassword = (password) => {
    return bcrypt.hashSync(password,10);
}
export const comparePassword = (inputpassword, hashedPassword) => {
    return bcrypt.compareSync(inputpassword, hashedPassword);
};
 