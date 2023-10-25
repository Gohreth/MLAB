import { Flex, Text } from "@radix-ui/themes";
import Avatar from "./Avatar";
import { headers } from "next/headers";
import { IProfile } from "@/types/profile";

export default function Profile() {
  const headersList = headers();
  const profileString = headersList.get("x-my-profile");
  let profile: IProfile = { username: "Unknown" };
  if (typeof profileString === "string") {
    profile = JSON.parse(profileString);
  }

  return (
    <Flex align={"center"} gap={"3"}>
      <Flex align={"end"} direction={"column"}>
        <Text weight={"medium"} color="gray" size={"2"}>
          Welcome,
        </Text>
        <Text weight={"light"} color="gray" size={"2"}>
          {profile.username}
        </Text>
      </Flex>
      <Avatar initial={profile.username?.at(0)!} />
    </Flex>
  );
}
