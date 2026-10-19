import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ways to Give",
  description:
    "Esplanade Community Food Bank is rooted in the belief that everyone can make a difference. Contact our team to learn about current food donations and support opportunities.",
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
