import { connectionIdToColor } from "@/lib/utils";
import { UserAvatar } from "./user-avatar";
import { Logo } from "@/assets";

export const Participants = () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        <UserAvatar
          borderColor={connectionIdToColor(3)}
          key={"3"}
          src={Logo}
          name={"Arsim"}
          fallback={"A" || "T"}
        />
        <UserAvatar
          borderColor={connectionIdToColor(3)}
          key={"3"}
          src={Logo}
          name={"Arsim"}
          fallback={"A" || "T"}
        />
        <UserAvatar
          borderColor={connectionIdToColor(3)}
          key={"3"}
          src={Logo}
          name={"Arsim"}
          fallback={"A" || "T"}
        />
      </div>
    </div>
  );
};

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]" />
  );
};
