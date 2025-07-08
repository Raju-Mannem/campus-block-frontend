import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Unlock Your Learning Potential
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8">
            Discover, enroll, and learn from the best online courses. Stream video lessons, download resources, and track your progress—all in one place.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/courses">
              <Button size="lg">Browse Courses</Button>
            </Link>
            <Link href="/api/auth/signin">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 hidden md:block">
          <Image
            src="/hero-illustration.svg"
            alt="Learning illustration"
            className="w-full h-auto rounded-lg shadow-lg"
            width={600}
            height={400}
          />
        </div>
      </div>
    </section>
  );
}
