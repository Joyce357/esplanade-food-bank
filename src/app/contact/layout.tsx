import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a question about food support, volunteering, donations, or community involvement? Send a message to Esplanade Community Food Bank.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
