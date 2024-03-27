import { BoardIdPageProps } from "@/interfaces/board-id-interface";
import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "@/components/auth/loading";

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
};

export default BoardIdPage;
