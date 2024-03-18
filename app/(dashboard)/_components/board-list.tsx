"use client";

import { BoardListProps } from "@/interfaces/board-list-interface";
import { useQuery } from "convex/react";
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./new-board-button";
import { EmptyOr } from "@/assets";

export const BoardList = ({
    orgId,
    query,
  }: BoardListProps) => {
    // const data = useQuery(api.boards.get, { 
    //   orgId,
    //   ...query,
    // });
    const data = undefined;
  
    if (data !== undefined) {
      return (
        <div>
          <h2 className="text-3xl">
            {query.favorites ? "Favorite boards" : "Team boards"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
            <NewBoardButton orgId={orgId} disabled />
            <BoardCard.Skeleton />
            <BoardCard.Skeleton />
            <BoardCard.Skeleton />
            <BoardCard.Skeleton />
          </div>
        </div>
      )
    }
  
    // if (!data?.length && query.search) {
    //   return <EmptySearch />;
    // }
  
    // if (!data?.length && query.favorites) {
    //   return <EmptyFavorites />
    // }
  
    // if (!data?.length) {
    //   return <EmptyBoards />
    // }
  
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? "Favorite boards" : "Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} />
          {/* {data?.map((board) => ( */}
            {/*TODO: BoardCard goes here */}
            <BoardCard
            key={1}
            id={"1"}
            title={"App Design"}
            imageUrl={EmptyOr}
            authorId={"12"}
            authorName={"Arsim"}
            createdAt={12}
            orgId={"12"}
            isFavorite={true}
          />
            {/* ))} */}
        </div>
      </div>
    );
  };