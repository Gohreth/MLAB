import { Container, Flex } from "@radix-ui/themes";
import RegistrationContainer from "./components/Registration/RegistrationContainer";
import LoginInformationCallout from "./components/Registration/LoginInformationCallout";

export default function Home() {
  return (
    <main>
      <Container size={"1"}>
        <Flex
          direction={"column"}
          justify={"center"}
          style={{ height: "100vh" }}
        >
          <LoginInformationCallout />
          <RegistrationContainer />
        </Flex>
      </Container>
    </main>
  );
}
