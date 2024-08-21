import { Blockquote, Stack } from "@mantine/core";

export function QuoteEmpty() {
  return (
    <Stack align="center" gap="xs">
      <Blockquote
        w={"92%"}
        iconSize={30}
        radius="xs"
        className={"cursor-pointer"}
        color="rgba(199, 199, 199, 1)"
        cite="– Forrest Gump"
        icon={<i className={"i-mdi-question-answer text-xl"} />}
        mt="sm"
        mx={"auto"}
      >
        Life is like an npm install – you never know what you are going to get.
      </Blockquote>
    </Stack>
  );
}
