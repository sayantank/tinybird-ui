import { getAuthCookie } from "@/lib/auth";
import { SidebarMenu, SidebarMenuItem } from "./ui/sidebar";
import { TypographyExtraSmall, TypographyInlineCode } from "./ui/typography";

export async function HostDetails() {
  const credentials = await getAuthCookie();
  if (!credentials) {
    return null;
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex flex-col items-start p-2 gap-2">
        <TypographyExtraSmall>Host URL</TypographyExtraSmall>
        <TypographyInlineCode>{credentials.url}</TypographyInlineCode>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
