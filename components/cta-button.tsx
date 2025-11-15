import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function CTAButton() {
  return (
    <div className="flex justify-center mb-20">
      <Link href="/dashboard">
        <Button className="group text-lg px-8 py-6 font-semibold rounded-4xl hover:scale-105 hover:shadow-xl transition duration-300 hover:cursor-pointer">
          <span className="flex items-center gap-2">
            View Live Dashboard{" "}
            <ArrowRight className="group-hover:translate-x-1 transition "></ArrowRight>
          </span>
        </Button>
      </Link>
    </div>
  );
}
