import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Home Chef",
  description:
    "Find out our fevourite chef (Baburchi) with their delicious meals",
  keywords: ["home", "chef", "baburchi", "food", "order"],
};

// export const generateMetadata = async ({ params }) => {
//   const baburchi = await getBaburchiByChefID(params.chefId);
//   const { name, description } = baburchi;
//   return {
//     title: {
//       absolute: `${name}`,
//     },
//     description: description,
//     keywords: description.split(" "),
//   };
// };
const ChefPage = async () => {
  const session = await getServerSession(authOptions);
  console.log("ChefPage session", session);

  return (
    <div className="container mx-auto my-5">
      <h2>Checkout Our chefs</h2>
    </div>
  );
};

export default ChefPage;
