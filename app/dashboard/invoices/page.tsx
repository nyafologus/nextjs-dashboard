import { fetchInvoicesPages } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import Pagination from "@/app/ui/invoices/pagination";
import InvoicesTable from "@/app/ui/invoices/table";
import Search from "@/app/ui/search";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import React, { Suspense } from "react";

import localFont from "next/font/local";

const winkFont = localFont({
  src: "../../../public/wink-script-regular.woff2",
  display: "swap",
});

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchInvoicesPages(query);

  return (
    <>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          {/* <h1 className={` ${lusitana.className} text-2xl`}>📜 Invoices 📜</h1> */}

          <h1 className={`${winkFont.className}  text-6xl`}>
            📜
            <span className="swooshed">A</span>mazing Invoice
            <span className="ss06">s</span>📜
          </h1>
        </div>

        <div className="mt-4 flex items-center gap-2 md:mt-8">
          <Search placeholder="Search invoices..." />
          <CreateInvoice />
        </div>

        <Suspense
          key={query + currentPage}
          fallback={<InvoicesTableSkeleton />}
        >
          <InvoicesTable
            query={query}
            currentPage={currentPage}
          ></InvoicesTable>
        </Suspense>

        <div className="mt-5">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
