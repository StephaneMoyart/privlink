import bcrypt from 'bcryptjs'

export const hashPass = async (password: string) => {
    if (password) return await bcrypt.hash(password, 10)
    return null
}