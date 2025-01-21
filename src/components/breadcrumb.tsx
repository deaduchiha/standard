"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useMemo } from "react";

const BreadcrumbComponent = () => {
  const pathname = usePathname();

  const pathSegments = useMemo(() => {
    if (!pathname) return [];
    return pathname.split("/").filter((segment) => segment.length > 0);
  }, [pathname]);

  if (pathSegments.length === 0) {
    return null;
  }

  const crumbs = pathSegments.map((segment, idx) => {
    const href = "/" + pathSegments.slice(0, idx + 1).join("/");

    const title = decodeURIComponent(segment).replace(/-/g, " ");
    return { title, href };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1;
          // console.log(crumb.title);

          return (
            <Fragment key={crumb.href}>
              <BreadcrumbItem className="flex items-center">
                {!isLast ? (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>
                      {PAGES[crumb.title as keyof typeof PAGES]}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>
                    {PAGES[crumb.title as keyof typeof PAGES]}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="rotate-180" />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default BreadcrumbComponent;

const PAGES = {
  dashboard: "داشبورد",
  users: "کاربران",
  "production units": "واحد تولیدی",
  profile: "پروفایل",
};
