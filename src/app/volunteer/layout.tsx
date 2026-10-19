import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Discover how you can volunteer with Esplanade Community Food Bank and help care for neighbours in our community.",
};

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
