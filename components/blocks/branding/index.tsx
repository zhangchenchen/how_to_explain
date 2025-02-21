import { Section as SectionType } from "@/types/blocks/section";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon";
import Link from "next/link";

export default function Branding({ section }: { section: SectionType }) {
  if (section.disabled) {
    return null;
  }

  return (
    <section id={section.name} className="py-16">
      <div className="container flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <h2 className="text-4xl font-bold text-center">
            {section.title}
          </h2>
          {section.description && (
            <p className="max-w-2xl text-center text-lg text-muted-foreground">
              {section.description}
            </p>
          )}
          {section.buttons && (
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {section.buttons.map((button, idx) => (
                <Link key={idx} href={button.url || ""} target={button.target}>
                  <Button
                    variant={button.variant}
                    size={button.size}
                    className={button.className}
                  >
                    {button.title}
                    {button.icon && (
                      <Icon name={button.icon} className="w-5 h-5" />
                    )}
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
