import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import React from "react";

type NavItem = {
  name: string;
  link: string;
  className?: string;
  active?: boolean;
};

export default function BreadcrumbBasic({ nav }: { nav: NavItem[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {nav?.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem className={item.className}>
              {item.active ? (
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.link}>{item.name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>

            {index < nav.length - 1 && (
              <BreadcrumbSeparator className={item.className}>
                <ChevronRight />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
