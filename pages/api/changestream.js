/*jiwon code*/

import { connectDB } from "@/util/database";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const client = (await connectDB).db("AAAA");
            const collections = ['2023', '2024'].map(year => client.collection(year));
            const groupList = client.collection('GroupList');

            collections.forEach(collection => {
                const changeStream = collection.watch([], { fullDocument: 'updateLookup' });

                changeStream.on("change", async (change) => {
                    if (change.operationType === 'insert' || change.operationType === 'update') {
                        const data = change.fullDocument;

                        const course = data.course;
                        const professor = data.professor;

                        // GroupList 컬렉션에 동일한 조합이 있는지 확인
                        const exists = await groupList.findOne({ course, professor });
                        if (!exists) {
                            // GroupList 컬렉션에 새로운 조합 추가
                            await groupList.insertOne({ course, professor });
                        }
                    }
                });
            });

            res.status(200).json({ message: 'Change Streams for multiple collections initiated' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error occurred' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
