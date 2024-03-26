import { BoardIdPageProps } from "@/interfaces/board-id-interface";
import { Canvas } from "./_components/canvas";

const BoardIdPage = ({
    params,
  }: BoardIdPageProps) => {
    return (
        <Canvas boardId={params.boardId}/>
    )
  }

  export default BoardIdPage