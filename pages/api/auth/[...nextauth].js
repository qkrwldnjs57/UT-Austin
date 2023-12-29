import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectDB } from '@/util/database'

function generateRandomNickname(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let nickname = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        nickname += characters.charAt(randomIndex);
    }

    return nickname;
}


export default NextAuth({
    providers: [
        GoogleProvider({
            //clientId: process.env.GOOGLE_CLIENT_ID, // 구글 클라이언트 ID
            //clientSecret: process.env.GOOGLE_CLIENT_SECRET, // 구글 클라이언트 시크릿
            clientId: "971109155134-fh90enan3sbi6qt2pmm6dffi21judchq.apps.googleusercontent.com", // 구글 클라이언트 ID
            clientSecret: "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",
            authorization: {
                params: {
                    hd: "utexas.edu", // school domain
                },
            },
        }),
    ],

    callbacks: {
        async signIn({ user, account, profile }) {
            const db = (await connectDB).db("AAAA");
            const existingUser = await db.collection("users").findOne({ email: user.email });

            let nickname;
            if (existingUser) {
                // existing user, use existing nickname
                nickname = existingUser.nickname;
            } else {
                // new user, create nickname
                nickname = generateRandomNickname(8);
                await db.collection("users").insertOne({
                    email: user.email,
                    name: user.name,
                    nickname: nickname,
                });
            }

            user.nickname = nickname;

            return true;
        },

        async session({ session, user, token }) {
            const db = (await connectDB).db("AAAA");
            const existingUser = await db.collection("users").findOne({ email: token.email });
            if (existingUser) {
                // existing user, add existing nickname to session
                session.user.nickname = existingUser.nickname;
            }

            return session;

        },
    }

});