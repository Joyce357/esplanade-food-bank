import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Food Support",
  description:
    "If you or your family are experiencing food insecurity, Esplanade Community Food Bank is committed to helping neighbours find compassionate support. Reach out to ask about current food assistance arrangements.",
};

export default function GetFoodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
