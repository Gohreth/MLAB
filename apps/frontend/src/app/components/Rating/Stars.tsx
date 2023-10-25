import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";

interface IStarsProps {
  rating: number;
}

export default function Stars({ rating }: IStarsProps) {
  return (
    <Flex>
      {Array.apply(null, Array(rating)).map((_, index: number) => (
        <StarFilledIcon key={index} />
      ))}
      {Array.apply(null, Array(5 - rating)).map((_, index: number) => (
        <StarIcon key={index + rating} />
      ))}
    </Flex>
  );
}
