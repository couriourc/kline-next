import type { ExecutionMenuItem } from "@components/ui/ContextMenu/types";
import { CommandPosition } from "@/app/commands/index";
import { useHotkeys } from "@mantine/hooks";
import type { HotkeyItem } from "@mantine/hooks/lib/use-hotkeys/use-hotkeys";

const commandsCache = new Map<CommandPosition, Set<ExecutionMenuItem>>();

export function registerCommand(executionMenuItem: ExecutionMenuItem) {
  commandsCache.set(
    executionMenuItem.pos ?? CommandPosition.Anonymous,
    (
      commandsCache.get(executionMenuItem.pos ?? CommandPosition.Anonymous) ??
      new Set()
    ).add(executionMenuItem)
  );
}

export function getCommandsByPosition(
  pos: CommandPosition
): ExecutionMenuItem[] {
  return Array.from(commandsCache.get(pos) ?? []);
}

export function useSetupCommandsByPosition(position: CommandPosition) {
  const commands = getCommandsByPosition(position);
  commands
    .filter((item) => !item.disabled)
    .forEach((item) => {
      item.setup?.();
    });
  useHotkeys(
    commands
      .filter((item) => !item.disabled)
      .filter((item) => item.shortcuts)
      .map((tool) => {
        if (!tool.shortcuts) return [] as unknown as HotkeyItem;
        return [tool.shortcuts, () => tool.executor?.()] as HotkeyItem;
      })
  );
}

export function resetAllCommand() {
  commandsCache.clear();
}
