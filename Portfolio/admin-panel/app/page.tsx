import { redirect } from "next/navigation";

export default function RootPage() {
    // Redirect root requests to your home page
    redirect("/home");
    return null;
}
