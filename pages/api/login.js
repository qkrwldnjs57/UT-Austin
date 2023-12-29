import { connectDB } from "@/util/database";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const db = (await connectDB).db("AAAA");
        const collection = db.collection("users");
        const { uteid, password } = req.body;

        console.log(process.env.JWT_SECRET);

        // MongoDB에서 사용자를 찾습니다.
        const existingUser = await collection.findOne({ uteid }); // 'user' 또는 'users'

        if (existingUser) {
            const passwordIsValid = await bcrypt.compare(password, existingUser.password);

            if (passwordIsValid) {
                const token = jwt.sign(
                    { userId: existingUser._id.toString() }, // ObjectId를 문자열로 변환
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                if (existingUser.username) {
                    res.status(200).json({
                        message: "User exists, redirect to homepage",
                        username: existingUser.username,
                        token
                    });
                } else {
                    res.status(200).json({
                        message: "User exists, but without username, redirect to create username",
                        token
                    });
                }
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            // 비밀번호 암호화
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = { uteid, password: hashedPassword };
            const result = await collection.insertOne(newUser);

            res.status(200).json({
                message: "New user, redirect to create username",
                result
            });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
