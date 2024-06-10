import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// const test = async () => {
//   console.log(1);
//   const token = await db.smsToken.create({
//     data: {
//       token: "1234",
//       user: { connect: { id: 1 } },
//     },
//   });
//   console.log(2);
//   console.log(token);
// };
// test();

export default db;
