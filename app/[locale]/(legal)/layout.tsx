import "@/app/globals.css";
import { MdOutlineHome } from "react-icons/md";
import { Metadata } from "next";
import React from "react";
import { getTranslations } from "next-intl/server";
import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";
import { getLandingPage } from "@/services/page";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: {
      template: `%s | ${t("metadata.title")}`,
      default: t("metadata.title"),
    },
    description: t("metadata.description"),
    keywords: t("metadata.keywords"),
  };
}

export default async function LegalLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const page = await getLandingPage(locale);

  return (
    <>
      {page.header && <Header header={page.header} />}
      <div>
        <a
          className="text-base-content cursor-pointer hover:opacity-80 transition-opacity"
          href="/"
        >
        </a>
        <div className="text-md max-w-3xl mx-auto leading-loose pt-4 pb-8 px-8 prose prose-slate dark:prose-invert prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-base-content prose-code:text-base-content prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md">
          {children}
        </div>
      </div>
      {page.footer && <Footer footer={page.footer} />}
    </>
  );
} 