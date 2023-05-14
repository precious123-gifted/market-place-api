import { NextApiRequest, NextApiResponse } from "next"
import { hash } from "bcryptjs"
import { connectToMongoDB } from "../../../lib/mongodb/mongodb"
import User from "../../../models/user"
import { IUser } from "../../../types"






const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToMongoDB();

    if (req.method === "POST") {

      res.setHeader('Access-Control-Allow-Origin', 'https://market-place-1gtp.vercel.app') 
      res.setHeader('Access-Control-Allow-Credentials', 'true')

      if (!req.body) return res.status(400).json({ error: "Data is missing" })

      const { companyName, firstName, lastName, jobTitle, industry, email, password } = req.body

      const userExists = await User.findOne({ email })

      if (userExists) {
        return res.status(409).json({ error: "User Already exists" })
      } else {
        if (!password) {
          return res.status(400).json({ error: "Password is missing" })
        }

        if (password.trim() === '') {
          return res.status(400).json({ error: "Password cannot be empty" })
        }

        if (password?.length < 6)
          return res.status(409).json({ error: "Password should be 6 characters long" })

        const hashedPassword = await hash(password, 12)

        const user = new User({
          companyName,
          firstName,
          lastName,
          jobTitle,
          industry,
          email,
          password: hashedPassword
        })

        user.save()
          .then((data: IUser) => {
            const user = {
              companyName: data.companyName,
              firstName: data.firstName,
              lastName: data.lastName,
              jobTitle: data.jobTitle,
              industry: data.industry,
              email: data.email,
              _id: data._id
            }

            return res.status(201)
              .setHeader('Access-Control-Allow-Origin', 'https://market-place-1gtp.vercel.app') 
              .setHeader('Access-Control-Allow-Credentials', 'true')
              .json({
                success: true,
                user
              })
          })
          .catch((error: unknown) => {
            // handle any errors
            console.error(error);
            res.status(500)
              .json({ error: "Internal Server Error" });
          })
      }
    } else if (req.method === "OPTIONS") {
      res.setHeader('Access-Control-Allow-Origin', 'https://market-place-1gtp.vercel.app');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Credentials', 'true')
      res.status(200).end();
    } else {
      res.status(405)
        .json({ error: "Method Not Allowed,nor try this method again" })
    }
  } catch (error) {
    // handle any errors that occur during database connection
    console.error(error);
    res.status(500)
      .json({ error: "Internal Server Error" });
   }
}

export default handler






// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     await connectToMongoDB();

//     if (req.method === "POST") {
//       if (!req.body) return res.status(400).json({ error: "Data is missing" })

//       const { companyName, firstName, lastName, jobTitle, industry, email, password } = req.body

//       const userExists = await User.findOne({ email })

//       if (userExists) {
//         return res.status(409).json({ error: "User Already exists" })
//       } else {
//         if (!password) {
//           return res.status(400).json({ error: "Password is missing" })
//         }

//         if (password.trim() === '') {
//           return res.status(400).json({ error: "Password cannot be empty" })
//         }

//         if (password?.length < 6)
//           return res.status(409).json({ error: "Password should be 6 characters long" })

//         const hashedPassword = await hash(password, 12)

//         const user = new User({
//           companyName,
//           firstName,
//           lastName,
//           jobTitle,
//           industry,
//           email,
//           password: hashedPassword
//         })

//         user.save()
//           .then((data: IUser) => {
//             const user = {
//               companyName: data.companyName,
//               firstName: data.firstName,
//               lastName: data.lastName,
//               jobTitle: data.jobTitle,
//               industry: data.industry,
//               email: data.email,
//               _id: data._id
//             }

//             return res.status(201)
//               .setHeader('Access-Control-Allow-Origin', '*')
//               .json({
//                 success: true,
//                 user
//               })
//           })
//           .catch((error: unknown) => {
//             // handle any errors
//             console.error(error);
//             res.status(500)
//               .setHeader('Access-Control-Allow-Origin', '*')
//               .json({ error: "Internal Server Error" });
//           })
//       }
//     } else if (req.method === "OPTIONS") {
//       res.setHeader('Access-Control-Allow-Origin', '*');
//       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//       res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
//       res.status(200).end();
//     } else {
//       res.status(405)
//         .setHeader('Access-Control-Allow-Origin', '*')
//         .json({ error: "Method Not Allowed,nor try this method again" })
//     }
//   } catch (error) {
//     // handle any errors that occur during database connection
//     console.error(error);
//     res.status(500)
//       .setHeader('Access-Control-Allow-Origin', '*')
//       .json({ error: "Internal Server Error" });
//   }
// }

// export default handler


