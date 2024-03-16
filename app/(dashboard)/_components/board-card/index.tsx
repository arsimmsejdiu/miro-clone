"use client"

import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { MoreHorizontal } from "lucide-react";

import { BoardCardProps } from "@/interfaces/board-list-interface";
import { Skeleton } from "@/components/ui/skeleton";

export const BoardCard = ({
    id,
    title,
    authorId,
    authorName,
    createdAt,
    imageUrl,
    orgId,
    isFavorite,
  }: BoardCardProps) => {
    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">Board List</div>
    )
  }

  BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
      <div className="aspect-[100/127] rounded-lg overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
    );
  };