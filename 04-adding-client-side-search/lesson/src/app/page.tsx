import { prisma } from "@/lib/prisma";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { SearchInput } from "./SearchInput";

export default async function Users({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const perPage = 6;
  const totalUsers = await prisma.user.count({
    where: {
      name: {
        contains: search,
      },
    },
  });
  const totalPages = Math.ceil(totalUsers / perPage);
  const page: number =
    typeof searchParams.page === "string" &&
    +searchParams.page > 1 &&
    +searchParams.page <= totalPages
      ? +searchParams.page
      : 1;
  const users = await prisma.user.findMany({
    take: perPage,
    skip: (page - 1) * perPage,
    where: {
      name: {
        contains: search,
      },
    },
  });

  return (
    <div className="px-8 bg-gray-50 pt-12 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="w-80">
          <SearchInput search={search}/>
        </div>
        <div className="mt-0 ml-16 flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-6">
          <div className="inline-block min-w-full py-2 align-middle px-6">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pr-3 text-left text-sm font-semibold w-[62px] sm:w-auto text-gray-900 pl-4">
                      ID
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold w-[130px] sm:w-auto text-gray-900">
                      Name
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold w-[175px] sm:w-auto text-gray-900">
                      Email
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900 pl-4">
                        {user.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium max-w-[130px] sm:w-auto truncate">
                        {user.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-[175px] sm:w-auto truncate">
                        {user.email}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-4 pr-4 text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                        >
                          Edit
                          <ChevronRightIcon className="w-4 h-4" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-semibold">{(page - 1) * perPage + 1}</span> to{" "}
          <span className="font-semibold">{page * perPage}</span> of{" "}
          <span className="font-semibold">{totalUsers}</span> users
        </p>
        <div className="space-x-2">
          <Link
            className={`${
              page === 1 ? "opacity-50 pointer-events-none" : ""
            } border border-gray-300 bg-white px-3 py-2 inline-flex items-center justify-center text-sm font-semibold text-gray-900 rounded hover:bg-gray-50`}
            href={page > 1 ? `/?page=${page - 1}` : "/"}
          >
            Previous
          </Link>
          <Link
            className={`${
              page >= totalPages ? "opacity-50 pointer-events-none" : ""
            } border border-gray-300 bg-white px-3 py-2 inline-flex items-center justify-center text-sm font-semibold text-gray-900 rounded hover:bg-gray-50`}
            href={page < totalPages ? `/?page=${page + 1}` : `/?page=${page}`}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
