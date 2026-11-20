"use client";

import { Reveal } from "@/components/ui/reveal";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InstagramIcon } from "@/components/ui/icons";
import { useLanguage } from "@/components/providers/language-provider";
import { siteConfig } from "@/lib/site-config";

export function InstagramFeed() {
  const { t } = useLanguage();

  return (
    <Reveal className="h-full">
      <Card variant="brand" className="flex h-full flex-col bg-white">
        <CardBody className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-brand/10 text-brand">
            <InstagramIcon className="size-7" />
          </span>
          <div>
            <h3 className="font-display text-[1.0625rem] font-bold text-heading sm:text-[1.1875rem]">
              {t("home.followInstagram")}
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-[1.55] text-muted">
              Batch updates, results and classroom moments — follow{" "}
              <span className="font-semibold text-heading">@csmpias_</span> for the latest from CSMP IAS.
            </p>
          </div>
          <Button href={siteConfig.social.instagram} variant="outline" target="_blank" rel="noopener noreferrer">
            <InstagramIcon className="size-5" />
            {t("home.followHandle")}
          </Button>
        </CardBody>
      </Card>
    </Reveal>
  );
}
