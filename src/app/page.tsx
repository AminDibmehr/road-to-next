import Link from "next/link";
import { ticketsPath } from "@/paths";

export default function Home() {
  return (
    <div>
      <h1 className="text-xl">Home</h1>
      <Link href={ticketsPath()} className="underline">
        Tickets
      </Link>
    </div>
  );
}
