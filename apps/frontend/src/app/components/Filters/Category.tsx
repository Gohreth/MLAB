"use client";
import { ICategory } from "@/types/category";
import { Select } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";

interface ICategoryProps {
  categories: ICategory[];
  urlSearchParams: URLSearchParams;
}

export default function Category({
  categories,
  urlSearchParams,
}: ICategoryProps) {
  let rootAttrs: { defaultValue?: string } = {};
  const queryEntries = Object.fromEntries(urlSearchParams);

  const pathname = usePathname();
  const router = useRouter();

  if (queryEntries["category"])
    rootAttrs["defaultValue"] = queryEntries["category"];

  return (
    <Select.Root
      onValueChange={(value) => {
        queryEntries["category"] = value;
        router.push(`${pathname}?${new URLSearchParams(queryEntries)}`);
      }}
      {...rootAttrs}
    >
      <Select.Trigger placeholder="Select a category..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Categories</Select.Label>
          {categories.map((category: ICategory) => (
            <Select.Item key={category.id} value={category.id.toString()}>
              {category.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
