import { LucideIcon } from "lucide-react";

export interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

export interface InfoProps {
  boardId: string;
}

export interface CanvasProps {
  boardId: string;
}

export interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

export interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
};
