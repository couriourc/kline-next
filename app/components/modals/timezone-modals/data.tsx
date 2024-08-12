import { rem } from "@mantine/core";

export function getOptions(_locale?: string) {
  return [
    {
      key: "timezone",
      text: "时区",
      component: "select",
      componentProps: {
        className: "!w-full",
        w: rem(200)
      },
      dataSource: [
        { value: "Etc/UTC", label: "Etc/UTC" },
        { value: "Pacific/Honolulu", label: "Pacific/Honolulu" },
        { value: "America/Juneau", label: "America/Juneau" },
        { value: "America/Los_Angeles", label: "America/Los_Angeles" },
        { value: "America/Chicago", label: "America/Chicago" },
        { value: "America/Toronto", label: "America/Toronto" },
        { value: "America/Sao_Paulo", label: "America/Sao_Paulo" },
        { value: "Europe/London", label: "Europe/London" },
        { value: "Europe/Berlin", label: "Europe/Berlin" },
        { value: "Asia/Bahrain", label: "Asia/Bahrain" },
        { value: "Asia/Dubai", label: "Asia/Dubai" },
        { value: "Asia/Ashkhabad", label: "Asia/Ashkhabad" },
        { value: "Asia/Almaty", label: "Asia/Almaty" },
        { value: "Asia/Bangkok", label: "Asia/Bangkok" },
        { value: "Asia/Shanghai", label: "Asia/Shanghai" },
        { value: "Asia/Tokyo", label: "Asia/Tokyo" },
        { value: "Australia/Sydney", label: "Australia/Sydney" },
        { value: "Pacific/Norfolk", label: "Pacific/Norfolk" }
      ]
    }
  ];
}
